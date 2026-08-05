import { getNewTools } from "@/lib/tools"
import { ToolCard } from "@/components/tool-card"
import { generateSEO } from "@/lib/seo"
import { Breadcrumb } from "@/components/ui/breadcrumb"
export const metadata = generateSEO({title:"Latest Tools - New Free Tools Added", description:"Latest newly added free tools", canonical:"/latest"})
export default function LatestPage(){
  const tools=getNewTools()
  return (<div className="container mx-auto px-4 md:px-6 py-6"><Breadcrumb items={[{name:'Latest'}]}/><h1 className="text-3xl font-bold mt-6">✨ Latest Tools</h1><p className="text-muted-foreground mt-2">Newly added tools - be first to try</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{tools.map(t=><ToolCard key={t.slug} tool={t}/>)}</div></div>)
}
