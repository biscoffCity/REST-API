const passport = require('passport');
const {Strategy} = require('passport-linkedin-oauth2');
const crypto = require('crypto');
const get = require('lodash/get');

function setup(User, {linkedin}) {
  return passport.use(new Strategy({
    clientID: linkedin.clientID,
    clientSecret: linkedin.clientSecret,
    callbackURL: linkedin.callbackURL,
    scope: ['r_liteprofile', 'r_emailaddress'],
    state: true
  }, (accessToken, refreshToken, profile, done) =>
    User.findOne({
      'linkedin.id': profile.id
    })
    .exec()
    .then(user => {
      if (user) {
        return done(null, user);
      }

      user = new User({
        name: profile.displayName,
        email: get(profile, 'emails[0].value') || 'test@' + crypto.randomBytes(32).toString('hex') + '.com',
        role: 'user',
        username: profile.username + crypto.randomBytes(32).toString('hex') || crypto.randomBytes(32).toString('hex'),
        provider: 'linkedin',
        linkedin: {
          image: {
            url: get(profile, 'photos[0].value')
          }
        }
      });

      return user.save()
        .then(result => done(null, user))
        .catch(err => done(err, user));
    })
    .catch(done)));
}

module.exports = {
  setup
};
