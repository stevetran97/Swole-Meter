const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');


/**
 * The Auth Checker middleware function.
 * Implementations: Imported at index.js primary backend junction
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end();

  const token = req.signedCookies.swolemeter_token;

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).end();

    const userId = decoded.sub;

    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) return res.status(401).end();

      req.user = user;
      return next();
    });
  });
};