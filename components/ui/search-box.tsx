"use client"
import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp, Clock, Sparkles } from "lucide-react"
import { tools, searchTools } from "@/lib/tools"
import { websiteDirectory, searchWebsites } from "@/lib/websites"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchBoxProps {
  placeholder?: string
  className?: string
  variant?: 'default' | 'hero'
  autoFocus?: boolean
}

export function SearchBox({ placeholder = "Search tools, websites...", className = "", variant = 'default', autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length > 1) {
      const toolResults = searchTools(query).slice(0, 5).map(t => ({ ...t, type: 'tool' }))
      const webResults = searchWebsites(query).slice(0, 3).map(w => ({ ...w, type: 'website' }))
      setResults([...toolResults, ...webResults].slice(0, 6))
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const popularSearches = ["Word Counter", "QR Generator", "Image Compressor", "Password Generator", "YouTube Title"]

  const handleSearch = (q: string = query) => {
    if (!q.trim()) return
    router.push(`/tools?q=${encodeURIComponent(q)}`)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className={`relative flex items-center ${variant === 'hero' ? 'h-14 md:h-16' : 'h-11 md:h-12'} group`}>
        <Search className={`absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-foreground transition-colors ${variant === 'hero' ? 'md:h-6 md:w-6' : ''}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full h-full pl-12 pr-12 bg-white border border-border/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all shadow-soft hover:shadow-medium ${variant === 'hero' ? 'text-base md:text-lg' : 'text-sm md:text-[15px]'}`}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); setIsOpen(false) }}
            className="absolute right-3 p-1.5 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border shadow-large overflow-hidden animate-slide-down max-h-[400px] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Results</div>
              {results.map((item, i) => (
                <Link
                  key={`${item.type}-${item.slug}-${i}`}
                  href={item.type === 'tool' ? `/tools/${item.slug}` : item.url}
                  target={item.type === 'website' ? '_blank' : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-muted rounded-xl transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon || item.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.description?.slice(0, 60)}</div>
                  </div>
                  <div className="text-[10px] px-2 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium uppercase">
                    {item.type}
                  </div>
                </Link>
              ))}
              <button
                onClick={() => handleSearch()}
                className="w-full mt-2 py-2.5 text-sm font-medium bg-foreground text-white rounded-xl hover:bg-black/90 transition-colors"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : query.length > 1 ? (
            <div className="p-6 text-center">
              <div className="text-sm text-muted-foreground">No results found for "{query}"</div>
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {popularSearches.slice(0, 3).map(term => (
                  <button key={term} onClick={() => { setQuery(term); handleSearch(term) }} className="text-xs px-3 py-1.5 bg-muted rounded-full hover:bg-accent hover:text-black transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {!query && (
            <div className="p-3">
              <div className="px-2 py-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <TrendingUp className="h-3 w-3" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2 px-2 pb-2">
                {popularSearches.map(term => (
                  <button key={term} onClick={() => handleSearch(term)} className="flex items-center gap-1.5 text-xs px-3 py-2 bg-muted hover:bg-accent hover:text-black rounded-full transition-colors">
                    <Sparkles className="h-3 w-3" /> {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
