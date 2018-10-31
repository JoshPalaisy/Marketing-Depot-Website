var express = require("express");
var router = express.Router();
var Post = require("../models/post");


router.get("/", function(req, res){
  Post.find({}, function(err, posts){
      if(err){
          console.log("ERROR!");
      } else {
         res.render("pages/home", {posts: posts});
      }
  });
})

router.get("/shop", function(req, res){
  res.send("Matt Hanson Shop Page!!!");
})

router.get("/shop/en/checkout/pay/", function(req, res){
  res.render("pages/checkout");
})

module.exports = router;
