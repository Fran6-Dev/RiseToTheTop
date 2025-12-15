import { connectDB } from '~/server/utils/mongo'
import { User } from '~/server/models/User'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await connectDB()
  const session = await getServerSession(event)
  if (!session?.user?.id) { setResponseStatus(event, 401); return { error: 'Non authentifié' } }

  const body = await readBody<{ key: string; url?: string }>(event)
  if (!body?.key) { setResponseStatus(event, 400); return { error: 'key manquante' } }

  const update: any = { video: body.key }
  if (body.url) update.avatarUrl = body.url // utile si bucket public

  await User.findByIdAndUpdate(session.user.id, update, { new: true })
  return { ok: true }
})
