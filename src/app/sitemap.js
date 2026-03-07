import fs from "fs"
import path from "path"

export const runtime = "nodejs"

function isPageFile(file) {
  return file === "page.js" || file === "page.jsx" || file === "page.tsx"
}

function normalizeRoute(dirParts) {
  const parts = []
  for (const p of dirParts) {
    if (!p) continue
    if (p.startsWith("(") && p.endsWith(")")) continue
    if (p.startsWith("_")) continue
    if (p === "api") return null
    if (p.startsWith("[")) return null
    parts.push(p)
  }
  const route = "/" + parts.join("/")
  return route === "/index" ? "/" : route
}

function collectStaticRoutes() {
  const appDir = path.join(process.cwd(), "src", "app")
  const routes = new Set()
  const stack = [appDir]
  while (stack.length) {
    const current = stack.pop()
    const items = fs.readdirSync(current, { withFileTypes: true })
    const hasPage = items.some((d) => d.isFile() && isPageFile(d.name))
    if (hasPage) {
      const rel = path.relative(appDir, current).replace(/\\/g, "/")
      const dirParts = rel.split("/")
      const route = normalizeRoute(dirParts)
      if (route) routes.add("/" + rel.replace(/\/?$/, "").split("/").filter(Boolean)[0] ? route : "/")
    }
    for (const d of items) {
      if (d.isDirectory()) stack.push(path.join(current, d.name))
    }
  }
  routes.add("/")
  return Array.from(routes).sort()
}

async function collectDynamicBlogRoutes(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/get_posts`, { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    const posts = Array.isArray(data?.posts) ? data.posts : []
    return posts
      .filter((p) => typeof p?.slug === "string" && p.slug.length > 0)
      .map((p) => `/view_blog/${p.slug}`)
  } catch {
    return []
  }
}


export default async function sitemap() {
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  const siteFromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
  const baseUrl = siteFromEnv || siteFromVercel || "http://localhost:3000"
  const staticRoutes = collectStaticRoutes()
  const dynamicBlogRoutes = await collectDynamicBlogRoutes(baseUrl)
  const allRoutes = new Set([...staticRoutes, ...dynamicBlogRoutes])
  const now = new Date()
  return Array.from(allRoutes).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1.0 : 0.8,
  }))
}