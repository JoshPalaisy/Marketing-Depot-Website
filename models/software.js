var mongoose = require("mongoose");

var softwareSchema = new mongoose.Schema({
   name: String,
   url_slug: String,
   category: String,
   logo: String,
   icon:  String,
   isPaid: {type: String},
   price: Number,
   mainBg:  String,
   checkoutBg: String,
   descriptionTitle: String,
   description: String,
   featureTitle: String,
   feature1img: String,
   feature1title: String,
   feature1description: String,
   feature2img: String,
   feature2title: String,
   feature2description: String,
   feature3img: String,
   feature3title: String,
   feature3description: String,
   platforms: String,
   languages: String,
   regions: String,
   requirements: String
});

module.exports = mongoose.model("Software", softwareSchema);
