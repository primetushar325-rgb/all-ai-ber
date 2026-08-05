import { getPopularTools } from "@/lib/tools"
import { ToolCard } from "@/components/tool-card"
import { generateSEO } from "@/lib/seo"
import { Breadcrumb } from "@/components/ui/breadcrumb"
export const metadata = generateSEO({title:"Popular Tools - Most Used Free Tools", description:"Most popular free tools used by 50K+ creators", canonical:"/popular"})
export default function PopularPage(){
  const tools=getPopularTools()
  return (<div className="container mx-auto px-4 md:px-6 py-6"><Breadcrumb items={[{name:'Popular Tools'}]}/><h1 className="text-3xl font-bold mt-6">🔥 Popular Tools ({tools.length})</h1><p className="text-muted-foreground mt-2">Most used tools by our community</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{tools.map(t=><ToolCard key={t.slug} tool={t}/>)}</div></div>)
}
