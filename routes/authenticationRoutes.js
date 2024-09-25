/**
 * Authentication routing.
 * 
 * @fileoverview This module defines routes for handling authentication (sign up, login, logout).
 * 
 * @module routes/authenticationRoutes
 * 
 * @requires express
 * @requires firebase-admin - Firebase admin SDK for Firestore database
 * @requires bcrypt - To encrypt user credentials.
 */

// Import express library
const express = require('express');

// Use Express Router
const router = express.Router();

// Import Firebase admin library
const admin = require('firebase-admin');

// Access Firestore database
const db = admin.firestore();

// Import bcrypt library
const bcrypt = require('bcrypt');

/**
 * API Routes
 */

/**
 * POST /api/v1/signup
 * 
 * @description Sign up a user through API.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/api/v1/signup', async (req, res) => {

    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.json({
            error: "Password do not match."
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection('users').doc(username).set({
            username,
            password: hashedPassword
        });

        res.json({
            "status": "Signed up successfully."
        })

    } catch (error) {
        res.json({
            "status": error
        })
    }
});

/**
 * POST /api/v1/login
 * 
 * @description Log in a user through API.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/api/v1/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const userDoc = await db.collection('users').doc(username).get();

        if (!userDoc.exists) {
            return res.status(404).json({
                "status": "User not found",
            })
        }

        const userData = userDoc.data();
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {    
            res.status(401).json({
                "status": "Password incorrect.",
            })
        }
        
        req.session.user = { username }; 

        res.status(200).json({
            "status": "Logged in successfully."
        })

    } catch (error) {
        res.json({
            "status": error
        })
    }
});

/**
 * GET /api/v1/logout
 * 
 * @description Logs out current user through API. 
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/api/v1/logout', (req, res) => {
    if (!req.session.user) {
        return res.json({
            status: "Not logged in."
        })
    }
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout Failed');
        }
        res.json({
            status: "Logged out successfully."
        })
    })
})


module.exports = router;