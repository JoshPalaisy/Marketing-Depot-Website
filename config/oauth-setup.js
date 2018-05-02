var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var keys = require("./keys");
var User = require("../models/user");

passport.use(new FacebookStrategy({

     // pull in our app id and secret from our auth.js file
     clientID        : keys.facebook.clientID,
     clientSecret    : keys.facebook.clientSecret,
     callbackURL     : keys.facebook.callbackURI,
     profileURL: 'https://graph.facebook.com/v2.10/me',
     authorizationURL: 'https://www.facebook.com/v2.10/dialog/oauth',
     tokenURL: 'https://graph.facebook.com/v2.10/oauth/access_token',
     profileFields: ['email','first_name','last_name','gender','link']

 },

 // facebook will send back the token and profile
 function(token, refreshToken, profile, done) {
     process.nextTick(function() {
         User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
             if (err)
                 return done(err);
             if (user) {
                 return done(null, user);
             } else {
                 var newUser = new User();
                 newUser.facebook.id    = profile.id; // set the users facebook id
                 newUser.facebook.token = token; // we will save the token that facebook provides to the user
                 newUser.facebook.name  = profile.first_name; // look at the passport user profile to see how names are returned
                 newUser.facebook.email = profile.email; // facebook can return multiple emails so we'll take the first

                 // save our user to the database
                 newUser.save(function(err) {
                     if (err)
                         throw err;

                     // if successful, return the new user
                     return done(null, newUser);
                 });
             }

         });
     });

 }));
