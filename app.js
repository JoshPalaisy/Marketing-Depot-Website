var subdomain = require("express-subdomain");
var express = require("express");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var request = require("request");
var keys = require("./config/keys");
var flash = require("connect-flash");
var indexRoutes = require("./routes/index");
var authRoutes = require("./routes/auth");
var adminRoutes = require("./routes/admin");
var softwareRoutes = require("./routes/software");
var checkoutRoutes = require("./routes/checkout");
var oauthFacebookRoutes = require("./routes/oauth-facebook");
var proBuilderRoutes = require("./routes/pro-builder")
var postRoutes = require("./routes/post");
var forumRoutes = require("./routes/forums");
var bodyParser = require("body-parser");
var passport = require('passport');
var oauthSetup = require("./config/oauth-setup");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');
var User = require("./models/user");
var Post = require("./models/post");
var Software = require("./models/software");
var stripe = require("stripe")(keys.stripe.skTest);
var app = express();

mongoose.connect(keys.mongodb.dbURI);

app.use(session({
   secret: 'askdjf1414#$@$1klksja1@#!#12fds=',
   cookie: { maxAge: 2628000000 },
   resave:  false,
   saveUninitialized: false,
    store: new MongoStore({
      url: keys.mongodb.dbURI,
      autoRemove: 'native',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


//  Routes
app.use(indexRoutes);
app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(postRoutes);
app.use("/oauth", oauthFacebookRoutes);
app.use("/shop/checkout", checkoutRoutes);
app.use("/shop", softwareRoutes);
app.use("/probuilder", proBuilderRoutes);
app.use("/forums", forumRoutes);

//  Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  // res.status(err.status);
  res.render("pages/404");
});


// Run Server
app.listen(process.env.PORT, process.env.IP, function(){
// app.listen(5000, function(){
  console.log("Server is running fast.......");
})
