import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({ region: process.env.AWS_REGION });
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req, { params }) {
  const { jobId } = await params;
  if (!UUID.test(jobId)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const list = await s3.send(new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET,
    Prefix: `results/${jobId}/`,
    MaxKeys: 1,
  }));

  const Key = list.Contents?.[0]?.Key;
  if (!Key) return NextResponse.json({ status: "PROCESSING" });

  const downloadUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key,
      ResponseContentDisposition: `attachment; filename="${Key.split("/").pop()}"`,
    }),
    { expiresIn: 300 }
  );

  return NextResponse.json({ status: "DONE", downloadUrl });
}