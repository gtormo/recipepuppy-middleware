// Modules
import mongoose from 'mongoose';

// Types
import { IUser } from '../types/user.types';

const schema: mongoose.Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: { type: Object, required: true },
    isAdmin: { type: Boolean, required: false, default: false }
  },
  { minimize: true, timestamps: true }
);

export const UserSchema: mongoose.Model<IUser> = mongoose.model<IUser>('users', schema);
