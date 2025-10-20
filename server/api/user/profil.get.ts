import { getServerSession } from '#auth'
import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session || !session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }

  const user = await User.findById(session.user.id).lean()

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Utilisateur introuvable' })
  }

  return user
})
