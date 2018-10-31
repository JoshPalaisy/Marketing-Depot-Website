var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Post = require("../models/post");
var middleware = require("../middleware");
var flash = require("connect-flash");

// INDEX ROUTE
router.get("/news", function(req, res){
   Post.find({}, function(err, posts){
       if(err){
           console.log("ERROR!");
           res.render("pages/404")
       } else {
          res.render("pages/news", {posts: posts});
       }
   });
});

// Post Page
router.get("/news/:url_slug", function(req, res){
  Post.findOne({url_slug: req.params.url_slug}, function(err, foundPost){
    if(err){
      console.log("WTF Happened?", + err);
      res.redirect("/news");
    } else {
      Post.find({}, function(err, posts){
        if(err){
          console.log("ERROR!");
          res.redirect("/news");
        } else {
          res.render("posts/post", {post: foundPost, posts});
          }
        });
      }
   })
});

//  View All Posts Admin
router.get("/admin/posts", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
   Post.find({}, function(err, posts){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("admin/pages/posts-admin", {posts: posts});
       }
   });
});

// New Post
router.get("/admin/posts/new", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    res.render("admin/pages/posts-new");
});

// Create Post
router.post("/admin/posts/publish", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    // create post
    console.log(req.body);
    console.log("===========")
    console.log(req.body);
    Post.create(req.body.post, function(err, newPost){
        if(err){
          req.flash("error", "Opps! Something went wrong, try again!")
          res.render("admin/pages/posts-new");
        } else {
          req.flash("success", "You have added a new post! Click here to view: ")
          res.redirect("/admin/posts");
        }
    });
});

// Edit Post
router.get("/admin/posts/edit/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/news");
        } else {
            res.render("admin/pages/posts-edit", {post: foundPost});
        }
    });
})

// Update Post
router.put("/admin/posts/update/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    req.body.blog = req.sanitize(req.body.post)
   Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
      if(err){
          res.redirect("/admin/posts");
      }  else {
        req.flash("success", "Post Updated.  ");
        res.redirect("/admin/posts/edit/" + req.params.id);
      }
   });
});

// Delete Post
router.delete("/admin/posts/destroy/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
   //destroy post
   Post.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/admin/posts");
       } else {
           res.redirect("/admin/posts");
       }
   })
   //redirect somewhere
});


module.exports = router;
