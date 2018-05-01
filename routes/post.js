var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Post = require("../models/post");

// INDEX ROUTE
router.get("/news", function(req, res){
   Post.find({}, function(err, posts){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("pages/news", {posts: posts});
       }
   });
});

// NEW ROUTE
router.get("/news/new", function(req, res){
    res.render("posts/new");
});

// CREATE ROUTE
router.post("/news", function(req, res){
    // create post
    console.log(req.body);
    console.log("===========")
    console.log(req.body);
    Post.create(req.body.post, function(err, newPost){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/news");
        }
    });
});

// SHOW ROUTE
router.get("/news/:id", function(req, res){
   Post.findById(req.params.id, function(err, foundPost){
       if(err){
           res.redirect("/news");
       } else {
         Post.find({}, function(err, posts){
             if(err){
                 console.log("ERROR!");
             } else {
               res.render("posts/post", {post: foundPost, posts});
             }
         });
       }
   })
});

// EDIT ROUTE
router.get("/news/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/news");
        } else {
            res.render("posts/edit", {post: foundPost});
        }
    });
})


// UPDATE ROUTE
router.put("/news/:id", function(req, res){
    req.body.blog = req.sanitize(req.body.post)
   Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
      if(err){
          res.redirect("/news");
      }  else {
          res.redirect("/news/" + req.params.id);
      }
   });
});

// DELETE ROUTE
router.delete("/news/:id", function(req, res){
   //destroy post
   Post.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/news");
       } else {
           res.redirect("/news");
       }
   })
   //redirect somewhere
});

module.exports = router;
