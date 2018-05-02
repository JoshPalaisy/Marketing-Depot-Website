var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var keys = require("./keys");
var User = require("../models/user");

passport.use(new FacebookStrategy({
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: "https://marketingdepot.herokuapp.com/oauth/facebook/redirect"
  },
  function(req, accessToken, refreshToken, profile, done) {
      if (req.user) {
        User.findOne({
          username: req.user.username
        }, function(err, user) {
          if (err) { return done(err); }
          user.facebookId = profile.id;
          user.facebookToken = accessToken;
          user.first_name = profile.first_name;
          user.last_name = profile.last_name;
          user.email = profile.email;
          user.username = profile.username;
          user.save();
          return done(null, user);
        });
      }
      else{
        console.log("attempted facebook auth from non-logged in user");
        return done(null, null);
      }
    }
  ));

module.exports = passport;
