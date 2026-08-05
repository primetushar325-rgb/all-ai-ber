import { websiteDirectory } from "@/lib/websites"
import { WebsiteCard } from "@/components/tool-card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { SearchBox } from "@/components/ui/search-box"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({title:"Website Directory - Best Free Websites", description:"Best free websites directory for creators, developers, designers", canonical:"/websites"})

export default async function WebsitesPage({searchParams}:{searchParams: Promise<{q?:string}>}){
  const sp = await searchParams
  const q=sp?.q?.toLowerCase() || ""
  const list = q ? websiteDirectory.filter(w=> w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.tags.some(t=>t.toLowerCase().includes(q))) : websiteDirectory
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Breadcrumb items={[{name:'Website Directory'}]}/>
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <div><h1 className="text-3xl md:text-4xl font-bold">🌐 Website Directory</h1><p className="text-muted-foreground mt-2">{websiteDirectory.length}+ best free websites curated for you</p></div>
        <div className="w-full md:w-[320px]"><SearchBox placeholder="Search websites..."/></div>
      </div>
      <div className="mt-8 text-sm text-muted-foreground">Showing {list.length} websites {q?`for "${sp?.q}"`:''}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {list.map(site=> <WebsiteCard key={site.id} website={site}/>)}
      </div>
    </div>
  )
}
