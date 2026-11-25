import { dbConnect } from '@/db/dbConnect'
import { blogModel } from '@/models/blogModel'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    await dbConnect()

    const { searchParams } = request.nextUrl

    // ?limit=3  (default 3, min 1, max 12)
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit'), 10) || 3, 1), 12)

    // ?exclude=current-post-slug  (so the current post is not suggested)
    const exclude = searchParams.get('exclude')

    const match = exclude ? { slug: { $ne: exclude } } : {}

    const posts = await blogModel.aggregate([
      { $match: match },
      { $sample: { size: limit } },
      { $project: { content: 0, tableOfContent: 0, faqs: 0 } },
    ])

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}