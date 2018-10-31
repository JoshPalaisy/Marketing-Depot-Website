var bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");
var request = require('request');
var Software = require("../models/software");
var keys = require("../config/keys");
var stripe = require("stripe")(keys.stripe.skTest);
var flash = require("connect-flash");

module.exports = {
  websiteRegister:  function(req, res, next){
    var newUser = new User({
      username: req.body.username,
      email: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country:  req.body.country
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
          console.log(err);
          var msg = err.message;
          req.flash("error", "Opps! " + msg);
          return res.redirect("/register");
        } else {
          console.log("New website user:  " + req.body);
          next();
        }
    });
  },

  probuilderRegister:  function(req, res, next){
    var newUserData = {
        api_token: keys.proleads.apiKey,
        username: req.body.username,
        email: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        timezone: 'America/Godthab',
        language_id: '1',
        password: req.body.password,
        password_confirmation: req.body.password
    };
    request.post({url: 'https://probuilder.marketingdepot.ca/api-subscribe', formData: newUserData}, function (err, httpResponse, body) {
      if(err){
        console.log(err);
      } else {
        next();
      }
    });
  },

  proleadsRegister: function(req, res, next){
    var newUserData = {
        api_token: keys.proleads.apiKey,
        username: req.body.username,
        email: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        timezone: 'America/Godthab',
        language_id: '1',
        password: req.body.password,
        password_confirmation: req.body.password
    };
    request.post({url: 'https://proleads.marketingdepot.ca/api/v1/customers', formData: newUserData}, function(err, httpResponse, body){
        if(err){
            console.log(err);
        } else {
          var results = JSON.parse(body)
          console.log(body);
          var newUserData = {
              api_token: keys.proleads.apiKey,
              plan_uid: '58e39e1b9e2df',
              customer_uid: results["customer_uid"]
             };
             request.post({url: 'https://proleads.marketingdepot.ca/api/v1/subscriptions', formData: newUserData}, function(err, httpResponse, body){
              if(err){
                console.log(err);
              } else {
                console.log(body);
                next();
              }
           });
        }
    });
  },

  isLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Opps you need to logged in to do that!");
    res.redirect("/login");
  },

  isAdmin: function(req, res, next){
    if(req.user.isAdmin === false){
      req.flash("error", "Opps this is staff only!");
      res.redirect("/login");
    } else {
      return next();
    }
  },

  singlePayment: function(req, res, next){
    Software.find({_id: req.params.id}, function(err, products){
      if(err){
        console.log(err);
      } else {
        Software.findOne({}, function(err, product){
          if(err){
            console.log(err);
          } else {
            const token = req.body.stripeToken;
            var num = product.price;
            var n = num * 100;
            var price = n.toFixed(0);
            var name = product.name;
            const charge = stripe.charges.create({
              amount: price,
              currency: 'usd',
              description: 'Marketing Depot: ' + name,
              source: token,
            }, function(err, paid){
              if(err){
                console.log(err);
              } else {
                next();
              }
            });
          }
        })
      }
    });
  },

  singlePayment: function(req, res, next){
    Software.find({_id: req.params.id}, function(err, products){
      if(err){
        console.log(err);
      } else {
        Software.findOne({}, function(err, product){
          if(err){
            console.log(err);
          } else {
            const token = req.body.stripeToken;
            var num = product.price;
            var n = num * 100;
            var price = n.toFixed(0);
            var name = product.name;
            const charge = stripe.charges.create({
              amount: price,
              currency: 'usd',
              description: 'Marketing Depot: ' + name,
              source: token,
            }, function(err, paid){
              if(err){
                console.log(err);
              } else {
                next();
              }
            });
          }
        })
      }
    });
  },

  subscriptionPayment:  function(req, res, next){
    Software.find({_id: req.params.id}, function(err, products){
      if(err){
        console.log(err);
      } else {
        Software.findOne({}, function(err, product){
          if(err){
            console.log(err);
          } else {
            const token = req.body.stripeToken;
            const userID = req.user.id;
            const customer = stripe.customers.create({
              email: req.user.email,
              source: token,
            }, function(err, res, req){
              if(err){
                console.log(err);
              } else {
                var customerID = res["id"];
                User.findByIdAndUpdate({_id: userID}, {$set:{
                  stripeID: customerID
                }}, {new: true}, function(err, res){
                  if(err){
                    console.log(err);
                  } else {
                    const subscription = stripe.subscriptions.create({
                      customer: customerID,
                      items: [{plan: 'plan_Cnwhs1scOCSB9r'}],
                    }, function(err, res){
                      if(err){
                        console.log(err);
                      } else {
                        console.log("The User: " + userID + " has paid!");
                        next();
                      }
                    });
                  }
                });
              }
            });
          }
        })
      }
    });
  }

}/* end module.exports */
