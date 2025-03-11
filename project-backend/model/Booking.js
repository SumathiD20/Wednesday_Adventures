// /model/Booking.js

const mongoose = require('mongoose');
/**
 * Booking schema for MongoDB using Mongoose.
 * Represents a user's booking details in the system.
 *
 * @typedef {Object} BookingSchema
 * @property {string} email - User's email (required).
 * @property {Date} date - Booking date (default: current date).
 * @property {string} bookingnumber - Unique booking identifier (required).
 * @property {Object} adventures - Object containing lists of booked adventures.
 * @property {string[]} adventures.Darkwood - List of adventures in Darkwood.
 * @property {string[]} adventures.WickedWheel - List of adventures in WickedWheel.
 * @property {string[]} adventures.ThrillChillPark - List of adventures in ThrillChillPark.
 * @property {string[]} adventures.WaterAmaze - List of adventures in WaterAmaze.
 */

const bookingSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    email: { type: String, required: true, },
    // address: { type: String, required: true },
    // contact: { type: Number, required: true },
    // adult: { type: Number, default: 0 },
    // children: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    bookingnumber: { type: String, required: true },
    adventures: {
        Darkwood: [{ type: String, }],
        WickedWheel: [{ type: String, }],
        ThrillChillPark: [{ type: String, }],
        WaterAmaze: [{ type: String, }],
    },
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;