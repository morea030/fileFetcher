import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor extends Document {
  authorName: string;
  birthDate?: Date;
  userId?: string;
}

const authorSchema = new Schema<IAuthor>({
  authorName: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: false },
  userId: { type: String, required: false },
});

const AuthorModel = mongoose.model<IAuthor>('Author', authorSchema);

export default AuthorModel;