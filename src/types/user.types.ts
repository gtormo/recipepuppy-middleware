import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface ICreateUserInput {
  email: IUser['email'];
  password: IUser['password'];
  isAdmin: IUser['isAdmin'];
}
