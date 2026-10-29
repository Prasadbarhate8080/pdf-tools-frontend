import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { NextResponse } from 'next/server'

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
})

const MAX_SIZE = 50 * 1024 * 1024

const COMPRESSION_LEVELS = ['screen', 'ebook', 'printer', 'prepress', 'default']

const OFFICE_OPERATIONS = {
  'word-to-pdf': ['.doc', '.docx', '.odt', '.rtf'],
  'excel-to-pdf': ['.xls', '.xlsx', '.ods', '.csv'],
  'ppt-to-pdf': ['.ppt', '.pptx', '.odp'],
}

const OFFICE_MIME_TYPES = {
  '.doc': ['application/msword'],
  '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  '.odt': ['application/vnd.oasis.opendocument.text'],
  '.rtf': ['application/rtf', 'text/rtf'],
  '.xls': ['application/vnd.ms-excel'],
  '.xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  '.ods': ['application/vnd.oasis.opendocument.spreadsheet'],
  '.csv': ['text/csv', 'application/csv'],
  '.ppt': ['application/vnd.ms-powerpoint'],
  '.pptx': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  '.odp': ['application/vnd.oasis.opendocument.presentation'],
}

export async function POST(req) {
  try {
    const { operation, size, compressionLevel, officeToPDF, fileName, contentType } =
      await req.json()

    if (typeof size !== 'number' || !Number.isFinite(size) || size <= 0 || size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Invalid file size. Maximum allowed size is 50 MB.' },
        { status: 400 }
      )
    }

    if (typeof operation !== 'string') {
      return NextResponse.json({ error: 'Operation is required.' }, { status: 400 })
    }

    const jobId = randomUUID()

    let key
    let uploadContentType

    if (operation === 'compress-pdf') {
      if (!COMPRESSION_LEVELS.includes(compressionLevel)) {
        return NextResponse.json({ error: 'Invalid compression level.' }, { status: 400 })
      }

      key = `compress-pdf/${jobId}/${compressionLevel}/original.pdf`
      uploadContentType = 'application/pdf'
    } else if (operation === 'pdf-to-word') {
      key = `pdf-to-word/${jobId}/original.pdf`
      uploadContentType = 'application/pdf'
    } else if (operation === 'pdf-to-excel') {
      key = `pdf-to-excel/${jobId}/original.pdf`
      uploadContentType = 'application/pdf'
    } else if (operation === 'pdf-to-ppt') {
      key = `pdf-to-ppt/${jobId}/original.pdf`
      uploadContentType = 'application/pdf'
    } else if (officeToPDF === true) {
      if (
        !Object.hasOwn(OFFICE_OPERATIONS, operation) ||
        typeof fileName !== 'string' ||
        typeof contentType !== 'string'
      ) {
        return NextResponse.json({ error: 'Invalid office conversion request.' }, { status: 400 })
      }

      const extension = path.extname(fileName).toLowerCase()

      if (!OFFICE_OPERATIONS[operation].includes(extension)) {
        return NextResponse.json({ error: 'Unsupported office file extension.' }, { status: 400 })
      }

      if (!OFFICE_MIME_TYPES[extension].includes(contentType)) {
        return NextResponse.json(
          { error: 'Invalid content type for this file extension.' },
          { status: 400 }
        )
      }

      key = `office-uploads/${operation}/${jobId}/original${extension}`
      uploadContentType = contentType
    } else {
      return NextResponse.json({ error: 'Unsupported operation.' }, { status: 400 })
    }

    const uploadUrl = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        ContentType: uploadContentType,
        ContentLength: size,
      }),
      { expiresIn: 300 }
    )

    return NextResponse.json({
      jobId,
      key,
      uploadUrl,
    })
  } catch (error) {
    console.error('Upload URL generation failed:', error)

    return NextResponse.json({ error: 'Failed to generate upload URL.' }, { status: 500 })
  }
}
