const mongoose = require('mongoose');
//const User = require('./User');
//const Comment = require('./Comment')
const { Schema } = mongoose;
const taskSchema = new Schema({
  name: {
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
  percentDone:{
      type:Number
  },
  criticalPath:{
      type:Boolean,
      default:true
  },
  ownerProject: {
    type:String,
    required:true,
    trim:true
  },
  ownerUser: {
    type:String,
    required:true,
    trim:true
  }
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;