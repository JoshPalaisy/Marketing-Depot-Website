var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Software = require("../models/software");

//  Product Page
router.get("/product/:url_slug", function(req, res){
  Software.findOne({url_slug: req.params.url_slug}, function(err, foundSoftware){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      Software.find({}, function(err, softwares){
        if(err){
           console.log("ERROR!");
        } else {
          res.render("products/software", {software: foundSoftware, softwares});
          }
        });
      }
   })
});


module.exports = router;
