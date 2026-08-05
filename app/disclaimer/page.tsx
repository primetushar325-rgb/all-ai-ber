import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export const metadata = generateSEO({title:"Disclaimer - All Ai Ber", description:"Disclaimer", canonical:"/disclaimer"})
export default function DisclaimerPage(){
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-3xl">
      <Breadcrumb items={[{name:'Disclaimer'}]}/>
      <div className="mt-8 rounded-[2rem] bg-white border p-8 prose prose-sm max-w-none">
        <h1>Disclaimer</h1>
        <p>All tools provided for informational purposes. No guarantee of accuracy. Use at your own risk. All Ai Ber not liable for any loss from tool use. External website links in directory are not endorsed, verify before use.</p>
      </div>
    </div>
  )
}
