const mongoose = require('mongoose');
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
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
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
  passwordChangedAt: Date,
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

// decrypt password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if password was changed
userSchema.methods.changePasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  // False means not changed
  return false;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
