import {
  Schema,
  model,
  type InferSchemaType,
  type HydratedDocument,
} from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères.'],
      select: false,
    },

    // Informations personnelles
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    birth: { type: Date },
    nationality: { type: String, trim: true },
    height: { type: Number }, // en cm

    // Informations sportives
    role: {
      type: String,
      enum: [
        'Meneur (1)',
        'Arrière (2)',
        'Ailier (3)',
        'Ailier fort (4)',
        'Pivot (5)',
      ],
      trim: true,
    },
    team: { type: String, trim: true },
    level: {
      type: String,
      enum: [
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
        'Autre', //  Ajout du niveau "Autre" pour joueurs évoluant à l’étranger
      ],
      trim: true,
    },
    disponibility: { type: String, trim: true },
    photo: { type: String, trim: true }, // URL photo du joueur
    video: { type: String, trim: true }, // URL de highlights
    description: { type: String, trim: true },

    //  Visibilité et statut
    visible: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // nettoie _id, __v et password.
    toJSON: {
      transform(_doc: any, ret: Record<string, any>) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
        return ret
      },
    },
  }
)

// Indexes utiles
// userSchema.index({ email: 1 })
// userSchema.index({ username: 1 })

// Types TS inférés
export type User = InferSchemaType<typeof userSchema>
export type UserDocument = HydratedDocument<User>

// Export du modèle
export const User = model<User>('User', userSchema)
