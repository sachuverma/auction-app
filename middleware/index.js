var middlewareObject = {};

middlewareObject.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();

  req.flash("error", "You Need to be Logged In!");
  res.redirect("/login");
};

module.exports = middlewareObject;
