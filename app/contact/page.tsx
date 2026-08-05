import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export const metadata = generateSEO({title:"Contact Us - All Ai Ber", description:"Contact All Ai Ber team", canonical:"/contact"})
export default function ContactPage(){
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-2xl">
      <Breadcrumb items={[{name:'Contact'}]}/>
      <div className="mt-8 rounded-[2rem] bg-white border p-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-sm text-muted-foreground mt-2">Have question, suggestion, or want to add your website? Reach out!</p>
        <form className="mt-6 space-y-4">
          <input placeholder="Your Name" className="w-full h-12 px-4 rounded-2xl border"/>
          <input placeholder="Your Email" type="email" className="w-full h-12 px-4 rounded-2xl border"/>
          <textarea placeholder="Your Message" className="w-full min-h-[120px] p-4 rounded-2xl border"/>
          <button type="button" className="w-full h-12 bg-foreground text-white rounded-2xl font-medium">Send Message (Demo - Connect Email API)</button>
        </form>
        <div className="mt-6 p-4 bg-muted rounded-2xl text-sm">
          <div>Email: contact@allaiber.com</div>
          <div className="mt-1">Response time: 24 hours</div>
        </div>
      </div>
    </div>
  )
}
