import { dbConnect } from '@/db/dbConnect'
import { buttonClickModel } from '@/models/buttonClicksModel'
import { NextResponse } from 'next/server'

const getHostname = (value) => {
  if (!value) return ''

  try {
    const url = value.startsWith('http')
      ? value
      : `http://${value}`

    return new URL(url).hostname.toLowerCase()
  } catch {
    return ''
  }
}

const isLocalhost = (hostname) => {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '0.0.0.0' ||
    hostname.endsWith('.localhost')
  )
}

export async function POST(request) {
  try {
    // Ignore all events in local development
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        message: 'Local development event ignored',
        saved: false,
      })
    }

    // Check where the request originated
    const hostnames = [
      getHostname(request.headers.get('origin')),
      getHostname(request.headers.get('referer')),
      getHostname(request.headers.get('host')),
      getHostname(request.url),
    ]

    const localRequest = hostnames.some(isLocalhost)

    if (localRequest) {
      return NextResponse.json({
        message: 'Localhost event ignored',
        saved: false,
      })
    }

    await dbConnect()

    const body = await request.json()

    if (
      typeof body.eventName !== 'string' ||
      !body.eventName.trim()
    ) {
      return NextResponse.json(
        { message: 'Invalid event name' },
        { status: 400 }
      )
    }

    const event = await buttonClickModel.create({
      eventName: body.eventName.trim(),
    })

    return NextResponse.json(
      {
        message: 'Event added successfully',
        saved: true,
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Event tracking error:', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}