const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../environment');
const authTypes = ['facebook', 'google'];

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  role: {
    type: String,
    default: 'user',
    enum: config.userRoles
  },
  username: {
    type: String,
    unique: true
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  linkedin: {},
  google: {}
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

UserSchema
  .path('email')
  .validate(function(value) {
    this.constructor.findOne({
      email: value
    }, (err, user) => {
      if(err) throw err;
      if(user) {
        if(this.id === user.id) return true;
        return false;
      }
      return true;
    });
}, 'The specified email address is already in use.');

const validatePresenceOf = function(value) {
  return value && value.length;
};

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
