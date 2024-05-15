import mongoose, { Schema, Document, mongo } from "mongoose";

export interface Message extends Document {
  Content: string;
  CreatedAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  Content: {
    type: String,
    required: true,
  },

  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    unique: true,
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  verifyCode: {
    type: String,
    required: [true, "verifyCode is required"],
  },

  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },

  message: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
