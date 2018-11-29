'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  domain: process.env.DOMAIN,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'yelpup-secret'
  },

  // List of user roles
  userRoles: ['user', 'admin', 'dev'],

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/fda-dev',
    options: {
      useNewUrlParser: true
    }
  },

  email: {
    username: process.env.EMAIL_ADDRESS || 'email',
    password: process.env.EMAIL_PASSWORD || 'password'
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  linkedin: {
    clientID:     process.env.LINKEDIN_ID || 'id',
    clientSecret: process.env.LINKEDIN_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/linkedin/callback'
  },

  reddit: {
    clientID:     process.env.REDDIT_ID || 'id',
    clientSecret: process.env.REDDIT_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/reddit/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'user',
    password: process.env.SENDGRID_PASSWORD || 'pw'
  },

  twilio: {
    accountSID: process.env.TWILIO_SID || 'yehup',
    authToken: process.env.TWILIO_AUTH || 'token',
    msgSid: process.env.TWILIO_MSG_SID || 'msgid'
  },

  aws: {
    access_key: process.env.AWS_ACCESS_KEY || 'yehup_key',
    access_secret: process.env.AWS_ACCESS_SECRET || 'yehup_secret'
  },

  papertrail: {
    host: process.env.PAPERTRAIL_URL || 'url',
    port: process.env.PAPERTRAIL_PORT || 'port'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;
