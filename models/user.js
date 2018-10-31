var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    country:  String,
    isAdmin:  {
      type: Boolean,
      default: false
    },
    facebookId: String,
    facebookToken: String,
    stripeID: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
