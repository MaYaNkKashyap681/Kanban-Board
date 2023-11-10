import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  isAdmin: boolean;
  projects: string[]; // Adjust this based on your actual structure
  password: string;
}

const userSchema: Schema<UserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  password: { type: String, required: true },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
