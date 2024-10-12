/**
 * Driver Mongoose Model.
 * 
 * @fileoverview This module defines the schema for the Driver model using Mongoose.
 * 
 * @module models/driver
 * 
 * @requires mongoose - Mongoose ODM to define the schema and model
 */

// Import the mongoose library
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    /**
     * Unique identifier for the driver.
     * 
     * @type {String}
     * @required {String} Driver ID is required.
     */
    driver_id: {
        type: String, 
        required: [true, 'Driver ID is required'],
    },

    /**
     * Name of the driver.
     * 
     * @type {String}
     * @required {String} Driver name is required.
     * @minlength {Number} Minimum length is 3 characters.
     * @maxlength {Number} Maximum length is 20 characters.
     */
    driver_name: {
        type: String,
        match: /^[a-zA-Z]+$/,
        required: [true, 'Driver name is required'],
        maxlength: [20, 'Driver name cannot exceed 20 characters'],
        minlength: [3, 'Driver name must be at least 3 characters long']
    },

    /**
     * Department of the driver.
     * 
     * @type {String}
     * @enum {Array} ['Food', 'Furniture', 'Electronic'] - Only these values are allowed.
     * @required {String} Driver department is required.
     */
    driver_department: {
        type: String,
        required: [true, 'Driver department is required'],
        enum: {
            values: ['Food', 'Furniture', 'Electronic'],
            message: 'Driver department must be either Food, Furniture, or Electronic'
        }
    },

    /**
     * Driver's license code.
     * 
     * @type {String}
     * @required {String} Driver license is required.
     * @minlength {Number} Minimum length is 5 characters.
     * @maxlength {Number} Maximum length is 5 characters.
     */
    driver_license: {
        type: String,
        match: /^[a-zA-Z0-9]+$/,
        required: [true, 'Driver license is required'],
        minlength: [5, 'Driver license must be exactly 5 characters'],
        maxlength: [5, 'Driver license must be exactly 5 characters']
    },

    /**
     * Driver's active status.
     * 
     * @type {Boolean}
     * @required {Boolean} Active status is required.
     */
    driver_is_active: {
        type: Boolean,
        required: [true, 'Driver active status is required'],
    },

    /**
     * Packages assigned to the driver.
     * 
     * @type {Array<ObjectId>} References to Package documents.
     */
    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Package'
    }],

    /**
     * Timestamp of driver creation.
     * 
     * @type {Date}
     * @default Current date and time.
     */
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Driver', driverSchema);
