import { connectDB } from '~/server/utils/mongo'
import { User } from '~/server/models/User'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await connectDB()

  const session = await getServerSession(event)
  if (!session || !session.user?.id) {
    return { error: 'Non authentifié' }
  }

  const userId = session.user.id

  const user = await User.findById(userId)
    .select('-password') 
    .lean()

  if (!user) return { error: 'Utilisateur non trouvé' }

  return user
})
