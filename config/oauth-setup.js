var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var keys = require("./keys");
var Users = require("../models/user");

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "https://marketingdepot.herokuapp.com/auth/facebook/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
