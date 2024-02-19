const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  author: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

// Post Schema
const postSchema = new mongoose.Schema({
  communityId: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String }],
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

// Community Schema
const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String },
  logo: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['User', 'Admin', 'Guest'], default: 'User' },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female'] },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// Export models
module.exports = {
  Post: mongoose.model('Post', postSchema),
  Comment: mongoose.model('Comment', commentSchema),
  Community: mongoose.model('Community', communitySchema),
  User: mongoose.model('User', userSchema),
};
