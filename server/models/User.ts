import mongoose, {
  Schema,
  type InferSchemaType,
  type HydratedDocument,
  type Model,
} from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  accountRole: { type: String, trim: true},
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  birth: { type: Date },
  nationality: { type: String, trim: true },
  height: { type: Number },
  weight: { type: Number },
  hand: { type: String, enum: ['Gaucher (G)','Droitier (D)'], trim: true },
  socialMedia: { type: String, trim: true },
  role: { type: String, enum: ['Meneur (1)','Arrière (2)','Ailier (3)','Ailier fort (4)','Pivot (5)'], trim: true },
  team: { type: String, trim: true },
  level: {
    type: String,
    enum: ['EuroLeague','Pro A / Betclic Élite','Pro B',
           'Ligue féminine (LFB)', 'Ligue féminine (LF2)',
           'Nationale 1 (NM1)','Nationale 2 (NM2)','Nationale 3 (NM3)',
           'Nationale 1 (NF1)','Nationale 2 (NF2)','Nationale 3 (NF3)',
           'Région 1 (RM1)','Région 2 (RM2)','Région 3 (RM3)',
           'Région 1 (RF1)','Région 2 (RF2)',
           'Départemental 1 (DM1)','Départemental 2 (DM2)','Départemental 3 (DM3)',
           'Départemental 1 (DF1)','Départemental 2 (DF2)','Départemental 3 (DF3)',
           'Autre'],
    trim: true,
  },
  disponibility: { type: String, trim: true },
  photo: { type: String, trim: true },
  video: { type: String, trim: true },
  description: { type: String, trim: true },
  visible: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  avatarKey: { type: String, trim: true },
  avatarUrl: { type: String, trim: true },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.password
      return ret
    },
  },
})

export type User = InferSchemaType<typeof UserSchema>
export type UserDocument = HydratedDocument<User>

// 👇 nommé + HMR-safe
export const UserModel: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', UserSchema)

// alias pratique si tu veux garder "User"
export { UserModel as User }

// export par défaut (au choix: le modèle directement)
export default UserModel
