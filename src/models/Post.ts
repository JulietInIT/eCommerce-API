import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    image: {
      type: String,
      required: [true, 'image is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Post', postSchema);