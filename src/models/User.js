// src/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { generateUserId } from '@/utils/generateUserId';

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google users
  image: { type: String }, // URL to the user's image
  role: { type: String, default:"Student" }, // URL to the user's image

});

// Generate a unique 4-digit userId
UserSchema.pre('save',async function (next) {
  if (!this.userId) {
    const id = await generateUserId()
    this.userId = id;
    this.password = id;
  }
  next();
});

// Hash password before saving user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
