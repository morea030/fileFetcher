import mongoose, { Document, Schema } from 'mongoose';
const { v4: uuidv4 } = require('uuid'); // Using uuidv4 from the uuid package

export interface IBook extends Document {
  bookId: string;
  bookName: string;
  authorName: string;
  publicationDate: Date;
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
}

const bookSchema = new Schema<IBook>({
  bookId: { type: String, required: true, unique: true, index: true, auto: true, default: uuidv4 },
  bookName: { type: String, required: true },
  authorName: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
