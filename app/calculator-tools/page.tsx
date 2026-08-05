import { getToolsByCategory } from "@/lib/tools"
import { getCategoryBySlug } from "@/lib/categories"
import { ToolCard } from "@/components/tool-card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export async function generateMetadata(){ const cat=getCategoryBySlug("calculator-tools"); return generateSEO({title: (cat?.name || "calculator-tools") + " - Free Tools", description: cat?.description || "Free tools", canonical: "/calculator-tools"}) }
export default function CategoryPage(){
  const cat=getCategoryBySlug("calculator-tools")
  const tools=getToolsByCategory(cat?.id || "calculator-tools".replace("-tools","").replace("converters","converter"))
  return (<div className="container mx-auto px-4 md:px-6 py-6"><Breadcrumb items={[{name: cat?.name || "calculator-tools", href: "/calculator-tools"}]}/><div className="mt-6"><div className="flex gap-4 items-center"><div className="h-14 w-14 rounded-2xl flex items-center justify-center text-3xl border ${cat?.color || 'bg-muted'}">{cat?.icon || '🛠️'}</div><div><h1 className="text-3xl font-bold">{cat?.name || "calculator-tools"} ({tools.length})</h1><p className="text-muted-foreground">{cat?.description}</p></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{tools.length?tools.map(t=><ToolCard key={t.slug} tool={t}/>):<div className="col-span-3 py-12 text-center text-muted-foreground">No tools in this category yet. More coming soon!</div>}</div></div></div>)
}
