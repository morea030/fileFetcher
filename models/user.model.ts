import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'Admin' | 'Author';
  authorId?: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Author'], required: true },
  authorId: { type: String, required: false },

});

export const UserModel = mongoose.model<IUser>('User', userSchema);
