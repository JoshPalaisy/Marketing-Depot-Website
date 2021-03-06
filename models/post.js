var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   title: String,
   url_slug: String,
   isFeatured: {
     type: Boolean,
     defualt: false,
   },
   date: {
     type: Date,
     default: Date.now
   },
   image: String,
   author: String,
   description: String,
   category: String,
   content: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Post", postSchema);
