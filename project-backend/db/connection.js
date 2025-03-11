// /db/connection.js
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

/**
 * Establishes a connection to the MongoDB database.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} - Resolves when the database is connected, rejects on error.
 */


const db = mongoose.connect(DB, {}).then(() => {
    console.log('connected to DB');
}).catch((err) => {console.log(err); });