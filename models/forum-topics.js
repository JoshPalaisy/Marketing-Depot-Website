var mongoose = require("mongoose");

var topicSchema = mongoose.Schema({
    text: String,
    featured: [
      {
        type: Boolean,
        default: false
      }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        first_name: String,
        username: String
    },
    comments: [
       {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comments"
       }
    ]
});

module.exports = mongoose.model("Topic", topicSchema);
