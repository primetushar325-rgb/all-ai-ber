import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateSEO } from "@/lib/seo"
export const metadata = generateSEO({title:"About Us - All Ai Ber Story", description:"About All Ai Ber - world's best free tools platform", canonical:"/about"})
export default function AboutPage(){
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-4xl">
      <Breadcrumb items={[{name:'About'}]}/>
      <div className="mt-8 rounded-[2rem] bg-white border p-8 md:p-12">
        <h1 className="text-4xl font-bold">About All Ai Ber</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
          All Ai Ber is world's best free AI + Tools + Website Directory platform built for creators worldwide - USA, UK, Canada, Australia, Germany, India, Bangladesh and beyond.
        </p>
        <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Provide 100+ fast, secure, private, free tools that work in browser without signup. No limits, no watermark, no data collection. Mobile-first, SEO-ready, AdSense-ready, future-proof.</p>
        <h2 className="text-2xl font-bold mt-8">Why All Ai Ber?</h2>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-2">
          <li>33+ real working tools at launch, unlimited expansion</li>
          <li>Website Directory - add your website link and get traffic</li>
          <li>Premium Black + White + Soft Yellow Glassmorphism design</li>
          <li>Next.js 15, TypeScript, Tailwind, Supabase ready</li>
          <li>PWA installable, offline ready, Lighthouse 95+</li>
          <li>Google AdSense ready with CLS-safe placeholders</li>
        </ul>
      </div>
    </div>
  )
}
