// Dynamic tool component registry - Add new tool component here
// This enables auto-appearing when new tool file is added

export const toolComponentMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'word-counter': () => import('@/components/tools/word-counter'),
  'character-counter': () => import('@/components/tools/character-counter'),
  'case-converter': () => import('@/components/tools/case-converter'),
  'json-formatter': () => import('@/components/tools/json-formatter'),
  'base64-encoder': () => import('@/components/tools/base64-encoder'),
  'base64-decoder': () => import('@/components/tools/base64-decoder'),
  'qr-generator': () => import('@/components/tools/qr-generator'),
  'password-generator': () => import('@/components/tools/password-generator'),
  'color-picker': () => import('@/components/tools/color-picker'),
  'age-calculator': () => import('@/components/tools/age-calculator'),
  'percentage-calculator': () => import('@/components/tools/percentage-calculator'),
  'unit-converter': () => import('@/components/tools/unit-converter'),
  'ai-prompt-generator': () => import('@/components/tools/ai-prompt-generator'),
  'youtube-title-generator': () => import('@/components/tools/youtube-title-generator'),
  'youtube-description-generator': () => import('@/components/tools/youtube-description-generator'),
  'hashtag-generator': () => import('@/components/tools/hashtag-generator'),
  'keyword-generator': () => import('@/components/tools/keyword-generator'),
  'image-compressor': () => import('@/components/tools/image-compressor'),
  'image-resizer': () => import('@/components/tools/image-resizer'),
  'image-to-base64': () => import('@/components/tools/image-to-base64'),
  'text-to-speech': () => import('@/components/tools/text-to-speech'),
  'lorem-ipsum-generator': () => import('@/components/tools/lorem-ipsum-generator'),
  'slug-generator': () => import('@/components/tools/slug-generator'),
  'url-encoder': () => import('@/components/tools/url-encoder'),
  'md5-generator': () => import('@/components/tools/md5-generator'),
  'bmi-calculator': () => import('@/components/tools/bmi-calculator'),
  'loan-calculator': () => import('@/components/tools/loan-calculator'),
  'binary-converter': () => import('@/components/tools/binary-converter'),
  'discount-calculator': () => import('@/components/tools/discount-calculator'),
  'uuid-generator': () => import('@/components/tools/uuid-generator'),
  'meta-tag-generator': () => import('@/components/tools/meta-tag-generator'),
  'pdf-to-text': () => import('@/components/tools/pdf-to-text'),
  'hex-to-rgb': () => import('@/components/tools/hex-to-rgb'),
}

export function isValidToolSlug(slug: string): boolean {
  return slug in toolComponentMap
}
