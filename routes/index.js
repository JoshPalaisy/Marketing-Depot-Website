var express = require("express");
var router = express.Router();



router.get("/", function(req, res){
  res.render("pages/home");
})

router.get("/shop/en/checkout/pay/", function(req, res){
  res.render("pages/checkout");
})



module.exports = router;
