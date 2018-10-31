var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Software = require("../models/software");
var middleware = require("../middleware");
var keys = require("../config/keys");
var stripe = require("stripe")(keys.stripe.skTest);
var request = require("request");

// Checkout Page
router.get("/pay/:id", middleware.isLoggedIn, function(req, res){
  Software.findById(req.params.id, function(err, foundSoftware){
    if(err){
      res.redirect("/shop");
    } else {
      Software.find({}, function(err, softwares){
        if(err){
           console.log("ERROR!");
        } else {
          res.render("pages/checkout", {software: foundSoftware, softwares});
          }
        });
      }
   })
});

// Process Payment
router.post("/payment/:id", [middleware.isLoggedIn, middleware.subscriptionPayment], function(req, res){
  res.send("you have made a payment!");
});

router.get("/dick", function(req, res){
  request.get("https://www.mattcoatesmusic.com/wp-json/wp/v2/pages/4249");
})

module.exports = router;
