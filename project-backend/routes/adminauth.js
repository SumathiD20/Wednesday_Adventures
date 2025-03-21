// routes/adminauth.js
const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
const { AdminSignupController, AdminLoginController, AdminLogoutController, AdminForgotController } = require('../controllers/adminAuthController');
// const { AdminBookTicketController, AdminBookingsController, AdminEditTicketController, AdminDeleteBookingController } = require('../controllers/adminBookingController');
require('../db/connection');
const adminMail = process.env.ADMIN_MAIL;

// ADmin Signup route
/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Register a new admin user.
 *     description: Register a new admin user with the provided details.
 *     tags:
 *       - Admin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Admin's first name.
 *               lastname:
 *                 type: string
 *                 description: Admin's last name.
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *               cpassword:
 *                 type: string
 *                 description: Confirm password.
 *     responses:
 *       201:
 *         description: Admin user registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       400:
 *         description: User with the provided email already exists.
 *         content:
 *           application/json:
 *             example:
 *               message: User already exists
 *       422:
 *         description: Incomplete or invalid request body.
 *         content:
 *           application/json:
 *             example:
 *               message: please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/signup', AdminSignupController);

// Admin Login route
/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login.
 *     description: Authenticate and log in an admin user.
 *     tags:
 *       - Admin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *     responses:
 *       200:
 *         description: Admin login successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Login Succesful
 *       400:
 *         description: Invalid credentials or admin email not recognized.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid Credentials
 *       422:
 *         description: Incomplete or invalid request body.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/login', AdminLoginController);

//admin/forgotpassword route
/**
 * @swagger
 * /admin/forgotpassword:
 *   post:
 *     summary: Admin forgot password.
 *     description: Reset the password for an admin user.
 *     tags:
 *       - Admin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: New password.
 *               cpassword:
 *                 type: string
 *                 description: Confirm password.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Password changed successfully
 *       400:
 *         description: Admin not found or invalid email.
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Not Found
 *       422:
 *         description: Incomplete or invalid request body or passwords do not match.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/forgotpassword', AdminForgotController);

//admin/logout route
/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Admin logout.
 *     description: Logout the admin user and clear the authentication token.
 *     tags:
 *       - Admin Authentication
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Logout successful
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/admin/logout', AdminLogoutController);

//admin/authentication route
/**
 * @swagger
 * /admin/authenticate:
 *   post:
 *     summary: Authenticate admin.
 *     description: Secure route to verify admin authentication.
 *     tags:
 *       - Admin Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Secure route accessed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Secure route accessed successfully!
 *               email: admin@example.com
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 */
router.post('/admin/authenticate', Authenticate, (req, res) => {
    const email = req.email;
    if (email != adminMail) {
        return res.status(401).json({ message: 'Unautherized' });
    }
    res.json({ message: 'Secure route accessed successfully!', email: email });
});


module.exports = router;