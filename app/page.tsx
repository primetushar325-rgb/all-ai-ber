import { SearchBox } from "@/components/ui/search-box"
import { ToolCard, CategoryCard, WebsiteCard } from "@/components/tool-card"
import { getFeaturedTools, getPopularTools, getTrendingTools, getNewTools, tools } from "@/lib/tools"
import { categories } from "@/lib/categories"
import { getFeaturedWebsites, websiteDirectory } from "@/lib/websites"
import { TopBannerAd, MiddleAd, InContentAd } from "@/components/ads/ad-slot"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe, Star, Users } from "lucide-react"

export default function HomePage() {
  const featuredTools = getFeaturedTools()
  const popularTools = getPopularTools().slice(0, 8)
  const trendingTools = getTrendingTools().slice(0, 6)
  const newTools = getNewTools().slice(0, 6)
  const featuredWebsites = getFeaturedWebsites().slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#fafafa] border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 pt-10 md:pt-20 pb-12 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground text-white text-xs font-medium">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" /> 
              <span>100% Free • No Signup • Fast & Secure</span>
              <span className="bg-accent text-black px-2 py-0.5 rounded-full text-[10px] font-bold">NEW</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              All Tools You Need in <span className="bg-foreground text-white px-3 py-1 rounded-2xl inline-block rotate-1">One</span> Place
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              World's best free AI + Tools + Website Directory. {tools.length}+ tools for creators, developers, students & pros. Fast, private, free forever.
            </p>

            <div className="max-w-2xl mx-auto pt-4">
              <SearchBox variant="hero" placeholder="Search 33+ tools, e.g. Word Counter, QR Generator..." />
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-xs text-muted-foreground">Popular:</span>
                {["Word Counter", "QR Code", "Image Compressor", "Password"].map(t => (
                  <Link key={t} href={`/tools?q=${t}`} className="text-xs px-3 py-1 bg-white border rounded-full hover:bg-muted transition-colors">
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm">
              <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span><b>50K+</b> Users</span></div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4" /><span><b>Fast</b> & Light</span></div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /><span><b>Worldwide</b> Free</span></div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-accent text-accent" /><span><b>4.9/5</b> Rating</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 space-y-16 py-12">
        <TopBannerAd />

        {/* Categories */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
              <p className="text-sm text-muted-foreground mt-1">Find perfect tool for your need</p>
            </div>
            <Link href="/categories" className="hidden md:flex items-center gap-1 text-sm font-medium hover:underline">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map(cat => {
              const count = tools.filter(t => t.category === cat.id).length
              return <CategoryCard key={cat.id} category={cat} count={count} />
            })}
          </div>
        </section>

        <InContentAd />

        {/* Featured Tools */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center"><Sparkles className="h-5 w-5" /></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Featured Tools</h2>
                <p className="text-sm text-muted-foreground">Handpicked best tools for you</p>
              </div>
            </div>
            <Link href="/tools" className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-foreground text-white rounded-full text-sm">All {tools.length} tools <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.slice(0, 9).map(tool => (
              <ToolCard key={tool.slug} tool={tool} variant="featured" />
            ))}
          </div>
        </section>

        {/* Popular */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">🔥 Popular Tools</h2>
              <p className="text-sm text-muted-foreground mt-1">Most used by our community</p>
            </div>
            <Link href="/popular" className="text-sm font-medium hover:underline hidden md:block">View Popular →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map(tool => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <MiddleAd />

        {/* Trending + New */}
        <div className="grid lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="h-6 w-6" /> Trending Now</h2>
            <div className="grid gap-3">
              {trendingTools.map(tool => (
                <ToolCard key={tool.slug} tool={tool} variant="compact" />
              ))}
            </div>
            <Link href="/trending" className="mt-4 inline-flex text-sm font-medium hover:underline">View trending →</Link>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">✨ Latest Tools</h2>
            <div className="grid gap-3">
              {newTools.map(tool => (
                <ToolCard key={tool.slug} tool={tool} variant="compact" />
              ))}
            </div>
            <Link href="/latest" className="mt-4 inline-flex text-sm font-medium hover:underline">View latest →</Link>
          </section>
        </div>

        {/* Website Directory */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">🌐 Top Websites Directory</h2>
              <p className="text-sm text-muted-foreground mt-1">Best free websites for creators & developers - {websiteDirectory.length}+ sites</p>
            </div>
            <Link href="/websites" className="hidden md:block text-sm font-medium hover:underline">View all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredWebsites.map(site => (
              <WebsiteCard key={site.id} website={site} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="rounded-[2rem] bg-foreground text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Loved by 50,000+ Creators Worldwide</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {name:"Sarah M., USA", role:"YouTuber", text:"Best free tools site ever! YouTube title generator got me 100K views."},
                {name:"Rahul K., India", role:"Developer", text:"JSON formatter and base64 tools save me hours daily. Super fast!"},
                {name:"Emma L., UK", role:"Designer", text:"Image compressor is magic - reduced 80% size without quality loss."},
              ].map((t,i)=>(
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                  <div className="flex gap-1 mb-3">{Array(5).fill(0).map((_,j)=><Star key={j} className="h-4 w-4 fill-accent text-accent"/>)}</div>
                  <p className="text-sm text-white/80 leading-relaxed">"{t.text}"</p>
                  <div className="mt-3 text-xs"><b>{t.name}</b> <span className="opacity-60">• {t.role}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {q:"Are all tools really free?", a:"Yes! All 33+ tools are 100% free forever. No signup, no limits, no hidden fees."},
              {q:"Is my data secure?", a:"Absolutely. All tools work in your browser. No data sent to server. Private & secure."},
              {q:"Can I use tools on mobile?", a:"Yes, mobile-first design. All tools work perfectly on phone, tablet, desktop."},
              {q:"How to add my website to directory?", a:"Use Admin Panel or contact us. We review and list quality websites for free."},
              {q:"Do you support Bangladesh & India users?", a:"Yes! Optimized for worldwide including USA, UK, India, Bangladesh with fast CDN."},
            ].map((f,i)=>(
              <details key={i} className="group rounded-2xl border bg-white p-5 open:shadow-medium transition-all">
                <summary className="flex justify-between items-center cursor-pointer font-medium list-none">
                  {f.q}
                  <span className="h-7 w-7 rounded-full bg-muted flex items-center justify-center group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
