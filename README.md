# Package Delivery Management Application (PDMA)

## Overview
This repository contains the implementation of a Single Page Application (SPA) for managing drivers and packages in the Package Delivery Management Application (PDMA). The SPA interacts with a backend server developed, providing a seamless user experience with Angular.

<img width="1440" alt="Screenshot 2025-01-17 at 11 24 19 PM" src="https://github.com/user-attachments/assets/a93e139e-57ae-4b27-a389-0dcdce1e2890" />

## Features
### Core Features
1. **Angular Routing**
   - Smooth navigation among components using Angular Router.
   - Includes a `Page Not Found` component for invalid URLs.
   - Displays `Invalid Data` component for backend validation errors (e.g., 400 errors).

2. **Angular Components**
   - **Header**: Displays a navigation menu and remains at the top of the page.
   - **Footer**: Displays static footer content at the bottom of the page.
   - **Add Driver**: Allows users to add new drivers to the database.
   - **List Drivers**: Lists all drivers in a table with names displayed in uppercase (via Angular Pipe).
   - **Delete Driver**: Deletes a driver and its associated packages by ID with a confirmation.
   - **Update Driver**: Updates a driver's licence and department.
   - **Add Package**: Adds new packages to the database.
   - **List Packages**: Lists all packages with weights displayed in grams (via Angular Pipe).
   - **Delete Package**: Deletes a package by ID.
   - **Update Package**: Updates the destination of a package.
   - **Statistics**: Displays the number of drivers and packages and database operation counts fetched from Firebase.

3. **Backend Integration**
   - Communicates with the RESTful API backend (API/V1) developed.
   - Supports database operations with real-time updates.

4. **Cloud Services**
   - Uses Socket.io to enable backend integration for advanced features.

5. **Progressive Web App (PWA)**
   - Converts the Angular application into a PWA for offline accessibility and enhanced performance.

3. **Advanced Components** (No longer working due to API credit limits)
   - **Translate Description**: Translates package descriptions into one of three selectable languages using Google Translate services via Socket.io.
   - **Text to Speech**: Converts driver licence details into speech using Google Text-to-Speech services via Socket.io.
   - **Generative AI**: Calculates the distance between a package destination and Melbourne using Socket.io and Google Maps API.

## Deployment
- The application is hosted on Google Cloud Platform (GCP).
- Backend and frontend are deployed on separate virtual machines for scalability.

## Setup Instructions

#### Note: You must set the environment variable 'GOOGLE_APPLICATION_CREDENTIALS' to direct to Firebase service account JSON file to continue.
#### Also, Set the environment variables in a .env file (example provided through .env.example file)

### Backend
1. Clone the backend repository.
2. Install dependencies using `npm install`.
3. Configure MongoDB and Firebase credentials.
4. Start the server using `node main.js`.

### Frontend
1. Cd into the frontend directory.   
2. Install Angular dependencies using `npm install --force`.
3. Build the application using `ng build`.
4. Deploy to GCP or serve locally using `ng serve`.

## Usage
1. Navigate to the application URL.
2. Use the navigation menu to:
   - Add, list, update, or delete drivers.
   - Add, list, update, or delete packages.
   - View statistics and advanced features.
3. Authenticate using the signup/login components for restricted features.

## Technologies Used
- **Frontend**: Angular, Angular Router, Angular Services, Angular Pipes
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Firebase, Socket.io
- **Cloud Services**: Google Cloud Platform (GCP), Google Translate API, Google Text-to-Speech API

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

