import { connectDB } from "~/server/utils/mongo";
import { User } from '~/server/models/User';
import { defineEventHandler, getQuery } from "#build/types/nitro-imports";
import { isValidObjectId } from "mongoose";

export default defineEventHandler(async(event) => {
    await connectDB()

    const userId = event.context.params?.id

    if (!isValidObjectId(userId)) {
        return { error: 'ID invalide'}
    }

    const user = await User.findById(userId).select('-password').lean()
    if (!user) return { error: 'Utilisateur non trouvé'}

    return user
})