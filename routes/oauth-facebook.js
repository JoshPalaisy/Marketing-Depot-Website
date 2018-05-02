var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//  request facebook login info
router.get("/facebook/login", passport.authenticate("facebook", {
  scope:  ["public_profile", "email"]
}));

//  callback route for facebook to redirect to
router.get("/facebook/redirect", passport.authenticate("facebook"), function(req, res){
  res.send("you reached the callback URI");
})

module.exports = router;
