/**
 * Package routing.
 * 
 * @fileoverview This module defines routes for handling CRUD operations related to packages.
 * Routes include adding, listing, deleting packages.
 * 
 * @module routes/packageRoutes
 * 
 * @requires express
 * @requires models/package - Mongoose model for the Package collection
 * @requires models/driver - Mongoose model for the Driver collection
 * @requires utils/generateID - Utility function for generating unique driver IDs
 * @requires utils/crudCounter - Functions to increment CRUD operation counters
 * @requires firebase-admin - Firebase admin SDK for Firestore database
 * @requires middleware/authenticate - Middleware to authenticate users
 * @requires controllers/packageController - To handle API routes usage
 * @requires middleware/authenticate - Middleware to authenticate users
 */

// Import express library
const express = require('express');

// Use Express Router
const router = express.Router();

// Use authentication middleware
const { checkAuthenticationAPI } = require('../middleware/authenticate'); 

// Import Firebase admin library
const admin = require('firebase-admin');

// Import Package Controller
const packages = require('../controllers/packageController');

/**
 * GET /api/v1/packages
 * 
 * @description API route for getting all packages.
 */
router.get('/api/v1/packages', checkAuthenticationAPI, packages.getAll);

/**
 * POST /api/v1/packages
 * 
 * @description API route for creating a package.
 */
router.post('/api/v1/packages', checkAuthenticationAPI, packages.createOne);

/**
 * DELETE /api/v1/packages/:_id
 * 
 * @description API route for deleting a package.
 */
router.delete('/api/v1/packages/:id', checkAuthenticationAPI, packages.deleteOne);

/**
 * PUT /api/v1/packages
 * 
 * @description API route for updating a package.
 */
router.put('/api/v1/packages', checkAuthenticationAPI, packages.updateOne);


module.exports = router;