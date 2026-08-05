import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export const metadata = generateSEO({title:"Privacy Policy - All Ai Ber", description:"Privacy policy of All Ai Ber", canonical:"/privacy"})
export default function PrivacyPage(){
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-3xl">
      <Breadcrumb items={[{name:'Privacy Policy'}]}/>
      <div className="mt-8 rounded-[2rem] bg-white border p-8 prose prose-sm max-w-none">
        <h1>Privacy Policy</h1>
        <p>Last updated: Aug 3, 2026</p>
        <p>All Ai Ber does not collect personal data. All tools work client-side in your browser. We use no cookies for tools, only for analytics (if enabled) and AdSense after approval.</p>
        <h2>No Data Collection</h2>
        <p>Text you enter in tools never leaves your browser. No server storage. Secure & private.</p>
        <h2>AdSense</h2>
        <p>After approval, Google AdSense may use cookies. You can opt-out via Google settings.</p>
        <h2>Contact</h2>
        <p>contact@allaiber.com</p>
      </div>
    </div>
  )
}
