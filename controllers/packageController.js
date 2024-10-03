/**
 * Package Controller
 * 
 * @fileoverview This file contains CRUD operations for managing packages in the system.
 * It includes controllers for creating, reading, updating, and deleting packages.
 * Additionally, it handles incrementing CRUD operation counts and generating unique package IDs.
 * 
 * @module controllers/packageController
 * 
 * @requires models/driver - Mongoose Driver model for database operations
 * @requires models/package - Mongoose Package model for database operations
 * @requires utils/generateID - Utility function to generate unique driver IDs
 * @requires utils/crudCounter - Functions to increment CRUD operation counts
 */

// Import the Package mongoose model
const Package = require('../models/package');

// Import the Driver mongoose model
const Driver = require('../models/driver');

// Function to generate driver ID
const { generatePackageID } = require('../utils/generateID');

// Function to record CRUD operation count
const { incrementCreate, incrementRead, incrementUpdate, incrementDelete } = require('../utils/crudCounter');


module.exports = {

    /**
     * Controller method that retrieves all available packages.
     * @description This method queries the database for all packages.
     * @description Read counter will increase by 1 for this operation.
     * 
     * @async
     * @function getAll
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.   
     * @returns {Promise<void>} Returns a JSON response with the list of packages available or an error message.
     */
    getAll: async function (req, res) {
        try {
            let packages = await Package.find();

            await incrementRead();

            res.json(packages);

        } catch (err) {
            res.status(500).json({ error: "Failed to get all packages: " + err.message });
        }
    },

    /**
     * Controller method that retrieves package by ID provided.
     * @description This method queries the database for a package with the given ID.
     * #description Read counter will increase by 1 for this operation.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Returns a JSON response with the requested package or an error message.
     */
    getPackageById: async function (req, res) {
        try {
            let package = await Package.findOne({ _id: req.params.id })
            await incrementRead();

            if (!package)
                return res.status(404).json({ error: "Package not found with ID: " + req.params.id });

            res.json(package);
        } catch (err) {
            res.status(500).json({ error: "Failed to get package with ID: " + req.params.id });
        }
    },

    /**
    * Controller method that creates a new package.
    * @description This method will take request body and create a new package from it.
    * @description Package ID will be generated.
    * @description Create counter will increase by 1 for this operation.
    * 
    * @async
    * @function getAll
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.   
    * @returns {Promise<void>} Returns a JSON response with the list of packages available or an error message.
    */
    createOne: async function (req, res) {
        try {
            let data = req.body;
            data.package_id = generatePackageID();

            let newPackage = new Package(data);

            await newPackage.save();

            await Driver.findOneAndUpdate(
                { _id: newPackage.driver_mongoose_id },
                { $push: { assigned_packages: newPackage._id } }
            );

            await incrementCreate();

            res.json({
                _id: newPackage._id,
                package_id: newPackage.package_id,
            });

        } catch (err) {
            res.status(500).json({ error: "Failed to create a new package: " + err.message });
        }
    },

    /**
     * Controller method that updates an existing package.
     * @description This method will take request body and update an existing package based on package mongoose id value provided.
     * @description Package destination will be updated.
     * @description Update counter will increase by 1 for this operation.
     * 
     * @async
     * @function updateOne
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @return {Promise<void>} Returns a JSON response with status or an error message.
     */
    updateOne: async function (req, res) {
        try {

            let data = req.body;

            let result = await Package.findOneAndUpdate(
                { _id: req.params.id },
                {
                    package_destination: data.package_destination,
                },
                { new: true, runValidators: true }
            );

            await incrementUpdate();

            res.json({
                status: "Package destination updated successfully"
            });

        } catch (err) {
            res.status(500).json({ status: "Failed to update package: " + err.message })
        }
    },

    /**
     * Controller method that deletes an existing package.
     * @description This method will take request parameter and deletes an existing package based on the mongoose _id value.
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

            let result = await Package.deleteOne({ _id: _id });

            if (!result) {
                return res.status(404).json({ error: "Package not found" });
            }

            await incrementDelete();

            res.json({
                acknowledged: result.acknowledged,
                deletedCount: result.deletedCount
            });

        } catch (err) {
            res.status(500).json({ error: "Failed to delete a package:: " + err.message });
        }
    }
}

