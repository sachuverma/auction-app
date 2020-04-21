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
  product: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
});

module.exports = mongoose.model("Bid", bidSchema);
