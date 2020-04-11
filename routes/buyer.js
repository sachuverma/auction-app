var express = require("express"),
  request = require("request"),
  router = express.Router(),
  Product = require("../models/product"),
  Bid = require("../models/bid"),
  middleware = require("../middleware/index");

router.get("/product/:id", function (req, res) {
  Product.findById(req.params.id)
    .populate("bids")
    .exec(function (err, foundProduct) {
      if (err) console.log(err);
      else res.render("show", { product: foundProduct });
    });
});

router.post("/product/:id/bid", middleware.isLoggedIn, function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      Bid.create(req.body.bid, function (err, bid) {
        if (err) {
          console.log(err);
        } else {
          bid.buyer.id = req.user._id;
          bid.buyer.username = req.user.username;
          bid.save();
          product.bids.push(bid);
          product.save();
          req.flash("success", "Successfully Added a Bid!");
          res.redirect("/product/" + product._id);
        }
      });
    }
  });
});

module.exports = router;
