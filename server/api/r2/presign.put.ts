// server/api/r2/presign.put.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  try {
    const {
      cfAccountId,
      r2AccessKeyId,
      r2SecretAccessKey,
      r2Bucket,
      r2PublicBase,
    } = useRuntimeConfig()

    if (!cfAccountId || !r2AccessKeyId || !r2SecretAccessKey || !r2Bucket) {
      throw new Error('Config R2 manquante (cfAccountId / r2AccessKeyId / r2SecretAccessKey / r2Bucket)')
    }

    const body = await readBody<{
      key?: string
      contentType?: string
      expiresIn?: number
    }>(event)

    const contentType = body?.contentType || 'application/octet-stream'
    const expiresIn = Math.min(Math.max(body?.expiresIn ?? 300, 60), 3600)
    const key =
      body?.key ||
      `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}`

    const client = new S3Client({
      region: 'auto',
      endpoint: `https://${cfAccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
      forcePathStyle: true,
    })

    const cmd = new PutObjectCommand({
      Bucket: r2Bucket,
      Key: key,
      ContentType: contentType,
    })

    const url = await getSignedUrl(client, cmd, { expiresIn })
    const publicUrl = r2PublicBase ? `${r2PublicBase.replace(/\/$/, '')}/${key}` : null

    return { url, key, publicUrl, expiresIn }
  } catch (err: any) {
    console.error('[r2 presign] error:', err)
    setResponseStatus(event, 500)
    return { error: 'R2 presign failed', detail: err?.message ?? String(err) }
  }
})
