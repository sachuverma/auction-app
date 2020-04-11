var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  fullname: String,
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: String,
  password: String,
  type: String,
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
