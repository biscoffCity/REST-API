const passport = require('passport');
const {Strategy} = require('passport-linkedin-oauth2');

function setup(User, {linkedin}) {
  return passport.use(new Strategy({
    clientID: linkedin.clientID,
    clientSecret: linkedin.clientSecret,
    callbackURL: linkedin.callbackURL,
    scope: [
      'r_emailaddress',
      'r_basicprofile'
    ],
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
        email: profile.emails[0].value,
        role: 'user',
        username: profile.username,
        provider: 'linkedin',
        linkedin: profile._json
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
