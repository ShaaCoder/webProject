const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Comment model based on the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;
