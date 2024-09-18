/**
 * CRUD Operation Counter. 
 * 
 * @fileoverview This module provides functions to increment the counters for Create, Read, Update, and Delete (CRUD) operations
 * in Firestore. Each function targets the `crud/operationCount` document and increments the respective field
 * by 1 using Firestore's increment operation.
 * 
 * - The counters are used to track how many times each type of operation (Create, Read, Update, Delete) is performed
 * in the application. 
 * 
 * @module utils/crudCounter
 * 
 * @requires firebase-admin - Firebase Admin SDK for Firestore operations
 * @requires firestore - Firestore database instance for updating CRUD counters
 */

// Import Firebase Admin
const admin = require('firebase-admin');

// Access firestore database
const db = admin.firestore();

/**
 * Increment the "Create" operation counter in Firestore.
 * 
 * @async
 * @function incrementCreate
 * 
 * @throws {Error} If there is an error updating the Firestore document
 * 
 * @description Increments the `createCount` field in the `crud/operationCount` document by 1
 * using Firestore's increment operation.
 */
const incrementCreate = async () => {
    const counterDoc = db.collection('crud').doc('operationCount');
    await counterDoc.update({
        createCount: admin.firestore.FieldValue.increment(1)
    });
}

/**
 * Increment the "Read" operation counter in Firestore.
 * 
 * @async
 * @function incrementRead
 * 
 * @throws {Error} If there is an error updating the Firestore document
 * 
 * @description Increments the `readCount` field in the `crud/operationCount` document by 1
 * using Firestore's increment operation.
 */
const incrementRead = async () => {
    const counterDoc = db.collection('crud').doc('operationCount');
    await counterDoc.update({
        readCount: admin.firestore.FieldValue.increment(1)
    });
}

/**
 * Increment the "Update" operation counter in Firestore.
 * 
 * @async
 * @function incrementUpdate
 * 
 * @throws {Error} If there is an error updating the Firestore document
 * 
 * @description Increments the `updateCount` field in the `crud/operationCount` document by 1
 * using Firestore's increment operation.
 */
const incrementUpdate = async () => {
    const counterDoc = db.collection('crud').doc('operationCount');
    await counterDoc.update({
        updateCount: admin.firestore.FieldValue.increment(1)
    });
}

/**
 * Increment the "Delete" operation counter in Firestore.
 * 
 * @async
 * @function incrementDelete
 * 
 * @throws {Error} If there is an error updating the Firestore document
 * 
 * @description Increments the `deleteCount` field in the `crud/operationCount` document by 1
 * using Firestore's increment operation.
 */
const incrementDelete = async () => {
    const counterDoc = db.collection('crud').doc('operationCount');
    await counterDoc.update({
        deleteCount: admin.firestore.FieldValue.increment(1)
    });
}

module.exports = {
    incrementCreate,
    incrementRead,
    incrementUpdate,
    incrementDelete
}
