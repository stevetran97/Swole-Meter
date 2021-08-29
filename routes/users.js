// Backend Routes for User-related APIs
const express = require("express");
const bcrypt = require('bcryptjs') 

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
  res.redirect("/login");
}

// Routes: APIs for post-log in

// -----------------------------------------------------
// Register new user
// POST @ /api/user/register
router.post("/user/register", (req, res) => {
  console.log("Successfully connected")
  // console.log("req.body=", req)
  const { username, email, password } = req.body
  console.log("req.body.username: ", username)
  console.log("req.body.email: ", email)
  console.log("req.body.password: ", password)

  let errors = []
  // Error Check Phase 1
  if (!username || !email || !password ) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (errors.length > 0) {
    console.log("Error sent")
    res.send({ errors })
    res.redirect("/")
  }
  
  // Check email and username in database, then create user
  User.findOne({ 
    $or: [
      {email: email}
    ]
  })
    .then((user, err) => {
    if (user) {
      console.log("user already found: ", user)
      errors.push({ msg: 'Email already exists'})
      res.redirect("/")
    } else {
      console.log("Creating new user")
      let newUser = new User({
        username: req.body.username,
        email: req.body.email,
      })
      return createUser(newUser, req.body.password, req, res)
    }
  })
})

// Registration Helper: createUser in database
const createUser = (newUser, password, req, res) =>{
  User.register(newUser, password, (err, user) => {
    if (err) {
      console.log("Registration error: ", err)
      req.flash("error", err.message)
      res.redirect("/")
    } else {
      console.log("Successful registration")
      passport.authenticate("local")(req, res, function() {   
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
// router.get("/user/login", (req, res) => {
//   res.render("/user/login")
// })

// Handle authentication
router.post(
  '/user/login',
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true
  }), (req, res) => {  }
)

// Route 2.1 Handle logout
router.get("/user/logout", (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out');
  res.redirect("back")
})


// ---------------------------------
// Route 3: Queries, fetches, etc.
// We don't need to fetch anything for users


module.exports = router