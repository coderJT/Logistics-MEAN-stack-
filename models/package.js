/**
 * Package Mongoose Model.
 * 
 * @fileoverview This module defines the schema for the Package model using Mongoose.
 * 
 * @module models/package
 * 
 * @requires mongoose - Mongoose ODM to define the schema and model
 */

const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    /**
     * Unique identifier for the package.
     * 
     * @type {String}
     */
    package_id: {
        type: String,
    },
    
    /**
     * Title of the package.
     * 
     * @type {String}
     * @required {String} Package title is required.
     * @minlength {Number} Minimum length is 3 characters.
     * @maxlength {Number} Maximum length is 15 characters.
     */
    package_title: {
        type: String,
        match: /^[a-zA-Z0-9]+$/,
        required: [true, 'Package title is required'],
        minlength: [3, 'Package title must be at least 3 characters long'],
        maxlength: [15, 'Package title cannot exceed 15 characters']
    },

    /**
     * Weight of the package.
     * 
     * @type {Number}
     * @required {Number} Package weight is required.
     * @validate {Function} Package weight must be greater than zero.
     */
    package_weight: {
        type: Number,
        required: [true, 'Package weight is required'],
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Package weight must be greater than zero'
        }
    },

    /**
     * Destination of the package.
     * 
     * @type {String}
     * @required {String} Package destination is required.
     * @minlength {Number} Minimum length is 5 characters.
     * @maxlength {Number} Maximum length is 15 characters.
     */
    package_destination: {
        type: String,
        match: /^[a-zA-Z0-9]+$/,
        required: [true, 'Package destination is required'],
        minlength: [5, 'Package destination must be at least 5 characters long'],
        maxlength: [15, 'Package destination cannot exceed 15 characters']
    },

    /**
     * Description of the package.
     * 
     * @type {String}
     * @minlength {Number} Minimum length is 0 characters.
     * @maxlength {Number} Maximum length is 30 characters.
     */
    package_description: {
        type: String,
        minlength: [0, 'Package description must be at least 0 characters'],
        maxlength: [30, 'Package description cannot exceed 30 characters']
    },

    /**
     * Allocation status of the package.
     * 
     * @type {Boolean}
     * @required {Boolean} Package allocation status is required.
     */
    is_allocated: {
        type: Boolean,
        required: [true, 'Package allocation status is required']
    },

    /**
     * Driver's mongoose _id to whom the package is assigned.
     * 
     * @type {String}
     * @required {String} Driver mongoose _id is required.
     * @ref {String} Refers to the Driver model.
     */
    driver_mongoose_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Driver\'s mongoose id is required'],
        ref: 'Driver'
    },

    /**
     * Timestamp of package creation.
     * 
     * @type {Date}
     * @default Current date and time.
     */
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Package', packageSchema);
