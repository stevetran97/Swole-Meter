const jwt = require('jsonwebtoken');
// Mongoose User Model
const User = require('mongoose').model('User');
// App Config
const config = require('../../config');


/**
 * The Auth Checker middleware function.
 * Implementations: Imported at index.js primary backend junction
 */
module.exports = (req, res, next) => {
  // Early Error res return: if header does not have authorization -> 401
  if (!res.headers.authorization) return res.status(401).end();

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // Early Error res return: if header does not have authorization -> 401
    if (err) return res.status(401).end();

    // Check if user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user ) return res.status(401).end();
      
      // Pass user details onto next route in request
      req.user = user;
      return next();
    });
  });
};