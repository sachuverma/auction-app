var Product = require("../models/product"),
  Bid = require("../models/bid");

var middlewareObject = {};

middlewareObject.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();

  req.flash("error", "You Need to be Logged In!");
  res.redirect("/");
};

middlewareObject.checkProductOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Product.findById(req.params.id, function (err, foundProduct) {
      if (err) {
        req.flash("error", "Product Not Found!");
        res.redirect("/");
      } else {
        if (foundProduct.seller.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You Do Not have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You Need to be Logged In!");
    res.redirect("back");
  }
};

middlewareObject.checkBidOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Bid.findById(req.params.bid_id, function (err, foundBid) {
      if (err) {
        req.flash("error", "Internal Error!");
        res.redirect("back");
      } else {
        if (foundBid.buyer.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You Do Not have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You Need to be Logged In!");
    res.redirect("back");
  }
};

module.exports = middlewareObject;
