const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
    // Reference comments by their IDs to enable nested comments
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
); // Use Mongoose's built-in timestamps

// Post Schema
const postSchema = new mongoose.Schema(
  {
    community: {
      type: String, // Consider changing this to ObjectId if communities are linked
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Changed to ObjectId to reference the User model
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Ensure these URLs are validated or sanitized
    },
    comments: [commentSchema], // Embedded commentSchema for post comments
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Community Schema
const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure emails are unique and consider adding validation
    },
    password: {
      type: String,
      required: true,
      // Consider using a pre-save hook for hashing passwords before saving
    },
    role: {
      type: String,
      enum: ['user', 'moderator'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Export models
module.exports = {
  Post: mongoose.model('Post', postSchema),
  Comment: mongoose.model('Comment', commentSchema),
  Community: mongoose.model('Community', communitySchema),
  User: mongoose.model('User', userSchema),
};
