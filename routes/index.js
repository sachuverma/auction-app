var express = require("express"),
  Product = require("../models/product"),
  request = require("request"),
  router = express.Router();

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
