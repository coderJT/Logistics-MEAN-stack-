/**
 * Driver routing.
 * 
 * @fileoverview This module defines routes for handling CRUD operations related to drivers.
 * Routes include adding, listing, deleting drivers, and filtering by department.
 * 
 * @module routes/driverRoutes
 * 
 * @requires express
 * @requires models/driver - Mongoose model for the Driver collection
 * @requires models/package - Mongoose model for the Package collection
 * @requires utils/generateID - Utility function for generating unique driver IDs
 * @requires utils/crudCounter - Functions to increment CRUD operation counters
 * @requires firebase-admin - Firebase admin SDK for Firestore database
 * @requires middleware/authenticate - Middleware to authenticate users
 * @requires controllers/driverController - To handle API routes usage
 */

// Import express library
const express = require('express');

// Use Express Router
const router = express.Router();

// Use authentication middleware
const { checkAuthenticationAPI } = require('../middleware/authenticate');

// Import Driver Controller
const drivers = require('../controllers/driverController');

/**
 * GET /api/v1/drivers
 * 
 * @description API route for getting all drivers.
 */
router.get('/api/v1/drivers', checkAuthenticationAPI, drivers.getAll);

/**
 * GET /api/v1/drivers/department/:id
 * 
 * @description API route for getting all drivers by department.
 */
router.get('/api/v1/drivers/department/:driver_department', checkAuthenticationAPI, drivers.getDriversByDepartment);

/**
 * POST /api/v1/drivers
 * 
 * @description API route for creating a driver.
 */
router.post('/api/v1/drivers', checkAuthenticationAPI, drivers.createOne);

/**
 * DELETE /api/v1/drivers
 * 
 * @description API route for deleting a driver.
 */
router.delete('/api/v1/drivers/:id', checkAuthenticationAPI, drivers.deleteOne);

/**
 * PUT /api/v1/drivers
 * 
 * @description API route for updating a driver.
 */
router.put('/api/v1/drivers', checkAuthenticationAPI, drivers.updateOne);


module.exports = router;
