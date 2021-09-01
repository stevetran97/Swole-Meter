// Backend Routes for User-related APIs
const express = require("express");
const validator = require('validator');
const passport = require("passport");
const router = new express.Router();


// --------------------------------------------------------------------------------

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  // Append Error: Invalid email
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  };

  // Append Error: Invalid Password
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Please provide a correct password.';
  };

  // Append Error: Invalid Name
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0
  ) { 
    isFormValid = false;
    errors.name = 'Please provide your name.'
  }; 


  // Set message: Fix errors
  if (!isFormValid) {
    message = 'Check the form for errors.';
  };

  // Success return:
  return {
    success: isFormValid,
    message, 
    errors
  };
};

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  let isFormValid = true;
  let message = '';
  let errors = {};

  // Append Error: Invalid Email
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email.';
  };

  // Append Error: Invalid Password
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  };

  // Set message: Fix errors
  if (!isFormValid) {
    message = 'Check the form for errors.'
  };

  // Success return: Form is valid
  return {
    success: isFormValid,
    message,
    errors
  }
}


// ----------------------------------------------------------------

/**
 * Sign in API
 * /auth/signup
 */

router.post('/signup', (req, res, next) => {
  // API call to local API -> Validate sign up form
  const validationResult = validateSignupForm(req.body);

  // Error return from validation failure
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  };

  // Passport Authentication Section
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      // Error Return from Dupe Email
      if (err.name === 'MongoError' && err.code === 11000 ) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors',
          errors: {
            email: 'This email is already taken.'
          }
        });
      };

      // Error return: General Uncaught errors
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    };

    // Success return
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in'
    });
  })(req, res, next);
});


/**
 * Login API
 * /auth/login
 */
router.post('/login', (req, res, next) => {
  // API call to local API -> Validate login form
  const validationResults = validateLoginForm(req.body);

  // Error return from validation failure 
  if (!validationResults.success) {
    return res.status(400).json({
      success: false,
      message: validationResults.message,
      errors: validationResults.errors
    });
  };

  // Passport Authentication Portion
  passport.authenticate('local-login', (err, token, userData)=>{
    if (err) {
      // Error res return: Incorrect Credentials error return
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        })
      };
      // Error res return: Other 400 server error
      return res.status(400).json({
        success: false,
        message: err.message
      });
    };

    return res.json({ 
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router