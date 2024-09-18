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
 * GET /add_package
 * 
 * Renders a form for adding a new package along with current CRUD operation counters.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/add_package', checkAuthentication, async (req, res) => {
    await incrementRead();

    const driversList = await Driver.find();
    res.render('add_package', { drivers: driversList, userLoggedIn: !!req.session.user});
});

/**
 * GET /list_packages
 * 
 * @description Fetches and renders a list of all packages from the database.
 * @description Read counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/list_packages', checkAuthentication, async (req, res) => {
    await incrementRead();

    const packagesList = await Package.find();
    
    res.render('list_packages', { 
        packages: packagesList, 
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * GET /delete_package
 * 
 * @description Renders a form to delete a package.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.get('/delete_package', checkAuthentication, async (req, res) => {
    await incrementRead();

    const packagesList = await Package.find();
    res.render('delete_package', { 
        packages: packagesList, 
        userLoggedIn: !!req.session.user, 
    });
});

/**
 * POST /submit_package_form
 * 
 * @description Submits the form to add a new package and save the package to the database.
 * @description Create counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.post('/submit_package_form', checkAuthentication, async (req, res) => {
    let data = req.body;
    data.package_id = generatePackageID();
    
    let newPackage = new Package(data);
    await newPackage.save();

    await Driver.findOneAndUpdate(
        { _id: newPackage.driver_mongoose_id },
        { $push: { assigned_packages: newPackage._id } }
    );

    await incrementCreate();

    res.redirect('list_packages');
});

/**
 * POST /delete_package_form
 * 
 * @description Deletes a package by package ID.
 * @description If no package is found, render 'invalid_data' page.
 * @description Delete counter is increased by 1 for this operation.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @middleware checkAuthentication - Ensures the user is authenticated.
 */
router.post('/delete_package_form', checkAuthentication, async (req, res) => {
    let result = await Package.deleteOne({ package_id: req.body.package_id });
    if (result.deletedCount === 0) {
        return res.redirect('invalid_data');
    }

    await incrementDelete();

    res.redirect('list_packages');
});


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