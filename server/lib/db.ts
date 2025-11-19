import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("⚠️ La variable MONGODB_URI n'est pas définie dans ton fichier .env");
}

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

// On crée un cache global pour éviter plusieurs connexions (utile avec Vite/Nuxt en dev)
const g = globalThis as unknown as { _mongoose?: Cached };
if (!g._mongoose) g._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (g._mongoose!.conn) return g._mongoose!.conn;

  if (!g._mongoose!.promise) {
    g._mongoose!.promise = mongoose.connect(MONGODB_URI);
  }

  g._mongoose!.conn = await g._mongoose!.promise;
  return g._mongoose!.conn;
}
