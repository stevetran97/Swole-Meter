const express = require("express");

const Workout = require("../models/Workout")
const User = require("../models/User")
const Exercise = require("../models/Exercise")

const router = express.Router()

// --------------------------------
// Middleware

// Authenticate user before allowing access to other apis
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash("error", "Please sign in to continue")
  res.redirect("/user/login")
}


// --------------------------------
// APIs -> After user isLoggedIn
// 




module.exports = router