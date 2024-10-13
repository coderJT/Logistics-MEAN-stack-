/**
 * Main server file.
 * 
 * @fileoverview This is the server script for this web app. It is based on an Express.js server that manages the drivers
 * and packages. It also consists of the main routing logic required (GET, POST), alongside rendering files with EJS and with
 * necessary CRUD operations for both drivers and packages.
 * 
 * @requires cors - To allow cross-origin requests.
 * @requires express - Handles server creation and routing.
 * @requires path - For handling file paths.
 * @requires mongoose - ODM library to interact with MongoDB.
 * @requires routes/driverRoutes - Routes for driver-related operations.
 * @requires routes/packageRoutes - Routes for package-related operations.
 * 
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
    projectId: 'fit2095a3-438405'
})

const db = admin.firestore();

/**
 * Import of necessary libraries and modules.
 */
const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const driverRoutes = require("./routes/driverRoutes");
const packagesRoutes = require("./routes/packageRoutes");
const authenticationRoutes = require('./routes/authenticationRoutes');
const { checkAuthenticationAPI } = require('./middleware/authenticate');
const driver = require('./models/driver');
const package = require('./models/package');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();
const textToSpeech = require("@google-cloud/text-to-speech");
const textToSpeechClient = new textToSpeech.TextToSpeechClient();
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Express app setup.
 */
const app = express();
const PORT_NUMBER = 8080; 

app.use(cors({
    origin: ['http://localhost:4200', 'http://10.148.0.2:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

/**
 * Connect to MongoDB and start the server.
 * Switch address to mongodb://localhost:27017/pdma if testing locally and mongo vm 
 * is not started.
 */
mongoose.connect('mongodb://localhost:27017/pdma')
    .then(() => {

        // Express server setup
        const server = app.listen(PORT_NUMBER, () => {
            console.log(`Server is running on port ${PORT_NUMBER}`);
        })
        
        // Socket.io setup
        const io = require('socket.io')(server, {
            cors: {
              origin: 'http://localhost:4200',
              methods: ['GET', 'POST', 'PUT', 'DELETE'],
              credentials: true
            }
          });
        io.on('connection', (socket) => {
            console.log(`Connection established with ${socket.id}`);
        
        // Socket.io event handlers for translate requests
        socket.on("translateRequest", async (data) => {
            const { description, targetLanguage } = data;
            try {
                const [translation] = await translate.translate(description, targetLanguage);
                socket.emit("translationResponse", { translation });
            } catch (error) {
                console.error("Translation error:", error);
                socket.emit("translationResponse", { error: "Translation failed." });
            }
        });

        // Socket.io event handlers for text-to-speech requests
        socket.on('textToSpeech', async (data) => {
            const request = {
                input: { text: data.text },
                voice: { languageCode: data.voice.languageCode, ssmlGender: data.voice.ssmlGender },
                audioConfig: { audioEncoding: 'MP3' }
            };
    
            try {
                const [response] = await textToSpeechClient.synthesizeSpeech(request);
                socket.emit('speechResult', { audioContent: response.audioContent.toString('base64') });
            } catch (error) {
                console.error('Error during Text-to-Speech conversion:', error);
                socket.emit('speechResult', { error: 'Conversion failed' });
            }
        });

        // Socket.io event handlers for calculating distance requests
        socket.on("calculateDistance", async ({ packageId, destination }) => {
            try {
              const distance = await calculateDistance('Melbourne', destination); 
              socket.emit("distanceResult", { packageId, distance });
            } catch (error) {
              console.error('Error calculating distance:', error);
              socket.emit("distanceResult", { packageId, distance: -1 }); 
            }
          });

        // Socket.io event handler for disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });    
    })
    })
    .catch(error => console.error('Database connection error:', error));

/**
 * Middleware setup.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Static files setup.
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("node_modules/bootstrap/dist/js"));

/**
 * Helper method to calculate the distance given two locations.
 * 
 * @param {string} origin - Origin of the package.
 * @param {string} destination - Destination of the package.
 * 
 * @returns {Promise<string>}
 */
async function calculateDistance(origin, destination) {
    const genAI = new GoogleGenerativeAI("AIzaSyCK296HAZk0BliEMzM5vWACY5DUtlKQ7gw");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `What is the distance between ${origin} and ${destination}? Please provide the answer in km. You can use online tools to give me the correct answer. Only return the numbers, no text.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}

/**
 * GET method for retrieving driver and package count.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
app.use('/api/v1/count', async (req, res) => {
    try {
        const driverCount = await driver.countDocuments({});
        const packageCount = await package.countDocuments({});

        res.json({
            driverCount,
            packageCount
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve driver and package count: ' + error.message });
    }
});

/**
 * Use driver and packages routes.
 */
app.use('/', authenticationRoutes);
app.use('/', driverRoutes);
app.use('/', packagesRoutes);

/**
 * GET method for rendering statistics about CRUD operations.
 * 
 * @description Returns statistics about CRUD operation in json format.
 * 
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/api/v1/statistics', checkAuthenticationAPI, async (req, res) => {
    try {
        const countersSnapshot = await db.collection('crud').doc('operationCount').get();
        const data = countersSnapshot.data();

        if (!data) {
            return res.status(404).json({ error: 'Statistics data not found' });
        }

        res.json({
            createCount: data.createCount,
            readCount: data.readCount,
            updateCount: data.updateCount,
            deleteCount: data.deleteCount
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve statistics: ' + err.message });
    }
});

