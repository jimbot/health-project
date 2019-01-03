var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// USER SCHEMA
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    profilePicture: String,
    createdPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
});

// take passport local mongoose package and add methods to our user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
