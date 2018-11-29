const passport = require('passport');
const {OAuth2Strategy} = require('passport-google-oauth');

function setup(User, {google}) {
  return passport.use(new OAuth2Strategy({
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL
  }, (accessToken, refreshToken, profile, done) =>
    User.findOne({
      'google.id': profile.id
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
        username: profile.displayName.split(' ').join('_'),
        provider: 'google',
        google: profile._json
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
