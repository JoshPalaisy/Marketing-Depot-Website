var mongoose = require("mongoose");

var forumsSchema = new mongoose.Schema({
   title: String,
   parent: String,
   icon: String,
   hero_image: String,
   description: String,
   category: String,
   topics: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Topic"
      }
   ]
});

module.exports = mongoose.model("Forum", forumsSchema);
