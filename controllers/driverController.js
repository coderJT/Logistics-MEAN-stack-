/**
 * Driver Controller
 * 
 * @fileoverview This file contains CRUD operations for managing drivers in the system.
 * It includes controllers for creating, reading, updating, and deleting drivers.
 * Additionally, it handles incrementing CRUD operation counts and generating unique driver IDs.
 * 
 * @module controllers/driverController
 * 
 * @requires models/driver - Mongoose Driver model for database operations
 * @requires models/package - Mongoose Package model for database operations
 * @requires utils/generateID - Utility function to generate unique driver IDs
 * @requires utils/crudCounter - Functions to increment CRUD operation counts
 */

// Import the Driver mongoose model
const Driver = require('../models/driver');

// Import the Package mongoose model
const Package = require('../models/package');

// Function to generate driver ID
const { generateDriverID } = require('../utils/generateID');

// Function to record CRUD operation count
const { incrementCreate, incrementRead, incrementUpdate, incrementDelete } = require('../utils/crudCounter');


module.exports = {

    /**
     * Controller method that retrieves all available drivers.
     * @description This method queries the database for all drivers and then populate them with their assigned packages.
     * @description Read counter will increase by 1 for this operation.
     * 
     * @async
     * @function getAll
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.   
     * @returns {Promise<void>} Returns a JSON response with the list of drivers available or an error message.
     */
    getAll: async function (req, res) {
        try {
            let drivers = await Driver.find().populate('assigned_packages').exec();
            await incrementRead();

            res.json(drivers);

        } catch (err) {
            res.status(500).json({ error: "Failed to get all drivers: " + err.message });
        }
    },

    
    /**
     * Controller method that retrieves a driver by ID.
     * @description This method queries the database for a driver with the given ID and then populate it with its assigned packages.
     * @description Read counter will increase by 1 for this operation.
     * 
     * @async
     * @function getById
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.   
     * @returns {Promise<void>} Returns a JSON response with the driver available or an error message.
     */
    getDriverById: async function (req, res) {
        try {
            let driver = await Driver.findOne({ _id: req.params.id }).populate('assigned_packages').exec();
            await incrementRead();

            if (!driver)
                return res.status(404).json({ error: "Driver not found with ID: " + req.params.id });

            res.json(driver);

        } catch (err) {
            res.status(500).json({ error: "Failed to get driver with ID: " + req.params.id + " - " + err.message });
        }
    },
    

    /**
     * Controller method that retrieves all available drivers by department.
     * 
     * @description This method queries the database for all drivers based on the department given and then populate them with their assigned packages.
     * @description Read counter will increase by 1 for this operation.
     * 
     * @async
     * @function getAll
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    getDriversByDepartment: async function (req, res) {
        try {
            let drivers = await Driver.find({ driver_department: req.params.driver_department }).populate('assigned_packages').exec();
            await incrementRead();

            res.json(drivers);
        } catch (err) {
            res.status(500).json({ error: "Failed to get all drivers by department " + err.message })
        }
    },

    /**
     * Controller method that creates a new driver.
     * @description This method will take request body and create a new driver from it. 
     * @description Driver ID will be generated.
     * @description Create counter will increase by 1 for this operation.
     * 
     * @async
     * @function createOne
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Returns a JSON response with the MongoDB _id generated alongside driver_id generated or an error message.
     */
    createOne: async function (req, res) {
        try {
            let data = req.body;
            data.driver_id = generateDriverID();

            let driver = new Driver({
                driver_id: data.driver_id,
                driver_license: data.driver_license,
                driver_department: data.driver_department,
                driver_is_active: data.driver_is_active,
                driver_name: data.driver_name
            });

            await driver.save();
            await incrementCreate();

            res.json({
                _id: driver._id,
                driver_id: driver.driver_id
            });

        } catch (err) {
            res.status(500).json({ error: "Failed to create a new driver: " + err.message });
        }
    },

    /**
     * Controller method that updates an existing driver.
     * @description This method will take request body and update an existing driver based on the driver mongoose id provided.
     * @description Driver license and driver department values will be updated.
     * @description Update counter will increase by 1 for this operation.
     * 
     * @async
     * @function updateOne
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Returns a JSON response with status and updated item or an error message.
     */
    updateOne: async function (req, res) {
        try {
            let data = req.body;

            let result = await Driver.findOneAndUpdate(
                { _id: req.params.id },
                {
                    driver_license: data.driver_license,
                    driver_department: data.driver_department,
                },
                { new: true, runValidators: true }
            );

            await incrementUpdate();

            res.json({
                status: "Driver updated successfully",
            });

        } catch (err) {
            res.status(500).json({ error: "Failed to update driver: " + err.message });
        }
    },

    /**
     * Controller method that deletes an existing driver.
     * @description This method will take request query and deletes an existing driver based on the driver mongoose id value.
     * @description Delete counter will increase by 1 for this operation.
     * 
     * @async
     * @function deleteOne
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Returns a JSON response with the acknowledged status and delete count or an error message.
     */

    deleteOne: async function (req, res) {
        try {
            const _id = req.params.id; 
            console.log(_id);
            
            let targetDriver = await Driver.findOne({ _id: _id }).populate('assigned_packages').exec();

            if (!targetDriver) {
                return res.status(404).json({ error: "Driver not found" });
            }

            if (targetDriver.assigned_packages && targetDriver.assigned_packages.length > 0) {
                const packageIds = targetDriver.assigned_packages.map(pkg => pkg._id);
                await Package.deleteMany({ _id: { $in: packageIds } });
            }

            let result = await Driver.deleteOne({ _id: _id });
            
            await incrementDelete();

            res.json({
                acknowledged: result.acknowledged,
                deletedCount: result.deletedCount
            });

        } catch (err) {
            res.status(500).json({ error: "Failed to delete a driver: " + err.message });
        }
    }
}

