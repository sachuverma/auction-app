var express = require("express"),
  request = require("request"),
  router = express.Router(),
  Product = require("../models/product"),
  middleware = require("../middleware/index");

router.get("/product/new", middleware.isLoggedIn, function (req, res) {
  if (req.user.type == "seller") res.render("sellProduct");
  else {
    req.flash("error", "Are Not a Seller! Redirecting! ");
    res.redirect("/");
  }
});

router.post("/product/new", middleware.isLoggedIn, function (req, res) {
  var newProduct = new Product({
    name: req.body.product_name,
    price: req.body.product_price,
    image: req.body.product_image,
    type: req.body.product_type,
    time: req.body.product_time,
    descp: req.body.product_descp,
    seller: {
      id: req.user._id,
      username: req.user.username,
    },
  });
  Product.create(newProduct, function (err, newlyCreated) {
    if (err) {
      req.flash("error", "Error! Adding Product ");
      console.log(err);
      res.redirect("/sell-product");
    } else {
      req.flash("success", "Success! Added Product ");
      res.redirect("/");
    }
  });
});

router.put("/product/:id", middleware.checkProductOwnership, function (
  req,
  res
) {
  Product.findByIdAndUpdate(req.params.id, req.body.product, function (
    err,
    updatedProduct
  ) {
    if (err) {
      req.flash("error", "Internal Error!");
      res.redirect("/");
    } else {
      req.flash("success", "Updated Product Details");
      res.redirect("/product/" + req.params.id);
    }
  });
});

router.delete(
  "/product/:id/delete",
  middleware.checkProductOwnership,
  function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        console.log(err);
        req.flash("error", "Internal Error!");
        res.redirect("/buy-product/" + req.params.id);
      } else {
        req.flash("success", "Product Removed!");
        res.redirect("/");
      }
    });
  }
);

router.delete("/product/:id/bid/:bid_id/delete", function (req, res) {
  Bid.findByIdAndDelete(req.params.bid_id, function (err) {
    if (err) {
      res.redirect("/");
    } else {
      req.flash("success", "Bid Deleted!");
      res.redirect("/product/" + req.params.id);
    }
  });
});

router.get("/product/:id/edit", function (req, res) {
  Product.findById(req.params.id, function (err, foundProduct) {
    res.render("edit", { product: foundProduct });
  });
});

module.exports = router;
