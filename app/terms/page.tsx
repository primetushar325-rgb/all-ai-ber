import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export const metadata = generateSEO({title:"Terms of Service - All Ai Ber", description:"Terms of All Ai Ber", canonical:"/terms"})
export default function TermsPage(){
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-3xl">
      <Breadcrumb items={[{name:'Terms'}]}/>
      <div className="mt-8 rounded-[2rem] bg-white border p-8 prose prose-sm max-w-none">
        <h1>Terms of Service</h1>
        <p>By using All Ai Ber, you agree to use tools for lawful purposes. Tools provided as-is, no warranty. Free for personal & commercial use. Do not abuse rate limits. We reserve right to block misuse.</p>
      </div>
    </div>
  )
}
