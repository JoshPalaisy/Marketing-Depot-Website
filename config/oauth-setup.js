var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var keys = require("./keys");
var Users = require("../models/user");

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "https://marketingdepot.herokuapp.com/oauth/facebook/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if(currentUser){
        //  already has an account
      } else {
        var newUser = new User({
          username: profile.email,
          email:  profile.email,
          first_name: profile.first_name,
          last_name:  profile.last_name,
          facebookId: profile.id
        });
        User.register(newUser, function(err, user){
            if(err){
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("facebook")(req, res, function(){
               res.redirect("/");
            });
        });
      }
    });
  }
));
