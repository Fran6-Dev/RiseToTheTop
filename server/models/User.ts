import { Schema, model } from "mongoose";

export interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
}

const UserSchema = new Schema({
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
    },
    password:{
        type: String,
        required: true,
        length: [8, "Le mot de passe doit comprendre un minumum de 8 caractères. "],
    },
});

export const User = model<UserDocument>("User",UserSchema)