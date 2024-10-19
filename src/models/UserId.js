// src/models/UserId.js
import mongoose from 'mongoose';

const userIdSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
    default: 1000
  },
});

const UserId = mongoose.models.UserId || mongoose.model('UserId', userIdSchema);

export default UserId;
