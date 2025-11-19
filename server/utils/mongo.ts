// server/utils/mongo.ts
import mongoose from 'mongoose'

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
const g = globalThis as unknown as { _mongoose?: Cached }
if (!g._mongoose) g._mongoose = { conn: null, promise: null }

export async function connectDB() {
  const { mongodbURI } = useRuntimeConfig()
  if (!mongodbURI) throw new Error('runtimeConfig.mongodbURI manquant')
  if (g._mongoose!.conn) return g._mongoose!.conn
  if (!g._mongoose!.promise) g._mongoose!.promise = mongoose.connect(mongodbURI)
  g._mongoose!.conn = await g._mongoose!.promise
  return g._mongoose!.conn
}
