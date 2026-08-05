import { getTrendingTools } from "@/lib/tools"
import { ToolCard } from "@/components/tool-card"
import { generateSEO } from "@/lib/seo"
import { Breadcrumb } from "@/components/ui/breadcrumb"
export const metadata = generateSEO({title:"Trending Tools - Hot & Viral Free Tools", description:"Trending free tools right now", canonical:"/trending"})
export default function TrendingPage(){
  const tools=getTrendingTools()
  return (<div className="container mx-auto px-4 md:px-6 py-6"><Breadcrumb items={[{name:'Trending'}]}/><h1 className="text-3xl font-bold mt-6">📈 Trending Tools</h1><p className="text-muted-foreground mt-2">Hot tools trending this week</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{tools.map(t=><ToolCard key={t.slug} tool={t} variant="featured"/>)}</div></div>)
}
