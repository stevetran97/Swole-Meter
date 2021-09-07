const PassportLocalStrategy = require('passport-local').Strategy;

// Mongoose User Model
const User = require('mongoose').model('User');

/**
 * Custom Signup Passport Local Strategy
 * Return the Passport Local Strategy object
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  // ----------------------------------------------------------------
  // Create and Save new User Mongoose model  
  const newUser = new User(userData);
  newUser.save(err=>{
    // Early Error Done return: General Mongoose save errors
    if (err) return done(err);
    
    return done(null);
  });
  // ----------------------------------------------------------------
});