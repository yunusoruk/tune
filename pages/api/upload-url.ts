import { v4 as uuidv4 } from 'uuid'; 
import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const s3 = new S3({
    apiVersion: '2006-03-01',
  })

  const originalFileName = req.query.file as string;
  const fileExtension = originalFileName.split('.').pop();

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: `${uuidv4()}.${fileExtension}`,
      'Content-Type': req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 8388608], // up to 8 MB
    ],
  })


  res.status(200).json(post)
}