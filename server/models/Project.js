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
        type:String,
        required:true
    },
    owner: {
      type:String,
      required:true
    },
    tasks:[]
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;