var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var keys = require("./keys");
var User = require("../models/user");

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "https://marketingdepot.herokuapp.com/oauth/facebook/redirect"
  },function(accessToken, refreshToken, profile, done){
    new User({
      username: profile.email,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      facebookId: profile.id
    }).save().then((newUser, function(req, res){
      console.log("New user created:" + newUser);
      passport.authenticate("facebook")(req, res, function() {
        res.redirect("/");
        });
    }));
  }));
