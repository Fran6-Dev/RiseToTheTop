// server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '~/server/models/User'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const credentialsSchema = z.object({
  username: z.string().min(1),
  // si tu veux autoriser l'email aussi, ajoute un champ email OR et adapte la requête
  password: z.string().min(1),
})

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error - nuxt-auth shim
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},

      async authorize(raw: any) {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) {
          throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
        }
        const { username, password } = parsed.data

        // ⚠️ password est select:false dans le schéma → il faut le sélectionner explicitement
        const user = await User.findOne({ username: username.trim() })
          .select('+password') // récupère le hash
          .lean()              // renvoie un objet JS simple (pas un document Mongoose)
        
        if (!user || !user.password) {
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const ok = await bcrypt.compare(password, user.password as string)
        if (!ok) {
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        // ✅ Retourne un objet minimal et safe (pas tout le doc)
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          role: user.role ?? null,
          level: user.level ?? null,
          visible: user.visible ?? true,
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      // Au login, "user" vient d'authorize. Ensuite, seul "token" est dispo.
      if (user) {
        token.sub = (user as any).id // standard OIDC
        token.username = (user as any).username
        token.email = (user as any).email
        token.role = (user as any).role
        token.level = (user as any).level
        token.visible = (user as any).visible
      }
      return token
    },

    async session({ session, token }) {
      // Hydrate la session côté client, sans y mettre de données sensibles
      session.user = {
        id: (token.sub as string) ?? '',
        email: (token.email as string) ?? session.user?.email ?? '',
        name: session.user?.name ?? token.username, // champs NextAuth
        username: (token.username as string) ?? null,
        role: (token.role as string) ?? null,
        level: (token.level as string) ?? null,
        visible: (token.visible as boolean) ?? true,
      } as any

      return session
    },
  },
})
