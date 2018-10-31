var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var flash = require("connect-flash");

// show register form
router.get("/register", function(req, res){
   res.render("pages/register");
});

//handle sign up logic
router.post("/register", [middleware.websiteRegister, middleware.probuilderRegister, middleware.proleadsRegister],
  passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login"
    }), function(req, res){
});

//show login form
router.get("/login", function(req, res){
   res.render("pages/login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
  req.flash("success", "You have been logged out successfully!")
   req.logout();
   res.redirect("/login");
});

module.exports = router;
