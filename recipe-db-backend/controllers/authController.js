const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ➤ Signup Controller
exports.signup = (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM User WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Insert user
        const insertQuery = `
            INSERT INTO User (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

// ➤ Login Controller
// exports.login = (req, res) => {
//     const { email, password } = req.body;

//     db.query('SELECT * FROM User WHERE email = ?', [email], (err, result) => {
//         if (err) return res.status(500).json({ error: err });

//         if (result.length === 0)
//             return res.status(404).json({ message: 'User not found' });

//         const user = result[0];

//         // Compare password
//         const isPasswordValid = bcrypt.compareSync(password, user.password);

//         if (!isPasswordValid)
//             return res.status(401).json({ message: 'Incorrect password' });

//         // Create JWT Token
//         const token = jwt.sign(
//             { userId: user.user_id },
//             '123abc',  // Replace with strong secret key in production
//             { expiresIn: '1h' }
//         );

//         return res.json({ token, userId: user.user_id });
//     });
// };


exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM User WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0)
            return res.status(404).json({ message: 'User not found' });

        const user = result[0];

        // Compare password
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid)
            return res.status(401).json({ message: 'Incorrect password' });

        // Create JWT Token
        const token = jwt.sign(
            { userId: user.user_id },
            '123abc',  // Replace with strong secret key in production
            { expiresIn: '1h' }
        );

        // Send token + user info
        return res.json({
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email
            }
        });
    });
};
