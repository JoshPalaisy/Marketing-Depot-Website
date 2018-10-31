var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Forums = require("../models/forums");
var Topic = require("../models/forum-topics");
var middleware = require("../middleware");
var flash = require("connect-flash");

//  Pro Builder - View All Forums
router.get("/probuilder", function(req, res){
   Forums.find({}, function(err, forums){
       if(err){
           console.log(err);
       } else {
          res.render("forums/forum-archive", {forums: forums, parent:"probuilder"});
       }
   });
});

//  Pro Builder - View All Topics
router.get("/probuilder/:id", function(req, res){
  Forums.findById(req.params.id).populate("topics").exec(function(err, foundForum){
    if(err){
      console.log(err);
    } else {
      console.log(foundForum);
      res.render("forums/all-topics", {forum: foundForum});
    }
  });
});

router.post("/probuilder/:id/topics",middleware.isLoggedIn,function(req, res){
   //lookup forum using ID
   Forums.findById(req.params.id, function(err, forum){
       if(err){
           console.log(err);
           res.redirect("/forums/probuilder");
       } else {
        Topic.create(req.body.topic, function(err, topic){
           if(err){
               console.log(err);
           } else {
               //add username and id to topic
               topic.author.id = req.user._id;
               topic.author.first_name = req.user.first_name;
               topic.author.username = req.user.username;
               //save topic
               topic.save();
               forum.topic.push(topic);
               forum.save();
               console.log(topic);
               req.flash('success', 'Created a Topic!');
               res.redirect('/probuilder/' + forum._id);
           }
        });
       }
   });
});

// // Pro Builder - Create New Topic
// router.post("/probuilder/:id/topics", middleware.isLoggedIn, function(req, res){
//   console.log("===========")
//   console.log(req.body);
//   Topic.create(req.body.topic, function(err, newTopic){
//     if(err){
//       console.log(err);
//     } else {
//       res.redirect("/forums/probuilder/");
//     }
//   });
// });

//  Pro Builder - View Single Topic
router.get("/probuilder/topic/:id", function(req, res){
  Topic.findById(req.params.id).populate("Comments").exec(function(err, foundTopic){
    if(err){
      console.log(err);
    } else {
      res.render("forums/single-topic", {topic: foundTopic});
    }
  });
});

//  Pro Leads
router.get("/proleads", function(req, res){
  Forums.find({}, function(err, forums){
    if(err){
      console.log(err);
      res.render("pages/404");
    } else {
      res.render("forums/forum-archive", {forums: forums, parent: "proleads"});
    }
  });
})

//  WatchTower
router.get("/watchtower", function(req, res){
  Forums.find({}, function(err, forums){
    if(err){
      console.log(err);
      res.render("pages/404");
    } else {
      res.render("forums/forum-archive", {forums: forums, parent: "watchtower"});
    }
  });
})

//  MD Phones
router.get("/mdphones", function(req, res){
  Forums.find({}, function(err, forums){
    if(err){
      console.log(err);
      res.render("pages/404");
    } else {
      res.render("forums/forum-archive", {forums: forums, parent: "mdphones"});
    }
  });
})

module.exports = router;
