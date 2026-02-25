import { getServerSession } from '#auth'
import { User } from '~/server/models/User' 

export default defineEventHandler(async(event) => {
    const session = await getServerSession(event)
  if (!session || !session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }

  const users = await User.find().select('-password').lean()

  return users

}) 