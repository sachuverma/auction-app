var express = require("express"),
  request = require("request"),
  router = express.Router(),
  Product = require("../models/product"),
  middleware = require("../middleware/index");

router.get("/sell-product", middleware.isLoggedIn, function (req, res) {
  if (req.user.type == "seller") res.render("sellProduct");
  else {
    req.flash("error", "Are Not a Seller! Redirecting! ");
    res.redirect("/");
  }
});

router.post("/sell-product", middleware.isLoggedIn, function (req, res) {
  var newProduct = new Product({
    name: req.body.product_name,
    price: req.body.product_price,
    image: req.body.product_image,
    type: req.body.product_type,
    descp: req.body.product_descp,
    seller: {
      id: req.user._id,
      username: req.user.username,
    },
  });
  console.log(req.user);
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

module.exports = router;
