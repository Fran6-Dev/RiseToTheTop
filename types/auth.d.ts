// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username?: string | null
      role?: string | null
      level?: string | null
      visible?: boolean
    } & DefaultSession['user']
  }

  // Optionnel, si tu utilises `user` dans callbacks.jwt(...)
  interface User {
    id: string
    username?: string | null
    role?: string | null
    level?: string | null
    visible?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub?: string // standard OIDC pour l'id
    username?: string | null
    role?: string | null
    level?: string | null
    visible?: boolean
    email?: string | null
  }
}
