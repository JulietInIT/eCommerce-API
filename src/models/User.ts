import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Firstname is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model('User', userSchema);