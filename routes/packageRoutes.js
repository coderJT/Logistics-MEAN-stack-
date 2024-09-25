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
const { checkAuthentication, checkAuthenticationAPI } = require('../middleware/authenticate'); 

// Function to record CRUD operation count
const { incrementCreate, incrementRead, incrementUpdate, incrementDelete } = require('../utils/crudCounter');

// Import function to generate ID for driver
const { generatePackageID } = require('../utils/generateID');

// Import Package Mongoose model
const Package = require('../models/package');

// Import Driver Mongoose model
const Driver = require('../models/driver');

// Import Firebase admin library
const admin = require('firebase-admin');

// Access Firestore database
const db = admin.firestore();

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
router.delete('/api/v1/packages/:_id', checkAuthenticationAPI, packages.deleteOne);

/**
 * PUT /api/v1/packages
 * 
 * @description API route for updating a package.
 */
router.put('/api/v1/packages', checkAuthenticationAPI, packages.updateOne);


module.exports = router;