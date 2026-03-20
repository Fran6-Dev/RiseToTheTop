import { User } from '~/server/models/User';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event)
  if (!session || !session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }

  const user = await User.findByIdAndUpdate(session.user.id, body, { new: true })

  return {
    message: 'Profil mis à jour avec succès',
    user: user,
  }
})