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
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // Find User by email
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      
      return done(error);
    };

    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) return done(err);

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      };

      const payload = {
        sub: user._id
      };

      const token = jwt.sign(
        payload, 
        config.jwtSecret,
        { expiresIn: '1h' }
      );
      const data = {
        data: user
      };

      return done(null, token, data);
    });
  });
});