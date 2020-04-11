var express = require("express"),
  request = require("request"),
  router = express.Router(),
  Product = require("../models/product"),
  middleware = require("../middleware/index");

router.get("/buy-product", function (req, res) {
  res.render("buyProduct");
});

module.exports = router;
