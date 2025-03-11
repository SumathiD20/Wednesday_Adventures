// /model/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User schema for MongoDB using Mongoose.
 * Represents a registered user in the system.
 *
 * @typedef {Object} UserSchema
 * @property {string} firstname - User's first name (required).
 * @property {string} lastname - User's last name (required).
 * @property {string} email - User's unique email (required).
 * @property {string} password - Hashed password (required).
 * @property {Date} date - Account creation date (default: current date).
 * @property {Array<Object>} tokens - Array of authentication tokens.
 */

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tokens: [{
    token: { type: String, required: true},
  }],
});

/**
 * Middleware: Hash the password before saving the user to the database.
 * 
 * @function
 * @async
 * @param {Function} next - Express middleware next function.
 */

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  try {
      let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
      this.tokens = this.tokens.concat({ token : token });
      await this.save();
      return token;

  } catch (err) {
      throw err;
  }
}; 


const User = mongoose.model('User', userSchema);

module.exports = User;