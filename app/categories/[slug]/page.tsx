import { getCategoryBySlug, categories } from "@/lib/categories"
import { getToolsByCategory } from "@/lib/tools"
import { ToolCard } from "@/components/tool-card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation"
import { generateSEO } from "@/lib/seo"

export async function generateStaticParams(){ 
  return categories.map(c=>({slug:c.slug})) 
}

export async function generateMetadata({params}:{params: Promise<{slug:string}>}){ 
  const { slug } = await params
  const cat=getCategoryBySlug(slug)
  if(!cat) return {}
  return generateSEO({title:`${cat.name} - Free ${cat.name}`, description:cat.description, canonical:`/categories/${slug}`}) 
}

export default async function CategorySlugPage({params}:{params: Promise<{slug:string}>}){
  const { slug } = await params
  const cat=getCategoryBySlug(slug)
  if(!cat) return notFound()
  const tools=getToolsByCategory(cat.id)
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Breadcrumb items={[{name:'Categories', href:'/categories'}, {name:cat.name}]}/>
      <div className="mt-6 flex gap-4 items-center"><div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-3xl border ${cat.color}`}>{cat.icon}</div><div><h1 className="text-3xl font-bold">{cat.name}</h1><p className="text-muted-foreground">{cat.description}</p></div></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{tools.map(t=><ToolCard key={t.slug} tool={t}/>)}</div>
    </div>
  )
}
