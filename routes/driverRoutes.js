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
const { checkAuthentication, checkAuthenticationAPI } = require('../middleware/authenticate');

// Function to record CRUD operation count
const { incrementCreate, incrementRead, incrementUpdate, incrementDelete } = require('../utils/crudCounter');

// Import function to generate ID for driver
const { generateDriverID } = require('../utils/generateID');

// Import Driver Mongoose model
const Driver = require('../models/driver');

// Import Package Mongoose model
const Package = require('../models/package');

// Import Firebase admin library
const admin = require('firebase-admin');

// Access Firestore database
const db = admin.firestore();

// Import Driver Controller
const drivers = require('../controllers/driverController');

/**
 * GET /add_driver
 * 
 * Renders a form for adding a new driver along with current CRUD operation counters.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/add_driver', checkAuthentication, async (req, res) => {
    res.render('add_driver', {
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * GET /list_drivers
 * 
 * @description Fetches and renders a list of all drivers from the database.
 * @description Read counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/list_drivers', checkAuthentication, async (req, res) => {
    await incrementRead();

    const driversList = await Driver.find();

    res.render('list_drivers', {
        drivers: driversList, 
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * GET /delete_driver
 * 
 * @description Renders a form to delete a driver.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/delete_driver', checkAuthentication, async (req, res) => {
    await incrementRead();

    const driversList = await Driver.find();

    res.render('delete_driver', {
        drivers: driversList, 
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * GET /list_drivers_by_department
 * 
 * @description Renders a list of drivers filtered by department.
 * @description Read counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/list_drivers_by_department', checkAuthentication, async (req, res) => {
    await incrementRead();

    const driversList = await Driver.find();

    res.render('list_drivers_by_department', {
        drivers: driversList, 
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * POST /list_drivers_by_department
 * 
 * @description Filters drivers by the selected department and renders the filtered list.
 * @description Read counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.post('/list_drivers_by_department', checkAuthentication, async (req, res) => {
    await incrementRead();
   
    const department = req.body.department;
    const driversList = await Driver.find({ driver_department: department });

    res.render('list_drivers_by_department', {
        drivers: driversList, 
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * POST /submit_driver_form
 * 
 * @description Submits the form to add a new driver and save the driver to the database.
 * @description Create counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.post('/submit_driver_form', checkAuthentication, async (req, res) => {
    let data = req.body;
    data.driver_id = generateDriverID();

    let driver = new Driver(data);
    await driver.save();

    await incrementCreate();

    res.redirect('list_drivers');
});

/**
 * POST /delete_driver_form
 * 
 * @description Deletes a driver by driver ID.
 * @description If no driver is found, render 'invalid_data' page.
 * @description Delete counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.post('/delete_driver_form', checkAuthentication, async (req, res) => {
    let targetDriver = await Driver.findOne({ driver_id: req.body.driver_id }).populate('assigned_packages').exec();

    if (!targetDriver)  {
        return res.redirect('invalid_data');
    }
    
    if (targetDriver.assigned_packages && targetDriver.assigned_packages.length > 0) {
        const packageIds = targetDriver.assigned_packages.map(pkg => pkg._id);
        await Package.deleteMany({ _id: { $in: packageIds } });
    }

    let result = await Driver.deleteOne({ driver_id: req.body.driver_id });

    if (result.deletedCount === 0) {
        return res.redirect('invalid_data');
    }

    await incrementDelete();

    res.redirect('list_drivers');
});

/**
 * GET /api/v1/drivers
 * 
 * @description API route for getting all drivers.
 */
router.get('/api/v1/drivers', checkAuthenticationAPI, drivers.getAll);

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
router.delete('/api/v1/drivers', checkAuthenticationAPI, drivers.deleteOne);


/**
 * PUT /api/v1/drivers
 * 
 * @description API route for updating a driver.
 */
router.put('/api/v1/drivers', checkAuthenticationAPI, drivers.updateOne);


module.exports = router;
