"use client"
import Link from "next/link"
import { Tool } from "@/lib/tools"
import { ArrowUpRight, Star, TrendingUp, Clock, Heart } from "lucide-react"
import { useState, useEffect } from "react"

interface ToolCardProps {
  tool: Tool
  variant?: 'default' | 'compact' | 'featured'
}

export function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('fav-tools') || '[]')
    setIsFav(favs.includes(tool.slug))
  }, [tool.slug])

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favs = JSON.parse(localStorage.getItem('fav-tools') || '[]')
    let newFavs
    if (favs.includes(tool.slug)) {
      newFavs = favs.filter((s: string) => s !== tool.slug)
    } else {
      newFavs = [...favs, tool.slug]
    }
    localStorage.setItem('fav-tools', JSON.stringify(newFavs))
    setIsFav(!isFav)
  }

  if (variant === 'compact') {
    return (
      <Link href={`/tools/${tool.slug}`} className="group flex items-center gap-3 p-3 rounded-xl border bg-white hover:shadow-medium hover:border-foreground/10 transition-all">
        <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-lg group-hover:scale-110 transition-transform">{tool.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{tool.name}</div>
          <div className="text-xs text-muted-foreground truncate">{tool.category}</div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/tools/${tool.slug}`} className="group relative overflow-hidden rounded-[1.5rem] bg-foreground text-white p-6 hover:shadow-large transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors" />
        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all">{tool.icon}</div>
            {tool.trending && <span className="flex items-center gap-1 text-[10px] font-bold bg-accent text-black px-2.5 py-1 rounded-full"><TrendingUp className="h-3 w-3" /> TRENDING</span>}
          </div>
          <h3 className="font-semibold text-lg mb-1.5 pr-6">{tool.name}</h3>
          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{tool.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 bg-white/10 rounded-full">{tool.category}</span>
            <Star className="h-3 w-3 fill-accent text-accent" /><span className="text-white/80">4.9</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/tools/${tool.slug}`} className="group relative rounded-2xl border border-border/50 bg-white p-5 hover:shadow-medium hover:border-foreground/10 hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <button onClick={toggleFav} className={`absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-red-50 text-red-500' : 'bg-muted/70 text-muted-foreground hover:bg-muted'}`}>
        <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
      </button>

      <div className="flex items-start gap-3.5 mb-3">
        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm">
          {tool.icon}
        </div>
        <div className="flex-1 pr-8">
          <h3 className="font-semibold text-[15px] leading-tight group-hover:text-foreground transition-colors line-clamp-1">{tool.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium capitalize">{tool.category}</span>
            {tool.isNew && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">NEW</span>}
            {tool.popular && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-yellow-800 font-bold">POPULAR</span>}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">{tool.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> Updated {new Date(tool.lastUpdated).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
        </div>
        <div className="h-7 w-7 rounded-full bg-foreground text-white flex items-center justify-center group-hover:bg-black transition-colors">
          <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export function WebsiteCard({ website }: { website: any }) {
  return (
    <a href={website.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border bg-white p-5 hover:shadow-medium transition-all flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{website.logo}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-[15px] flex items-center gap-1.5">{website.name} {website.verified && <span className="h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>}</h3>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted capitalize">{website.category}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{website.description}</p>
      <div className="mt-3 flex gap-1.5 flex-wrap">
        {website.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="text-[10px] px-2 py-1 bg-muted rounded-full">#{tag}</span>
        ))}
      </div>
    </a>
  )
}

export function CategoryCard({ category, count }: { category: any, count?: number }) {
  return (
    <Link href={`/${category.slug}`} className="group rounded-2xl border bg-white p-5 hover:shadow-medium transition-all hover:-translate-y-0.5">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${category.color} border group-hover:scale-110 transition-transform`}>{category.icon}</div>
      <h3 className="font-semibold mb-1">{category.name}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
      <div className="text-xs font-medium px-2.5 py-1 bg-muted rounded-full inline-block">{count ?? '—'} tools</div>
    </Link>
  )
}
