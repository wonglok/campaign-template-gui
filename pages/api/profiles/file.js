// import { Credentials } from 'aws-sdk'
// import S3 from 'aws-sdk/clients/s3'

import { getServerSession } from 'next-auth'
import {
  // DeleteObjectCommand,
  // PutBucketCorsCommand,
  // PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

export default async function API(req, res) {
  let session = await getServerSession(req, res)

  if (!session) {
    return res.status(406).json({
      msg: 'bad auth',
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      msg: 'method not allowed',
    })
  }

  let bodyData = JSON.parse(req.body)
  let payload = bodyData.payload || {}
  let action = bodyData.action || {}

  if (action === 'signFile') {
    //AGAPE_EXPO_2023_ACCESS_KEY
    //AGAPE_EXPO_2023_ACCESS_KEY_SECRET
    //AGAPE_EXPO_2023_REGION
    //AGAPE_EXPO_2023_BUCKET
    //AGAPE_EXPO_2023_ENDPOINT

    const s3Client = new S3Client({
      // // endpoint: process.env.LOK_S3_ENDPOINT,
      // sslEnabled: true,
      // s3ForcePathStyle: false,
      region: process.env.AGAPE_EXPO_2023_REGION,
      credentials: {
        accessKeyId: process.env.AGAPE_EXPO_2023_ACCESS_KEY,
        secretAccessKey: process.env.AGAPE_EXPO_2023_ACCESS_KEY_SECRET,
      },
    })

    let folder = `expo2023/profile/${payload.username}`
    let post = await createPresignedPost(s3Client, {
      Bucket: `${process.env.AGAPE_EXPO_2023_BUCKET}`,
      Key: `${folder}/${payload.fileName}`,
      Fields: {
        acl: 'public-read',
        'Content-Type': `${payload.contentType}`,
      },
      Expires: 600, // seconds
      Conditions: [
        ['content-length-range', 0, payload.size], // up to 1 MB
      ],
    })

    post.baseURL = `${process.env.AGAPE_EXPO_2023_ENDPOINT}`
    post.downloadURL = `/${folder}/${payload.fileName}`

    return res.status(200).json({
      status: 'ok',
      result: post,
    })
  }

  if (action === 'deleteFile') {
    const s3Client = new S3Client({
      region: process.env.AGAPE_EXPO_2023_REGION,
      credentials: {
        accessKeyId: process.env.AGAPE_EXPO_2023_ACCESS_KEY,
        secretAccessKey: process.env.AGAPE_EXPO_2023_ACCESS_KEY_SECRET,
      },
    })

    const params = {
      Bucket: `${payload.fields.bucket}`,
      Key: `${payload.fields.key}`,
    }

    await s3Client.send(new DeleteObjectCommand(params))

    return res.status(200).json({
      ok: 'removed',
    })
  }
}
