export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Manually define the static routes for reliability in production environments
// as filesystem access (fs) can be unreliable in compiled serverless environments.
const staticRoutes = [
  '/',
  '/merge_pdf',
  '/split_pdf',
  '/word_to_pdf',
  '/pdf_to_pdfa',
  '/compress_pdf',
  '/unlock_pdf',
  '/remove_pdf_pages',
  '/add_watermark',
  '/add_page_no',
  '/add_pages_to_pdf',
  '/blogs',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/protect_pdf',
  '/disclaimer',
  'terms-and-conditions',

  '/add_pdf_in_pdf',
  '/extract_pdf',
  '/create_pdf',
  '/pdf_to_jpg',
  '/jpg_to_pdf',
  '/png_to_pdf',
]

async function collectDynamicBlogRoutes(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/get_posts`, { cache: 'no-store' })
    if (!res.ok) {
      console.error(`Failed to fetch dynamic routes from ${baseUrl}/api/get_posts:`, res.statusText)
      return []
    }
    const data = await res.json()
    const posts = Array.isArray(data?.posts) ? data.posts : []
    return posts
      .filter((p) => typeof p?.slug === 'string' && p.slug.length > 0)
      .map((p) => `/view_blog/${p.slug}`)
  } catch (error) {
    console.error('Error fetching dynamic blog routes:', error)
    return []
  }
}

export default async function sitemap() {
  const baseUrl = 'https://www.pdftoolify.com'

  const dynamicBlogRoutes = await collectDynamicBlogRoutes(baseUrl)
  const allRoutes = new Set([...staticRoutes, ...dynamicBlogRoutes])
  const now = new Date()

  return Array.from(allRoutes).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith('/view_blog') ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : route.startsWith('/view_blog') ? 0.9 : 0.8,
  }))
}
