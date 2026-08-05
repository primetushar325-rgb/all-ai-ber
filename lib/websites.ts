export interface WebsiteEntry {
  id: string
  name: string
  slug: string
  url: string
  logo: string
  category: string
  description: string
  tags: string[]
  featured: boolean
  verified: boolean
  addedAt: string
}

// Dynamic Website Directory - Add more websites here
// New websites automatically appear on homepage, directory, and search
export const websiteDirectory: WebsiteEntry[] = [
  {
    id: '1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    url: 'https://chat.openai.com',
    logo: '🤖',
    category: 'ai',
    description: 'Advanced AI chatbot by OpenAI for conversations, writing, coding and more.',
    tags: ['ai', 'chatbot', 'openai', 'productivity'],
    featured: true,
    verified: true,
    addedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Canva',
    slug: 'canva',
    url: 'https://canva.com',
    logo: '🎨',
    category: 'image',
    description: 'Free design tool for creating social media graphics, presentations and more.',
    tags: ['design', 'graphics', 'templates', 'free'],
    featured: true,
    verified: true,
    addedAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Remove.bg',
    slug: 'remove-bg',
    url: 'https://remove.bg',
    logo: '✂️',
    category: 'image',
    description: 'Remove background from images 100% automatically in 5 seconds with AI.',
    tags: ['background remover', 'ai', 'image editing'],
    featured: true,
    verified: true,
    addedAt: '2024-01-12',
  },
  {
    id: '4',
    name: 'Grammarly',
    slug: 'grammarly',
    url: 'https://grammarly.com',
    logo: '✍️',
    category: 'text',
    description: 'AI writing assistant for grammar, spelling and plagiarism checking.',
    tags: ['writing', 'grammar', 'spell check', 'ai'],
    featured: false,
    verified: true,
    addedAt: '2024-01-08',
  },
  {
    id: '5',
    name: 'TinyPNG',
    slug: 'tinypng',
    url: 'https://tinypng.com',
    logo: '🗜️',
    category: 'image',
    description: 'Smart PNG and JPEG compression to reduce file size without losing quality.',
    tags: ['compress', 'image', 'optimization'],
    featured: false,
    verified: true,
    addedAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'iLovePDF',
    slug: 'ilovepdf',
    url: 'https://ilovepdf.com',
    logo: '📄',
    category: 'pdf',
    description: 'Every tool you need to work with PDFs in one place - 100% free.',
    tags: ['pdf', 'merge', 'split', 'compress'],
    featured: true,
    verified: true,
    addedAt: '2024-01-03',
  },
  {
    id: '7',
    name: 'GitHub',
    slug: 'github',
    url: 'https://github.com',
    logo: '🐙',
    category: 'developer',
    description: 'Where the world builds software - hosting for version control and collaboration.',
    tags: ['code', 'git', 'developer', 'open source'],
    featured: true,
    verified: true,
    addedAt: '2024-01-01',
  },
  {
    id: '8',
    name: 'Figma',
    slug: 'figma',
    url: 'https://figma.com',
    logo: '🎯',
    category: 'image',
    description: 'Collaborative interface design tool for teams building products together.',
    tags: ['ui design', 'prototyping', 'collaboration'],
    featured: false,
    verified: true,
    addedAt: '2024-02-01',
  },
  {
    id: '9',
    name: 'TubeBuddy',
    slug: 'tubebuddy',
    url: 'https://tubebuddy.com',
    logo: '📈',
    category: 'youtube',
    description: 'Browser extension to optimize YouTube channel growth and management.',
    tags: ['youtube', 'seo', 'analytics'],
    featured: false,
    verified: true,
    addedAt: '2024-02-05',
  },
  {
    id: '10',
    name: 'Notion',
    slug: 'notion',
    url: 'https://notion.so',
    logo: '📓',
    category: 'text',
    description: 'All-in-one workspace for notes, tasks, wikis and databases.',
    tags: ['productivity', 'notes', 'organization'],
    featured: false,
    verified: true,
    addedAt: '2024-02-10',
  },
  {
    id: '11',
    name: 'Vercel',
    slug: 'vercel',
    url: 'https://vercel.com',
    logo: '▲',
    category: 'developer',
    description: 'Frontend cloud platform to build, scale, and secure faster web experiences.',
    tags: ['hosting', 'deployment', 'nextjs'],
    featured: false,
    verified: true,
    addedAt: '2024-02-12',
  },
  {
    id: '12',
    name: 'Pexels',
    slug: 'pexels',
    url: 'https://pexels.com',
    logo: '📸',
    category: 'image',
    description: 'Best free stock photos, royalty free images & videos shared by creators.',
    tags: ['stock photos', 'free images', 'videos'],
    featured: false,
    verified: true,
    addedAt: '2024-02-15',
  },
]

export function getFeaturedWebsites(): WebsiteEntry[] {
  return websiteDirectory.filter(w => w.featured)
}

export function getWebsitesByCategory(category: string): WebsiteEntry[] {
  return websiteDirectory.filter(w => w.category === category)
}

export function searchWebsites(query: string): WebsiteEntry[] {
  const q = query.toLowerCase()
  return websiteDirectory.filter(w => 
    w.name.toLowerCase().includes(q) ||
    w.description.toLowerCase().includes(q) ||
    w.tags.some(tag => tag.toLowerCase().includes(q))
  )
}

export function getWebsiteBySlug(slug: string): WebsiteEntry | undefined {
  return websiteDirectory.find(w => w.slug === slug)
}
