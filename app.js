var subdomain = require("express-subdomain");
var express = require("express");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var request = require("request");
var keys = require("./config/keys");
var indexRoutes = require("./routes/index");
var authRoutes = require("./routes/auth");
var oauthFacebookRoutes = require("./routes/oauth-facebook");
var postRoutes = require("./routes/post");
var bodyParser = require("body-parser");
var passport = require('passport');
var oauthSetup = require("./config/oauth-setup");
var LocalStrategy = require('passport-local');
var User = require("./models/user");
var Post = require("./models/post");
var app = express();

mongoose.connect(keys.mongodb.dbURI);

app.use(require("express-session")({
  secret: "My dick is the biggest",
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//  Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(postRoutes);
app.use("/oauth", oauthFacebookRoutes);

// Run Server
app.listen(3300, function(){
  console.log("Server is running fast.......")
})
