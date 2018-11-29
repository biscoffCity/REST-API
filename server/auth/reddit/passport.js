const passport = require('passport');
const {Strategy} = require('passport-reddit');

function setup(User, {reddit}) {
  return passport.use(new Strategy({
    clientID: reddit.clientID,
    clientSecret: reddit.clientSecret,
    callbackURL: reddit.callbackURL
  }, (accessToken, refreshToken, profile, done) =>
    User.findOne({
      'reddit.id': profile.id
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
        provider: 'reddit',
        reddit: profile._json
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
