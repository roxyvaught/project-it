const mongoose = require('mongoose');
//const User = require('./User');

const { Schema } = mongoose;

const commentSchema = new Schema({
    comment: {
      type: String,
      required: true,
      trim: true
    },
    createDate: {
      type: Date,
      required: true,
      unique: true
    },
    user: {
      type: String,
      required:true,
      trim:true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;