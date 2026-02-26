// server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "~/server/models/User"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { connectMongoose } from "~/server/utils/mongoose"

const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export default NuxtAuthHandler(async () => {
  // ✅ s'assure que la DB est prête (cached singleton)
  await connectMongoose()

  return {
    secret: useRuntimeConfig().authSecret,
    pages: {
      signIn: "/login",
    },
    providers: [
      // @ts-expect-error - nuxt-auth shim
      CredentialsProvider.default({
        name: "credentials",
        credentials: {},

        async authorize(raw: any) {
          // ✅ ultra safe : au cas où la function est "cold"
          await connectMongoose()

          const parsed = credentialsSchema.safeParse(raw)
          if (!parsed.success) return null

          const { username, password } = parsed.data

          const user = await User.findOne({ username: username.trim() })
            .select("+password")
            .lean()

          if (!user?.password) return null

          const ok = await bcrypt.compare(password, user.password as string)
          if (!ok) return null

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role ?? null,
            level: user.level ?? null,
            accountRole: user.accountRole ?? "user",
            visible: user.visible ?? true,
          }
        },
      }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.sub = (user as any).id
          token.username = (user as any).username
          token.email = (user as any).email
          token.role = (user as any).role
          token.level = (user as any).level
          token.accountRole = (user as any).accountRole
          token.visible = (user as any).visible
        }
        return token
      },

      async session({ session, token }) {
        session.user = {
          id: (token.sub as string) ?? "",
          email: (token.email as string) ?? session.user?.email ?? "",
          name: (token as any).username ?? session.user?.name ?? "",
          username: (token as any).username ?? null,
          role: (token as any).role ?? null,
          level: (token as any).level ?? null,
          accountRole: (token as any).accountRole ?? null,
          visible: (token as any).visible ?? true,
        } as any

        return session
      },
    },
  }
})