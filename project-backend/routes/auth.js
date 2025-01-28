// routes/auth.js
const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
const { SignupController, LoginController, ForgotController, LogoutController } = require('../controllers/authController');
const { BookTicketController, MyBookingController } = require('../controllers/bookingController');
require('../db/connection');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */
//signup Route
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's first name.
 *               lastname:
 *                 type: string
 *                 description: The user's last name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               cpassword:
 *                 type: string
 *                 format: password
 *                 description: Confirm password (should match the password field).
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       '400':
 *         description: User already exists.
 *         content:
 *           application/json:
 *             example:
 *               message: User already exists
 *       '422':
 *         description: Invalid input or validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/signup', SignupController);

//Login route
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user with the provided email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Login successful
 *       '400':
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 *       '422':
 *         description: Invalid input or validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/login', LoginController);

//forgotpassword route
/**
 * @swagger
 * /forgotpassword:
 *   post:
 *     summary: Reset user password
 *     description: Reset the user's password using the provided email and new password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The new password.
 *               cpassword:
 *                 type: string
 *                 format: password
 *                 description: Confirm new password.
 *     responses:
 *       '200':
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Password changed successfully
 *       '400':
 *         description: Email not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Email not found
 *       '422':
 *         description: Invalid input or validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields or Passwords do not match
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/forgotpassword', ForgotController);

//logout route
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Logout the user by clearing the authentication token cookie.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Logout successful
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/logout', LogoutController);


//authentication route
/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Authenticate user
 *     description: Access a secure route by verifying user authentication.
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Secure route accessed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Secure route accessed successfully!
 *               email: user@example.com
 *       '401':
 *         description: Unauthorized.
 *         content:
 *           text/plain:
 *             example: Unauthorized
 */
/**
 * @swagger
 * securityDefinitions:
 *   cookieAuth:
 *     type: apiKey
 *     in: cookie
 *     name: jwtoken
 */
router.post('/authenticate', Authenticate, (req, res) => {
  const email = req.email;
  res.json({ message: 'Secure route accessed successfully!', email: email });
});


