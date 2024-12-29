const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
 
const app = express();
const PORT = 3000;
 
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'admin_login'
});
 
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});
 
// Route: Admin login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
 
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
 
    // Query the database for the user
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
 
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
 
        const user = results[0];
 
        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
 
        // Check role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
 
        res.status(200).json({ message: 'Login successful! Welcome, Admin.' });
    });
});
 
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});