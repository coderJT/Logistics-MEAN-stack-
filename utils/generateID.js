/**
 * Function to generate ID for drivers and packages.
 * 
 * @fileoverview This module exports utility functions for generating unique IDs for both packages and drivers.
 * 
 * @module utils/generateID
 * 
 */

/**
 * Generates a unique package ID.
 * 
 * @description The generated package ID format is:
 * - P followed by two random uppercase letters, 
 * - A static "JT" string, 
 * - Three random digits.
 * 
 * @returns {string} A unique package ID.
 * 
 * @example generatePackageID() will return "PBF-JT-123"
 */
const generatePackageID = () => {
    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let twoRandomUpperLetters = Array(2).fill().map(() => UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]).join("");
    let threeRandomDigits = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();

    return "P" + twoRandomUpperLetters + "-" + "JT" + "-" + threeRandomDigits;
}

/**
 * Generates a unique driver ID.
 * 
 * @description The generated driver ID format is:
 * - D followed by two random digits, 
 * - A static "34" string, 
 * - Three random uppercase letters.
 * 
 * @returns {string} A unique driver ID.
 * 
 * @example generateDriverID() will return "D23-34-ABC"
 */
const generateDriverID = () => {
    const twoRandomDigits = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const threeRandomUpperLetters = Array(3).fill().map(() => UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]).join("");

    return "D" + twoRandomDigits + "-" + "34" + "-" + threeRandomUpperLetters;
}

module.exports = { generatePackageID, generateDriverID };
