"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, Sparkles, ChevronDown } from "lucide-react"
import { SearchBox } from "./ui/search-box"
import { categories } from "@/lib/categories"
import { tools } from "@/lib/tools"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const navLinks = [
    { name: 'Tools', href: '/tools', count: tools.length },
    { name: 'Categories', href: '/categories' },
    { name: 'Websites', href: '/websites' },
    { name: 'Popular', href: '/popular' },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 font-bold">
              <div className="h-9 w-9 rounded-xl bg-foreground flex items-center justify-center text-white font-black text-[15px] shadow-soft">
                Ai
              </div>
              <span className="text-xl tracking-tight hidden sm:block font-poppins">
                All Ai <span className="bg-accent px-1.5 py-0.5 rounded-lg">Ber</span>
              </span>
              <span className="text-xl tracking-tight sm:hidden font-poppins">AAB</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.name} href={link.href} className="px-4 py-2 text-[14px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-full transition-all flex items-center gap-1.5">
                  {link.name}
                  {link.count && <span className="bg-accent text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">{link.count}</span>}
                </Link>
              ))}
              <div className="relative group ml-2">
                <button className="flex items-center gap-1 px-4 py-2 text-[14px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-full transition-all">
                  More <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl border shadow-large p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link href="/trending" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">🔥 Trending Tools</Link>
                  <Link href="/latest" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">✨ Latest Tools</Link>
                  <Link href="/ai-tools" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">🤖 AI Tools</Link>
                  <Link href="/image-tools" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">🖼️ Image Tools</Link>
                  <Link href="/youtube-tools" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">🎥 YouTube Tools</Link>
                  <Link href="/calculator-tools" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">🧮 Calculators</Link>
                  <div className="border-t my-1.5" />
                  <Link href="/about" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">About Us</Link>
                  <Link href="/contact" className="flex px-3 py-2.5 text-sm hover:bg-muted rounded-xl transition-colors">Contact</Link>
                </div>
              </div>
            </nav>

            {/* Search + CTA */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block w-[260px] lg:w-[320px]">
                <SearchBox placeholder="Search tools..." />
              </div>
              <button onClick={() => setShowSearch(!showSearch)} className="md:hidden h-10 w-10 flex items-center justify-center bg-muted rounded-xl">
                <Search className="h-5 w-5" />
              </button>
              <Link href="/tools" className="hidden md:flex h-10 px-5 items-center gap-2 bg-foreground text-white rounded-full text-sm font-medium hover:bg-black/90 transition-colors shadow-soft">
                <Sparkles className="h-4 w-4" /> Explore
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden h-10 w-10 flex items-center justify-center bg-muted rounded-xl">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4 animate-slide-down">
              <SearchBox placeholder="Search tools, websites..." autoFocus />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white animate-slide-down">
            <div className="container px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted rounded-xl font-medium">
                  {link.name} {link.count && <span className="bg-foreground text-white text-xs px-2 py-1 rounded-full">{link.count}</span>}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/trending" onClick={() => setMobileOpen(false)} className="px-4 py-3 bg-muted rounded-xl text-sm font-medium text-center">🔥 Trending</Link>
                <Link href="/latest" onClick={() => setMobileOpen(false)} className="px-4 py-3 bg-muted rounded-xl text-sm font-medium text-center">✨ Latest</Link>
                <Link href="/ai-tools" onClick={() => setMobileOpen(false)} className="px-4 py-3 bg-muted rounded-xl text-sm font-medium text-center">🤖 AI Tools</Link>
                <Link href="/image-tools" onClick={() => setMobileOpen(false)} className="px-4 py-3 bg-muted rounded-xl text-sm font-medium text-center">🖼️ Image</Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {categories.map(cat => (
                  <Link key={cat.id} href={`/${cat.slug}`} onClick={() => setMobileOpen(false)} className="px-2 py-2.5 rounded-xl border text-center text-xs font-medium hover:bg-muted transition-colors">
                    <span className="block text-lg mb-1">{cat.icon}</span>{cat.name.split(' ')[0]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
