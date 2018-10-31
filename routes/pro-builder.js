var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Software = require("../models/software");

router.get("/", function(req, res){
  res.render("pages/probuilder/pro-builder");
})

router.get("/overview", function(req, res){
  res.render("pages/probuilder/overview-probuilder");
})

router.get("/media", function(req,res){
  res.send("Welcome to the media page.....");
})

router.get("/news", function(req, res){
  res.send("Pro Builder news page here....");
})

router.get("/community", function(req, res){
  res.send("The community section will go here....")
})

module.exports = router;
