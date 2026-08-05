import type { MetadataRoute } from 'next'
import { tools } from '@/lib/tools'
import { categories } from '@/lib/categories'
import { websiteDirectory } from '@/lib/websites'
import { SITE_URL } from '@/lib/utils'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, '')
  const staticPages = ['', '/tools', '/categories', '/popular', '/trending', '/latest', '/websites', '/about', '/contact', '/privacy', '/terms', '/disclaimer', '/ai-tools', '/image-tools', '/pdf-tools', '/text-tools', '/developer-tools', '/youtube-tools', '/calculator-tools', '/converters']
  const staticUrls = staticPages.map(p=>({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: p==='' ? 1 : 0.8 }))
  const toolUrls = tools.map(t=>({ url: `${base}/tools/${t.slug}`, lastModified: new Date(t.lastUpdated), changeFrequency: 'weekly' as const, priority: 0.9 }))
  const catUrls = categories.map(c=>({ url: `${base}/${c.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 }))
  return [...staticUrls, ...toolUrls, ...catUrls]
}
