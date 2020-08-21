const mongoose = require('mongoose');
const User = require('./User');
const Comment = require('./Comment')
const { Schema } = mongoose;


const taskSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      unique: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type:Enumerator,
        required:true
    },
    user:[User],
    comment:[Comment]
  });

const Task = mongoose.model('Task', taskSchema);

module.exports = Project;