// zod pour valider les payloads
import { z } from 'zod'

export const roleEnum = [
  'Meneur (1)',
  'Arrière (2)',
  'Ailier (3)',
  'Ailier fort (4)',
  'Pivot (5)',
] as const

export const levelEnum = [
  'NBA',
  'EuroLeague',
  'Pro A / Betclic Élite',
  'Pro B',
  'Nationale 1 (NM1)',
  'Nationale 2 (NM2)',
  'Nationale 3 (NM3)',
  'Région 1 (RM1 / RF1)',
  'Région 2 (RM2 / RF2)',
  'Région 3 (RM3 / RF3)',
  'Départemental 1 (DM1 / DF1)',
  'Départemental 2 (DM2 / DF2)',
  'Départemental 3 (DM3 / DF3)',
  'Loisir',
  'Autre',
] as const

// Champs requis pour l’inscription (création de compte)
export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32),
  password: z.string().min(8),
})

// Champs “carte joueur” (payload de player.post.ts)
export const playerSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birth: z.coerce.date().optional(),
  nationality: z.string().optional(),
  height: z.number().int().positive().max(300).optional(),
  role: z.enum(roleEnum).optional(),
  team: z.string().optional(),
  level: z.enum(levelEnum).optional(),
  disponibility: z.string().optional(),
  photo: z.string().url().optional(),
  video: z.string().url().optional(),
  description: z.string().max(2000).optional(),
})
