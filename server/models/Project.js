const mongoose = require('mongoose');
//const Task = require('./Task');
//const User = require('./User')
const { Schema } = mongoose;
const projectSchema = new Schema({
  projname: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true,
    trim: true
  },
  endDate: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true,
      trim: true
    },
    endDate: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type:String,
        required:true
    },
    owner: {
      type:String,
      required:true
    }
  });
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;