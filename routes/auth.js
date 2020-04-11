var express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  passport = require("passport");

// Auth ROUTES
// show sign up form
router.get("/register", function (req, res) {
  res.render("register");
});

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
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to Auction-Site! " + user.fullname);
      res.redirect("/");
    });
  });
});

// LOGIN ROUTES
// render login form
router.get("/login", function (req, res) {
  res.render("login");
});

// login logic
// middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// logout logic
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged You Out!");
  res.redirect("/");
});

module.exports = router;
