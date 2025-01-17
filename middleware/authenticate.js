/**
 * Authentication Middleware.
 * 
 * @fileoverview This module exports middleware to check user authentication for protecting routes.
 * 
 * @module middleware/authenticate
 */

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_KEY = process.env.JWT_SECRET_KEY;
/**
 * Middleware function to check user authentication through API.
 * 
 * This function checks whether the `req.session.user` exists. If it does, the request proceeds to the next middleware 
 * or route handler. If not, the user is sent a status message.
 * 
 * @function
 * @param {Object} req - Express request object. Contains the session data.
 * @param {Object} res - Express response object. Used to redirect unauthenticated users.
 * @param {Function} next - Function to pass control to the next middleware or route handler if authenticated.
 */
const checkAuthenticationAPI = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      error:"No token provided",
    });
  }
  
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).status({
        error: "Unauthorized. Please login."
      });
    }
    req.username = decoded.username;
    next();
  })
}

module.exports = {checkAuthenticationAPI};
