import { dbConnect } from '@/db/dbConnect'
import { NextResponse } from 'next/server'
import { feedbackModel } from '@/models/feedbackModel'

export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json()

    if (!body.rating)
      return NextResponse.json({ message: 'invalid data' }, { status: 400 })

    let feedback = await feedbackModel.create({
      rating: body.rating,
    })
    if (feedback) return NextResponse.json({ message: 'feedback added succesfully' }, { status: 200 })
  } catch (error) {
    console.log('error while adding rating in db', error)
    return NextResponse.json({ message: error.message, status: 500 })
  }
}
