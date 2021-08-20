// Backend Routes for User-related APIs

const express = require("express");

const User = require("../models/User")
const passport = require("passport")

const router = express.Router()

// ----------------------------------------------------------------
// Middleware
// Helper: Authenticate user in request
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/user/login");
}

// Routes: APIs for post-log in

// -----------------------------------------------------
// Register new user

router.post("/user/register", (req, res) => {
  if (
    req.body.username && 
    req.body.firstname && 
    req.body.lastname && 
    req.body.password
  ) {
    let newUser = new User({
      username: req.body.username,
      firstName: req.body.firstname,
      lastName: req.body.lastname
    })

    return createUser(newUser, req.body.password, req, res)
  }
})

// Registration Helper: createUser in database
const createUser = () =>{
  User.register(newUser, password, (err, user) => {
    if (err) {
      req.flash("error", err.message)
      res.redirect("/")
    } else {
      passport.authenticate("local")(req, res, function() {
        console.log(req.user)
        req.flash(
          "success", "Success! You have successfully registered"
        )
        res.redirect("/")
      })
    }
  })
}

// --------------------------------
// Route 2. Handle Login
// Render login page
router.get("/user/login", (req, res) => {
  res.render("users/login")
})

// Handle authentication
router.post(
  'user/login',
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "user/login"
  }), (req, res) => {  }
)

// Route 2.1 Handle logout
router.get("/user/logout", (req, res) => {
  req.logout()
  res.redirect("back")
})


// ---------------------------------
// Route 3: Queries, fetches, etc.
// We don't need to fetch anything for users


module.exports = router