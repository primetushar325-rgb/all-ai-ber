import { tools, searchTools } from "@/lib/tools"
import { ToolCard } from "@/components/tool-card"
import { SearchBox } from "@/components/ui/search-box"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { TopBannerAd, InContentAd } from "@/components/ads/ad-slot"
import { generateSEO } from "@/lib/seo"
import { Suspense } from "react"

export const metadata = generateSEO({
  title: "All Free Tools - 33+ Online Tools",
  description: `Browse ${tools.length}+ free online tools - AI tools, YouTube tools, image, PDF, text, developer, calculator, converters. No signup, fast, secure.`,
  canonical: "/tools",
  keywords: ["free tools", "online tools", "ai tools", "all tools"],
})

function ToolsGrid({ query }: { query?: string }) {
  const list = query ? searchTools(query) : tools
  return (
    <>
      <div className="text-sm text-muted-foreground mb-4">
        Showing <b>{list.length}</b> {query ? `results for "${query}"` : "tools"}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold">No tools found</h3>
          <p className="text-sm text-muted-foreground mt-2">Try different keywords like "word counter" or "qr generator"</p>
        </div>
      )}
    </>
  )
}

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
  const sp = await searchParams
  const q = sp?.q || ""
  const cat = sp?.category
  let filteredQ = q

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Breadcrumb items={[{ name: 'Tools' }]} />
      <div className="mt-6 flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">All Free Tools ({tools.length}+)</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Fast, free, private tools for creators, developers, students worldwide. No signup, works offline, mobile-friendly.</p>
        </div>
        <div className="w-full lg:w-[380px]">
          <SearchBox placeholder="Search tools..." />
        </div>
      </div>

      <TopBannerAd />

      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ToolsGrid query={filteredQ} />
        </Suspense>
      </div>

      <InContentAd />
    </div>
  )
}
