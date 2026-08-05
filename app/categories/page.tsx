import { categories } from "@/lib/categories"
import { CategoryCard } from "@/components/tool-card"
import { tools } from "@/lib/tools"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export const metadata = generateSEO({title:"Tool Categories - Browse by Category", description:"Browse free tools by category", canonical:"/categories"})
export default function CategoriesPage(){
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Breadcrumb items={[{name:'Categories'}]}/>
      <h1 className="text-3xl md:text-4xl font-bold mt-6">Browse Categories</h1>
      <p className="text-muted-foreground mt-2">{categories.length} categories • {tools.length}+ tools</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {categories.map(cat=>{
          const count=tools.filter(t=>t.category===cat.id).length
          return <CategoryCard key={cat.id} category={cat} count={count}/>
        })}
      </div>
    </div>
  )
}
