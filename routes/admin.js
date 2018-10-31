var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Software = require("../models/software");
var Post = require("../models/post");
var Forums = require("../models/forums");
var middleware = require("../middleware");
var flash = require("connect-flash");

//  Admin Dashboard
router.get("/", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  res.render("admin/dashboard");
});

//  Find all Users
router.get("/users", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
   User.find({}, function(err, users){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("admin/pages/users-admin", {users: users});
       }
   });
});

// Edit User
router.get("/users/edit/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
          console.log(err);
            res.redirect("/admin/users");
        } else {
            res.render("admin/pages/users-edit", {user: foundUser});
        }
    });
});

// Update Post
router.put("/users/update/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    req.body.user = req.sanitize(req.body.user)
   User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
      if(err){
          res.redirect("/admin/users-admin");
      }  else {
        req.flash("success", "Post Updated.  ");
        res.redirect("/admin/pages/users-edit/" + req.params.id);
      }
   });
});

// Find all Software
router.get("/software", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  Software.find({}, function(err, software){
    if(err){
      console.log(err)
    } else {
      res.render("admin/pages/software-admin", {software: software})
    }
  });
})

// New Software
router.get("/add-software", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  res.render("admin/pages/software-new");
});

// Create Software
router.post("/product/software/new", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  console.log(req.body);
  console.log("===========")
  console.log(req.body);
  Software.create(req.body.software, function(err, newSoftware){
    if(err){
      res.render("new");
    } else {
      res.redirect("/shop");
    }
  });
});

// Edit Software
router.get("/product/software/edit/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  Software.findById(req.params.id, function(err, foundSoftware){
    if(err){
      res.redirect("/shop");
    } else {
      res.render("admin/pages/software-edit", {software: foundSoftware});
    }
  });
});

// Update Software
router.put("/product/software/edit/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    req.body.software.body = req.sanitize(req.body.software.body)
   Software.findByIdAndUpdate(req.params.id, req.body.software, function(err, updatedSoftware){
      if(err){
          console.log(err);
          req.flash("error", "WTF? Something went wrong!");
          res.redirect("/admin/product/software/edit/" + req.params.id);
      }  else {
          req.flash("success", "Product Updated");
          res.redirect("/admin/product/software/edit/" + req.params.id);
      }
   });
});

// Delete Software
router.delete("/product/software/:id/destroy", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  Software.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      req.flash("error", "WTF? Something went wrong!");
      res.redirect("/admin/software");
    } else {
      req.flash("success", "The software item was deleted successfully!");
      res.redirect("/admin/software");
    }
  });
});

// All Forums
router.get("/forums", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
   Forums.find({}, function(err, forums){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("admin/pages/forums-admin", {forums: forums});
       }
   });
});

// New Forum
router.get("/forums/new", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  res.render("admin/pages/forums-new");
});

// Create Forum
router.post("/forums/new", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  console.log("New Forum Group Added");
  console.log("===========")
  console.log(req.body);
  Forums.create(req.body.forums, function(err, newForum){
    if(err){
      res.render("new");
    } else {
      req.flash("success", "New forum group was addedd successfully!");
      res.redirect("/admin/forums");
    }
  });
});

//  Edit Forum
router.get("/forums/edit/:id", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
    Forums.findById(req.params.id, function(err, foundForum){
        if(err){
          console.log(err);
            res.redirect("/admin/forums");
        } else {
            res.render("admin/pages/forums-edit", {forums: foundForum});
        }
    });
});

//  Delete Forum
router.delete("/forums/:id/destroy", [middleware.isLoggedIn, middleware.isAdmin], function(req, res){
  Forums.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      req.flash("error", "WTF? Something went wrong!");
      res.redirect("/admin/forums");
    } else {
      req.flash("success", "The forum group was deleted successfully!");
      res.redirect("/admin/forums");
    }
  });
});


module.exports = router;
