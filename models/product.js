var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  type: String,
  descp: String,
  seller: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
