import { User } from '~/server/models/User';
import { getServerSession } from '#auth';

export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    const session = await getServerSession(event)
  if (!session || !session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }

    if (!body.firstName || !body.lastName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Champs obligatoires manquants.',
    })
  }

  const updatedUser = await User.findByIdAndUpdate(
    session.user.id,
    {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        birth: body.birth,
        nationality: body.nationality,
        height: body.height,
        role: body.role,
        team: body.team,
        level: body.level,
        acountRole: body.accountRole,
        disponibility: body.disponibility,
        photo: body.photo,
        video: body.video,
        description: body.description,
      },
    },
    { new: true }
  ).lean()

  if (!updatedUser) {
    throw createError({ statusCode: 404, statusMessage: 'Utilisateur introuvable' })
  }

  return {
    message: 'Profil mis à jour avec succès',
    user: updatedUser,
  }

})