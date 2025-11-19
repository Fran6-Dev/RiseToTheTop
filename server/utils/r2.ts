import { S3Client } from "@aws-sdk/client-s3"

export const r2 = () => {
  const { cfAccountId, r2AccessKeyId, r2SecretAccessKey } = useRuntimeConfig()
  return new S3Client({
    region: "auto",
    endpoint: `https://${cfAccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2AccessKeyId!,
      secretAccessKey: r2SecretAccessKey!
    }
  })
}
