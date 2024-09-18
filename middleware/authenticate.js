/**
 * Authentication Middleware.
 * 
 * @fileoverview This module exports middleware to check user authentication for protecting routes.
 * 
 * @module middleware/authenticate
 */

/**
 * Middleware function to check user authentication.
 * 
 * This function checks whether the `req.session.user` exists. If it does, the request proceeds to the next middleware 
 * or route handler. If not, the user is redirected to the login page.
 * 
 * @function
 * @param {Object} req - Express request object. Contains the session data.
 * @param {Object} res - Express response object. Used to redirect unauthenticated users.
 * @param {Function} next - Function to pass control to the next middleware or route handler if authenticated.
 */
function checkAuthentication(req, res, next) {
  if (req.session.user) {
      next(); 
  } else {
      res.redirect('/34279075/Justin/login');
  }
}

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
function checkAuthenticationAPI(req, res, next) {
  if (req.session.user) {
      next(); 
  } else {
      res.json({
        status: "Not authenticated."
      })
  }
}

module.exports = {checkAuthentication, checkAuthenticationAPI};
