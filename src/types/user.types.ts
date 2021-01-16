// Types
import { IEncrypt } from './crypto.types';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: IEncrypt;
  isAdmin: boolean;
}

export interface ICreateUserInput {
  email: IUser['email'];
  password: string;
  isAdmin: IUser['isAdmin'];
}
