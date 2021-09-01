const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

// Mongoose User Model
const User = require('mongoose').model('User');

// App Config
const config = require("../../config");

/** 
 * Custom Login Passport Local Strategy
 * Return the Passport Local Strategy object
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqtoCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // Find User by email
  return User.findOne({ email: userData.email }, (err, user) => {
    // Early Error done return: General Mongoose User.findOne error
    if (err) return done(err);

    // Early Error done return: Incorrect email or password if no user exists
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      
      return done(error);
    };

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      // Early Error done return: General compare password error
      if (err) return done(err);

      // Early Error done return: Incorrect email or password if password does not match
      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      };

      // ----------------------------------------------------------------
      /**  Create and return signed token as per JWT procedure 
        *
        */
      const payload = {
        sub: user._id
      };

      // Create Token string -> signed user._id (assigned to that user) and jwtSecret key from the config file
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.name
      };

      return done(null, token, data);
      // ----------------------------------------------------------------
    });
  });
});


// Use:
  // Defines the login strategy: local-login
// Implementations
  // 1. Imported at index.js in backend
  // 2. local-login passport strategy is invoked in auth.js for /login api call