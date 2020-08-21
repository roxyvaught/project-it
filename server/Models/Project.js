const mongoose = require('mongoose');
const Task = require('./Task')
const { Schema } = mongoose;


const projectSchema = new Schema({
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
    tasks:[Task]
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;