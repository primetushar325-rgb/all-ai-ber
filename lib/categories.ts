export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  count?: number
}

export const categories: Category[] = [
  {
    id: 'ai',
    name: 'AI Tools',
    slug: 'ai-tools',
    description: 'AI-powered tools for content generation and productivity',
    icon: '🤖',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    id: 'youtube',
    name: 'YouTube Tools',
    slug: 'youtube-tools',
    description: 'Tools for YouTube creators to grow their channel',
    icon: '🎥',
    color: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    id: 'image',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Edit, compress and convert images instantly',
    icon: '🖼️',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Manage PDF files with ease',
    icon: '📄',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    id: 'text',
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Text manipulation and analysis tools',
    icon: '📝',
    color: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Essential tools for developers and programmers',
    icon: '💻',
    color: 'bg-gray-100 text-gray-800 border-gray-300',
  },
  {
    id: 'calculator',
    name: 'Calculator Tools',
    slug: 'calculator-tools',
    description: 'Calculators for everyday needs',
    icon: '🧮',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  {
    id: 'converter',
    name: 'Converters',
    slug: 'converters',
    description: 'Convert between different formats and units',
    icon: '🔄',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug || c.id === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id)
}
