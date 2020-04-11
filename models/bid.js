var mongoose = require("mongoose");

var bidSchema = mongoose.Schema({
  amount: Number,
  buyer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Bid", bidSchema);
