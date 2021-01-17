// Modules
import mongoose from 'mongoose';

// Types
import { Types } from 'mongoose';
import { IRecipe } from '../types/recipe.type';

const schema: mongoose.Schema = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    userId: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    ingredients: { type: Array, required: true },
    href: { type: String, required: true },
    thumbnail: { type: String, required: false, default: '' }
  },
  { minimize: true, timestamps: true }
);

export const RecipeSchema: mongoose.Model<IRecipe> = mongoose.model<IRecipe>('recipes', schema);
