import Link from "next/link"
import { categories } from "@/lib/categories"
import { tools } from "@/lib/tools"

export function Footer() {
  return (
    <footer className="bg-foreground text-white mt-20 rounded-t-[2rem] md:rounded-t-[2.5rem] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-black font-black">Ai</div>
              <span className="font-poppins">All Ai <span className="bg-accent text-black px-2 py-0.5 rounded-lg">Ber</span></span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              World's best free AI + Tools + Website Directory. 100+ tools for creators, developers, students and professionals worldwide.
            </p>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium backdrop-blur">🌍 50K+ Monthly Users</div>
              <div className="px-3 py-1.5 bg-accent text-black rounded-full text-xs font-bold">100% Free</div>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Popular Tools</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {tools.filter(t => t.popular).slice(0, 6).map(tool => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="hover:text-white transition-colors flex items-center gap-2">
                    <span>{tool.icon}</span> {tool.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/tools" className="text-accent hover:underline font-medium">View all {tools.length} tools →</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/websites" className="hover:text-white transition-colors">🌐 Website Directory</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs font-semibold text-white/80 mb-1">🚀 For Creators Worldwide</div>
              <div className="text-[11px] text-white/50">USA • UK • Canada • Germany • India • Bangladesh</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} All Ai Ber. All rights reserved. Made with ❤️ for free tools lovers.</div>
          <div className="flex gap-4">
            <span>⚡ Fast • 🔒 Secure • 📱 Mobile First</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
