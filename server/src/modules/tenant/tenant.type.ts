import { Types } from 'mongoose';

export interface ITenant {
  name: string;
  userId: Types.ObjectId;
  created_at?: Date;
  updated_at?: Date;
}
