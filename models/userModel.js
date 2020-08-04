const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter your email address!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // remember the validator only works on CREATE and SAVE middleware
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not the same',
    },
  },
  photo: String,
});

// password encrytion middleware
userSchema.pre('save', async function (next) {
  // check if the password was modified/created to avoid multiple hashing
  if (!this.isModified('password')) return next();

  // password hashing with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //   delete the password confirm
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
