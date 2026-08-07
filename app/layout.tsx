import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { generateSEO, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo"
import { ADSENSE_CONFIG } from "@/lib/ads-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const poppins = Poppins({ weight: ["400","500","600","700"], subsets: ["latin"], variable: "--font-poppins", display: "swap" })

export const metadata: Metadata = generateSEO({
  title: "All Ai Ber - World's Best Free AI + Tools Directory",
  description: "World's best free AI + Tools + Website Directory - 100+ free online tools for YouTube, Image, PDF, Text, Developer, Calculator, Converter. Fast, secure, no signup.",
  keywords: ["free tools", "ai tools", "online tools", "image tools", "pdf tools", "youtube tools", "developer tools", "allaiber", "all ai ber"],
  canonical: "/",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="monetag" content="a1bc62f856faf596393e74d73862da6c" />
        {ADSENSE_CONFIG.enabled && ADSENSE_CONFIG.clientId && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.clientId}`} crossOrigin="anonymous"></script>
        )}
    <script>(function(s){s.dataset.zone='11527321',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
    <script>(function(s){s.dataset.zone='11527319',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
      </head>
      <body className="min-h-screen bg-[#fafafa] flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* PWA Service Worker Registration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(reg){ console.log('SW registered'); }).catch(function(err){ console.log('SW fail', err) });
              });
            }
          `
        }} />
      </body>
    </html>
  )
}
