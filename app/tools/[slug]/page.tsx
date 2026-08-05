import { notFound } from "next/navigation"
import { tools, getToolBySlug, getRelatedTools } from "@/lib/tools"
import { getCategoryById } from "@/lib/categories"
import { ToolCard } from "@/components/tool-card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ToolTopAd, ToolBottomAd, SidebarAd } from "@/components/ads/ad-slot"
import { Clock, Star, Calendar } from "lucide-react"
import { generateSEO, generateBreadcrumbSchema, generateFAQSchema, generateToolSchema } from "@/lib/seo"
import { ToolRenderer } from "@/components/tool-renderer"
import { toolComponentMap } from "@/lib/tool-components"

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}
  return generateSEO({
    title: tool.seoTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    canonical: `/tools/${tool.slug}`,
  })
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool || !toolComponentMap[slug]) return notFound()

  const category = getCategoryById(tool.category)
  const related = getRelatedTools(tool.slug).slice(0, 3)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: category?.name || tool.category, url: `/${category?.slug || tool.category}` },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ])

  const faqSchema = generateFAQSchema(tool.faqs)
  const toolSchema = generateToolSchema({ name: tool.name, description: tool.description, url: `/tools/${tool.slug}`, category: tool.category })

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />

      <Breadcrumb items={[
        { name: 'Tools', href: '/tools' },
        { name: category?.name || tool.category, href: `/${category?.slug || tool.category}` },
        { name: tool.name }
      ]} />

      <div className="mt-6 grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <ToolTopAd />

          <div className="rounded-[2rem] bg-white border p-6 md:p-8 shadow-soft">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center text-4xl shadow-sm flex-shrink-0">
                {tool.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium capitalize">{tool.category}</span>
                  {tool.featured && <span className="px-3 py-1 bg-accent text-black rounded-full text-xs font-bold">FEATURED</span>}
                  {tool.popular && <span className="px-3 py-1 bg-foreground text-white rounded-full text-xs font-bold">POPULAR</span>}
                  {tool.isNew && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">NEW</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
                <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed max-w-2xl">{tool.longDescription}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Updated {tool.lastUpdated}</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> 4.9 (1.2k reviews)</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Free forever</span>
                </div>

                <div className="flex gap-2 mt-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-xs bg-white">Share • Favorite • Copy Link available on tool page</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] bg-white border p-6 md:p-8 shadow-soft">
            <ToolRenderer slug={slug} />
          </div>

          <div className="mt-8 rounded-[2rem] bg-white border p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                <strong className="text-foreground">{tool.name}</strong> is a free online tool from <strong>All Ai Ber</strong> that helps you {tool.description.toLowerCase()}. 
                Our {tool.name.toLowerCase()} is fast, secure, and works entirely in your browser - no data is sent to servers, ensuring 100% privacy.
              </p>
              <p>
                {tool.longDescription} Whether you're a student, developer, creator, or professional, this tool is designed to save your time and boost productivity.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">How to use {tool.name}?</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Enter your input in the tool above</li>
                <li>Click generate/convert button</li>
                <li>Copy or download the result instantly</li>
                <li>Use it wherever you need - no watermark, no limits!</li>
              </ol>
              <h3 className="text-lg font-semibold text-foreground mt-6">Why choose All Ai Ber {tool.name}?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>100% Free forever - no signup required</li>
                <li>Fast & lightweight - works on mobile too</li>
                <li>Secure - all processing in browser</li>
                <li>SEO optimized - trusted by 50K+ users worldwide</li>
                <li>Regularly updated - {tool.lastUpdated}</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-white border p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border bg-muted/30 p-4 open:bg-white open:shadow-soft">
                  <summary className="font-medium cursor-pointer list-none flex justify-between">{faq.question}<span className="group-open:rotate-45 transition-transform">+</span></summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map(t => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </div>
          )}

          <ToolBottomAd />
        </div>

        <div className="space-y-6">
          <SidebarAd />
          <div className="rounded-2xl bg-white border p-5">
            <h3 className="font-semibold mb-4">Tool Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium capitalize">{tool.category}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Added</span><span>{tool.lastUpdated}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Usage</span><span>50K+ uses</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span>⭐ 4.9/5</span></div>
            </div>
          </div>

          <div className="rounded-2xl bg-foreground text-white p-5">
            <h3 className="font-semibold mb-2">🚀 Need more tools?</h3>
            <p className="text-sm text-white/70 mb-4">Explore {tools.length}+ free tools for AI, image, YouTube and more.</p>
            <a href="/tools" className="inline-block w-full text-center py-2.5 bg-white text-black rounded-full text-sm font-semibold">Browse All Tools</a>
          </div>

          <div className="rounded-2xl bg-white border p-5">
            <h3 className="font-semibold mb-3">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {tool.keywords.slice(0, 6).map(k => (
                <a key={k} href={`/tools?q=${encodeURIComponent(k)}`} className="text-xs px-3 py-1.5 bg-muted rounded-full hover:bg-accent transition-colors">{k}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
