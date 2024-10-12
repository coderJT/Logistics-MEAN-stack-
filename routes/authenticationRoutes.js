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
 * @requires jwt - Used to generate JWT tokens
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

// Import JWT library
const jwt = require('jsonwebtoken');
const JWT_KEY = "secret_key_in_env";

const generateJWTToken = (username) => {
    return jwt.sign({ username }, JWT_KEY, {expiresIn: '24h'});
}

/**
 * API Routes
 */

 /**
  * POST method to handle signup request.
  * 
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * 
  * @returns {Promise<void>}
  */
 router.post('/api/v1/signup', async (req, res) => {
     const { username, password, confirmPassword } = req.body;
    console.log(password + " " + confirmPassword);
     if (password !== confirmPassword) {
         return res.status(400).json({ error: "Password do not match." });
     }  

     try {

         const existingUserDoc = await db.collection('users').doc(username).get();
         
         if (existingUserDoc.exists) {
             return res.status(400).json({ error: "Username already exists. Please choose another username." });
         }

         await db.collection('users').doc(username).set({
             username,
             password
         });

         res.json({ message: "User signed up successfully." });
     } catch (error) {
         res.status(500).json({ error: "Error during signup: " + error.message });
     }
 })
 /**
  * POST method to handle login request.
  * 
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * 
  * @returns {Promise<void>}
  */
 router.post('/api/v1/login', async (req, res) => {
     const { username, password } = req.body;

     try {
         const userDoc = await db.collection('users').doc(username).get();
         if(!userDoc.exists){
             return res.status(404).json({error: "User not found."});
         }

        const userData = userDoc.data();
        const isMatch = password === userData.password;

         if (!isMatch) {
             return res.status(401).json({ error: "Incorrect password given. Please try again." });
         }
         const token = generateJWTToken(username);

         res.json({
             message: "Logged in successfully.", token
         })
     } catch (error) {
         res.status(500).json({
             error: "Error during login:" + error.message
         });
     }
 })

/**
 * GET method to handle logout request.
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