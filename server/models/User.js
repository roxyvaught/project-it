const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    userName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    }
  });

  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };



const User = mongoose.model('User', userSchema);

module.exports = User;