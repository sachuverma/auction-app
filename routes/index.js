var express = require("express"),
  Product = require("../models/product"),
  Bid = require("../models/bid"),
  request = require("request"),
  router = express.Router(),
  middleware = require("../middleware/index");

router.get("/", function (req, res) {
  Product.find({}, function (err, allProducts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { products: allProducts, currentUser: req.user });
    }
  });
});

module.exports = router;
