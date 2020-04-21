var express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  passport = require("passport");

// Auth ROUTES
// handle user sign up
router.post("/register", function (req, res) {
  var newUser = new User({
    fullname: req.body.name,
    username: req.body.username,
    email: req.body.email,
    type: req.body.type,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to Auction-Site! " + user.fullname);
      res.redirect("/");
    });
  });
});

// LOGIN ROUTES
// login logic
router.post(
  "/login",
  // middleware
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

// logout logic
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged You Out!");
  res.redirect("/");
});

//DEFAULT ROUTE HANDLER
router.get("*", function (req, res) {
  req.flash("error", "404 Error! Page Doesn't Exist!");
  res.redirect("/");
});

module.exports = router;
