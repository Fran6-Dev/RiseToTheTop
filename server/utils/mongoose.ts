import mongoose from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  } | undefined
}

global._mongoose = global._mongoose || { conn: null, promise: null }

export async function connectMongoose() {
  if (global._mongoose!.conn) return global._mongoose!.conn

  if (!global._mongoose!.promise) {
    const uri = process.env.MONGODB_URI

    if (!uri || !(uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))) {
      throw new Error("Invalid or missing MongoDB URI (mongodbURI / MONGODB_URI)")
    }

    // Important: évite le buffering infini, fail fast si réseau/whitelist KO
    mongoose.set("bufferCommands", false)

    global._mongoose!.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000, // tu peux mettre 5000 pour debug
      })
      .then((m) => {
        global._mongoose!.conn = m
        return m
      })
      .catch((err) => {
        global._mongoose!.promise = null
        throw err
      })
  }

  return global._mongoose!.promise
}