// Types
import { Types } from 'mongoose';

export interface IToken {
  expireHours: string;
  payload: Record<string, any>;
}

export interface ITokenPayload {
  _id: Types.ObjectId;
  email: string;
  isAdmin: boolean;
}

export interface IDecodedTokenPayload {
  _id: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
