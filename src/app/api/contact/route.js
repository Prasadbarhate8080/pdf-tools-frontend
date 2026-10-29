import { dbConnect } from '@/db/dbConnect'
import { NextResponse } from 'next/server'
import { contactModel } from '@/models/contactModel'

export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json()

    if (!body.name || !body.email || !body.subject || !body.message)
      return NextResponse.json({ message: 'invalid data' }, { status: 400 })

    let message = await contactModel.create({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    })
    if (message) return NextResponse.json({ message: 'message added succesfully' }, { status: 200 })
  } catch (error) {
    console.log('error while adding message in db', error)
    return NextResponse.json({ message: error.message, status: 500 })
  }
}
