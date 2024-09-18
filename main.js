/**
 * Main server file.
 * 
 * @fileoverview This is the server script for this web app. It is based on an Express.js server that manages the drivers
 * and packages. It also consists of the main routing logic required (GET, POST), alongside rendering files with EJS and with
 * necessary CRUD operations for both drivers and packages.
 * 
 * @requires express - Handles server creation and routing.
 * @requires ejs - Used to render EJS templates.
 * @requires path - For handling file paths.
 * @requires mongoose - ODM library to interact with MongoDB.
 * @requires routes/driverRoutes - Routes for driver-related operations.
 * @requires routes/packageRoutes - Routes for package-related operations.
 * @requires routes/authenticationRoutes - Routes for authentication-related operations.
 * @requires firebase-admin - Firebase Admin SDK to access Firestore.
 * @requires bcrypt - Used to encrypt user credentials.
 * @requires middleware/authenticate - Middleware to authenticate users
 */

/**
 * Firebase initialization.
 */
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'fit2095a2-afc60'
})

const db = admin.firestore();

/**
 * Import of necessary libraries and modules.
 */
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const driverRoutes = require("./routes/driverRoutes");
const packagesRoutes = require("./routes/packageRoutes");
const authenticationRoutes = require('./routes/authenticationRoutes');
const session = require('express-session');
const Driver = require('./models/driver');
const Package = require('./models/package');
const { checkAuthentication } = require('./middleware/authenticate');

/**
 * Express app setup.
 */
const app = express();
const PORT_NUMBER = 8080; 

/**
 * Connect to MongoDB and start the server.
 * Switch address to mongodb://localhost:27017/pdma if testing locally and mongo vm 
 * is not started.
 */
mongoose.connect('mongodb://34.129.239.38:27017/pdma')
    .then(() => {
        app.listen(PORT_NUMBER, () => {
            console.log(`Server is running on port ${PORT_NUMBER}`);
        });
    })
    .catch(error => console.error('Database connection error:', error));

/**
 * Middleware setup.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '6x$eJ#zDqLpN7kM',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

/**
 * Static files setup.
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("node_modules/bootstrap/dist/js"));

/**
 * EJS templating setup.
 */
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/**
 * GET method for handling the home page and redirect.
 * 
 * @description Renders the home page or redirects to the main page if accessed from the root URL.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get(['/', '/34279075/Justin'], async (req, res) => {
    try {
        const driversList = await Driver.find(); 
        const packagesList = await Package.find(); 

        res.render('index', { 
            drivers: driversList, 
            packages: packagesList, 
            userLoggedIn: !!req.session.user, 
        });

    } catch (error) {
        res.status(500).send('Error fetching drivers');
    }
});

/**
 * Use driver, packages and authentication routes.
 */
app.use('/34279075/Justin', driverRoutes);
app.use('/34279075/Justin', packagesRoutes);
app.use('/34279075/Justin', authenticationRoutes);

/**
 * GET method for rendering statistics about CRUD operations.
 * 
 * @description Renders a message stating statistics about CRUD operations.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/34279075/Justin/statistics', checkAuthentication, async (req, res) => {
    const countersSnapshot = await db.collection('crud').doc('operationCount').get();
    const data = countersSnapshot.data();

    res.render('statistics', {
        userLoggedIn: !!req.session.user,
        createCount: data.createCount, 
        readCount: data.readCount, 
        updateCount: data.updateCount, 
        deleteCount: data.deleteCount});
});

/**
 * GET method for handling invalid data.
 * 
 * @description Renders a message stating invalid data.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/34279075/Justin/invalid_data', async (req, res) => {
    res.render('invalid_data', {
        userLoggedIn: !!req.session.user
    });
});

/**
 * GET method for handling invalid routes.
 * 
 * @description Renders a message stating invalid route.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.use(async (req, res) => {
    res.render('404', {
        userLoggedIn: !!req.session.user,
    });
});

