import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true, // Allows multiple null email values
  },
  emailVerified: Date,

  hashedPassword: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const User =
  mongoose.models.User || mongoose.model('User', userSchema);

export default User;
