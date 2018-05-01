var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

// show register form
router.get("/register", function(req, res){
   res.render("pages/register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
      username: req.body.username,
      email: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        var newUserData = {
            api_token: 'HxUd6BSD5K877ylF7fm60HFR8OE7xVhz61W9HU7cqU9G5eAxDydmP441ioTG',
            username: req.body.username,
	          email: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            timezone: 'America/Godthab',
            language_id: '1',
            password: req.body.password,
            password_confirmation: req.body.password
	    };
        var request = require('request');
	    request.post({url: 'http://127.0.0.1:8888/SBLaravel%20Package%201.1.1/public/api-subscribe', formData: newUserData}, function (err, httpResponse, body) {
	        if(err){
	            console.log(err);
	        }
          request.post({url: 'https://proleads.marketingdepot.ca/api/v1/customers', formData: newUserData}, function (err, httpResponse, body) {
              if(err){
                  console.log(err);
              }
              var results = JSON.parse(body)
              console.log(body);

              //  Subscribe to Pro Leads plan
              var newUserData = {
                  api_token: 'HxUd6BSD5K877ylF7fm60HFR8OE7xVhz61W9HU7cqU9G5eAxDydmP441ioTG',
                  plan_uid: '58e39e1b9e2df',
                  customer_uid: results["customer_uid"]
      	         };
                 request.post({url: 'https://proleads.marketingdepot.ca/api/v1/subscriptions', formData: newUserData}, function (err, httpResponse, body) {
                     if(err){
                         console.log(err);
                     }
                     console.log(body);
                     passport.authenticate("local")(req, res, function() {
                       res.send(results["customer_uid"]);
                       });

               });//-- End of subscribe callback
        });//-- End of callback
    });
  });
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
   req.logout();
   res.redirect("/login");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
