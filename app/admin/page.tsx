"use client"
import { useState, useEffect } from "react"
import { tools as initialTools, Tool } from "@/lib/tools"
import { websiteDirectory as initialWebsites } from "@/lib/websites"
import { categories } from "@/lib/categories"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [tab, setTab] = useState<'dashboard'|'tools'|'websites'|'categories'|'seo'>('dashboard')
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [websites, setWebsites] = useState(initialWebsites)
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('admin-auth')
    if (saved === 'true') setIsAuth(true)
    const t = localStorage.getItem('admin-tools')
    if (t) setTools(JSON.parse(t))
    const w = localStorage.getItem('admin-websites')
    if (w) setWebsites(JSON.parse(w))
  }, [])

  const login = () => {
    if (user === 'admin' && pass === 'admin123') {
      setIsAuth(true)
      localStorage.setItem('admin-auth', 'true')
    } else alert('Use admin / admin123 (change in .env in production)')
  }

  const saveTools = (newTools: Tool[]) => {
    setTools(newTools)
    localStorage.setItem('admin-tools', JSON.stringify(newTools))
  }

  const saveWebsites = (newWebsites: any[]) => {
    setWebsites(newWebsites)
    localStorage.setItem('admin-websites', JSON.stringify(newWebsites))
  }

  if (!isAuth) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <div className="rounded-[2rem] bg-white border p-8">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-2">Demo: admin / admin123</p>
          <div className="mt-6 space-y-3">
            <input value={user} onChange={e=>setUser(e.target.value)} placeholder="Username" className="w-full h-12 px-4 rounded-2xl border"/>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="w-full h-12 px-4 rounded-2xl border"/>
            <Button onClick={login} className="w-full" variant="accent">Login</Button>
          </div>
          <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded-xl">
            In production, replace with Supabase Auth. This localStorage demo shows structure ready for backend.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button variant="outline" size="sm" onClick={()=>{localStorage.removeItem('admin-auth'); setIsAuth(false)}}>Logout</Button>
      </div>

      <div className="mt-6 flex gap-2 flex-wrap">
        {(['dashboard','tools','websites','categories','seo'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-sm capitalize border ${tab===t?'bg-foreground text-white':'bg-white'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] bg-white border p-6">
        {tab==='dashboard' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-muted rounded-2xl"><div className="text-2xl font-bold">{tools.length}</div><div className="text-xs">Tools</div></div>
              <div className="p-4 bg-muted rounded-2xl"><div className="text-2xl font-bold">{websites.length}</div><div className="text-xs">Websites</div></div>
              <div className="p-4 bg-accent/20 rounded-2xl"><div className="text-2xl font-bold">{categories.length}</div><div className="text-xs">Categories</div></div>
              <div className="p-4 bg-foreground text-white rounded-2xl"><div className="text-2xl font-bold">50K+</div><div className="text-xs">Users</div></div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-sm">
              <b>How to add new tool (Future-friendly):</b><br/>
              1. Create file in /components/tools/your-tool.tsx<br/>
              2. Add entry in /lib/tools.ts<br/>
              3. Add mapping in /lib/tool-components.ts<br/>
              Tool auto-appears everywhere - homepage, search, sitemap, categories.
              <br/><br/>
              <b>How to add website:</b><br/>
              Add entry in /lib/websites.ts array. Auto appears on homepage, directory, search.
            </div>
          </div>
        )}

        {tab==='tools' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Tools ({tools.length})</h2>
            <div className="space-y-2 max-h-[600px] overflow-auto">
              {tools.map(t=>(
                <div key={t.slug} className="flex justify-between items-center p-3 border rounded-xl bg-muted/30">
                  <div className="flex gap-2 items-center"><span>{t.icon}</span><span className="font-medium text-sm">{t.name}</span><span className="text-xs opacity-60">{t.category}</span></div>
                  <div className="flex gap-1">
                    <span className={`text-[10px] px-2 py-1 rounded-full ${t.featured?'bg-accent': 'bg-white border'}`}>FEAT</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded-xl">
              Edit /lib/tools.ts to add/edit/delete. Changes here save to localStorage for demo - to persist to code, copy JSON and paste to file.
            </div>
          </div>
        )}

        {tab==='websites' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Website Directory ({websites.length})</h2>
            <form onSubmit={e=>{
              e.preventDefault()
              const form=new FormData(e.target as HTMLFormElement)
              const newSite={
                id: Date.now().toString(),
                name: form.get('name') as string,
                slug: (form.get('name') as string).toLowerCase().replace(/\s+/g,'-'),
                url: form.get('url') as string,
                logo: form.get('logo') as string || '🌐',
                category: form.get('category') as string,
                description: form.get('desc') as string,
                tags: (form.get('tags') as string).split(',').map(s=>s.trim()),
                featured: false,
                verified: true,
                addedAt: new Date().toISOString().slice(0,10)
              }
              saveWebsites([...websites, newSite as any])
              ;(e.target as HTMLFormElement).reset()
            }} className="grid gap-3 p-4 border rounded-2xl bg-muted/20 mb-6">
              <div className="grid md:grid-cols-2 gap-3">
                <input name="name" placeholder="Website Name e.g. Canva" required className="h-10 px-3 rounded-xl border bg-white"/>
                <input name="url" placeholder="https://example.com" required className="h-10 px-3 rounded-xl border bg-white"/>
                <input name="logo" placeholder="Logo emoji or URL 🌐" className="h-10 px-3 rounded-xl border bg-white"/>
                <select name="category" className="h-10 px-3 rounded-xl border bg-white">
                  {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <input name="desc" placeholder="Short description" required className="h-10 px-3 rounded-xl border bg-white"/>
              <input name="tags" placeholder="Tags comma separated e.g. design, free, ai" className="h-10 px-3 rounded-xl border bg-white"/>
              <Button type="submit" variant="accent" className="w-fit">Add Website</Button>
            </form>

            <div className="space-y-2 max-h-[400px] overflow-auto">
              {websites.map((w:any)=>(
                <div key={w.id} className="flex justify-between items-center p-3 border rounded-xl">
                  <div className="text-sm"><b>{w.logo} {w.name}</b> - {w.category}<br/><span className="text-xs opacity-60">{w.url}</span></div>
                  <Button size="sm" variant="ghost" onClick={()=>saveWebsites(websites.filter((x:any)=>x.id!==w.id))}>Delete</Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold mb-2">Export JSON to add to code:</div>
              <textarea readOnly value={JSON.stringify(websites.slice(-1), null, 2)} className="w-full h-24 p-2 text-xs font-mono border rounded-xl bg-muted"/>
              <div className="text-[11px] text-muted-foreground mt-1">Copy this and add to /lib/websites.ts websiteDirectory array to make permanent.</div>
            </div>
          </div>
        )}

        {tab==='categories' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Categories ({categories.length})</h2>
            <div className="grid gap-2">
              {categories.map(c=>(
                <div key={c.id} className="p-3 border rounded-xl flex justify-between"><span>{c.icon} {c.name} ({c.slug})</span><span className="text-xs opacity-60">{c.description.slice(0,50)}</span></div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-muted rounded-xl text-xs">To add new category: edit /lib/categories.ts - new category auto appears in menu, homepage, and routes (create folder app/your-slug/page.tsx or use generic /categories/[slug]).</div>
          </div>
        )}

        {tab==='seo' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">SEO & AdSense Settings</h2>
            <div className="p-4 border rounded-2xl">
              <h3 className="font-semibold">Ad Config File</h3>
              <p className="text-xs text-muted-foreground mt-1">All ad slots controlled from /lib/ads-config.ts - enable/disable globally, set client ID in .env</p>
              <pre className="mt-3 p-3 bg-foreground text-white rounded-xl text-xs overflow-auto">{`ADSENSE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  enabled: false, // Set true after approval
  autoAdsEnabled: false
}`}</pre>
            </div>
            <div className="p-4 border rounded-2xl">
              <h3 className="font-semibold">SEO Files</h3>
              <p className="text-xs text-muted-foreground mt-1">robots.txt via app/robots.ts, sitemap via app/sitemap.ts (dynamic), JSON-LD in layout. Auto metadata for every tool page.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
