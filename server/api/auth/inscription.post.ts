import { User } from '~/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler( async (event) => {
  const { email, username, password } = await readBody(event)

  if (!email || !username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'email, username, password requis' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({
      email: String(email).trim().toLowerCase(),
      username: String(username).trim(),
      password: hashed,
      // on fige les flags pour éviter tout override client
      visible: true,
      isDeleted: false,
    })

    const obj = user.toObject()
    delete obj.password
    return obj
  } catch (err: any) {
    if (err?.code === 11000) {
      const field = Object.keys(err.keyPattern ?? {})[0] ?? 'champ'
      throw createError({ statusCode: 409, statusMessage: 'Conflict', message: `${field} déjà utilisé` })
    }
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: 'Création de compte impossible' })
  }
})
