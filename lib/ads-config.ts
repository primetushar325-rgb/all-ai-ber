// Central Ad Configuration - Edit this file to control all ad placements
// Leave adClient empty until AdSense approval
// This file ensures CLS-safe, policy-compliant ad placements

export interface AdSlot {
  id: string
  name: string
  enabled: boolean
  format: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive: boolean
  style?: React.CSSProperties
  className?: string
}

export const ADSENSE_CONFIG = {
  // Replace with your AdSense Client ID after approval
  // Example: ca-pub-1234567890123456
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
  
  // Enable/disable all ads globally
  enabled: false, // Set to true after AdSense approval
  
  // Auto Ads enabled (Google will automatically place ads if true)
  autoAdsEnabled: false,
}

export const AD_SLOTS: Record<string, AdSlot> = {
  topBanner: {
    id: 'top-banner',
    name: 'Top Banner',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full min-h-[90px] md:min-h-[120px]',
  },
  header: {
    id: 'header-ad',
    name: 'Header Ad',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full min-h-[100px]',
  },
  sidebar: {
    id: 'sidebar-ad',
    name: 'Sidebar Ad',
    enabled: true,
    format: 'vertical',
    responsive: true,
    className: 'w-full min-h-[250px] md:min-h-[600px]',
  },
  inContent: {
    id: 'in-content-ad',
    name: 'In-Content Ad',
    enabled: true,
    format: 'rectangle',
    responsive: true,
    className: 'w-full min-h-[250px] my-8',
  },
  middle: {
    id: 'middle-ad',
    name: 'Middle Section Ad',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full min-h-[120px] my-12',
  },
  footer: {
    id: 'footer-ad',
    name: 'Footer Ad',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full min-h-[90px]',
  },
  stickyMobile: {
    id: 'sticky-mobile-ad',
    name: 'Sticky Mobile Ad',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full h-[60px] md:hidden',
  },
  toolTop: {
    id: 'tool-top-ad',
    name: 'Tool Page Top',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full min-h-[90px] mb-6',
  },
  toolBottom: {
    id: 'tool-bottom-ad',
    name: 'Tool Page Bottom',
    enabled: true,
    format: 'horizontal',
    responsive: true,
    className: 'w-full min-h-[250px] mt-8',
  },
}

// Helper: Check if ads should show
export function shouldShowAds(slotId: string): boolean {
  if (!ADSENSE_CONFIG.enabled) return false
  if (!AD_SLOTS[slotId]?.enabled) return false
  if (!ADSENSE_CONFIG.clientId) return false
  return true
}

// Helper: Get placeholder for development (shows before AdSense approval)
export function getPlaceholderEnabled(): boolean {
  // Show placeholders in development for layout testing
  return process.env.NODE_ENV === 'development' || !ADSENSE_CONFIG.clientId
}
