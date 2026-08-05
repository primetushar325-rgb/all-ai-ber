"use client"
import { AD_SLOTS, ADSENSE_CONFIG, getPlaceholderEnabled } from "@/lib/ads-config"
import { useEffect, useState } from "react"

interface AdSlotProps {
  slot: keyof typeof AD_SLOTS
  className?: string
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const [isMounted, setIsMounted] = useState(false)
  const config = AD_SLOTS[slot]
  const showPlaceholder = getPlaceholderEnabled()

  useEffect(() => {
    setIsMounted(true)
    // Load AdSense script if enabled
    if (ADSENSE_CONFIG.enabled && ADSENSE_CONFIG.clientId && isMounted) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {}
    }
  }, [isMounted])

  if (!config?.enabled) return null
  if (!isMounted) return null

  // If AdSense not configured, show placeholder in dev
  if (!ADSENSE_CONFIG.enabled || !ADSENSE_CONFIG.clientId) {
    if (!showPlaceholder) return null
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-dashed border-border bg-muted/30 flex items-center justify-center ${config.className} ${className}`}>
        <div className="text-center p-4">
          <div className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase mb-1">ADVERTISEMENT</div>
          <div className="text-xs text-muted-foreground font-medium">{config.name}</div>
          <div className="text-[10px] text-muted-foreground/50 mt-1">{config.format} • {config.id}</div>
          <div className="text-[10px] text-muted-foreground/40 mt-2 max-w-[200px] mx-auto leading-relaxed">
            Placeholder - Add AdSense ID in .env to show real ads. This is CLS-safe.
          </div>
        </div>
      </div>
    )
  }

  // Real AdSense ad
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-muted/20 ${config.className} ${className}`}>
      <div className="absolute top-1 right-2 text-[9px] text-muted-foreground/30 uppercase tracking-widest">AD</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={ADSENSE_CONFIG.clientId}
        data-ad-slot={config.id}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Convenience wrappers
export function TopBannerAd() { return <AdSlot slot="topBanner" /> }
export function HeaderAd() { return <AdSlot slot="header" /> }
export function SidebarAd() { return <AdSlot slot="sidebar" /> }
export function InContentAd() { return <AdSlot slot="inContent" /> }
export function MiddleAd() { return <AdSlot slot="middle" /> }
export function FooterAd() { return <AdSlot slot="footer" /> }
export function StickyMobileAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t shadow-large p-2">
      <AdSlot slot="stickyMobile" />
    </div>
  )
}
export function ToolTopAd() { return <AdSlot slot="toolTop" /> }
export function ToolBottomAd() { return <AdSlot slot="toolBottom" /> }
