const passport = require('passport');
const {Strategy} = require('passport-facebook');
const crypto = require('crypto');

function setup(User, {facebook}) {
  return passport.use(new Strategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL
  }, (accessToken, refreshToken, profile, done) =>
    User.findOne({
      'facebook.id': profile.id
    })
    .exec()
    .then(user => {
      if (user) {
        return done(null, user);
      }

      user = new User({
        name: profile.displayName,
        email: profile.emails || 'test@' + crypto.randomBytes(32).toString('hex') + '.com',
        role: 'user',
        username: profile.username,
        provider: 'facebook',
        facebook: profile._json
      });

      return user.save()
        .then(user => done(null, user))
        .catch(err => done(err, user));
    })
    .catch(done)));
}

module.exports = {
  setup
};
