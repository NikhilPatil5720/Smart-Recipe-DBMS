// // routes/auth.js or routes/users.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const pool = require('../models/db'); // your MySQL connection

// // Change password endpoint
// router.post('/change-password', async (req, res) => {
//     const { username, oldPassword, newPassword } = req.body;

//     try {
//         // 1️⃣ Get current hashed password from DB
//         const [rows] = await pool.query(
//             'SELECT password FROM User WHERE username= ?',
//             [username]
//         );

//         if (rows.length === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const currentHash = rows[0].password;

//         // 2️⃣ Verify old password
//         const isMatch = await bcrypt.compare(oldPassword, currentHash);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Old password is incorrect' });
//         }

//         // 3️⃣ Hash new password
//         const saltRounds = 8;
//         const newHash = await bcrypt.hash(newPassword, saltRounds);

//         // 4️⃣ Update password in DB
//         await pool.query(
//             'UPDATE User SET password = ? WHERE username = ?',
//             [newHash, username]
//         );

//         res.json({ message: 'Password updated successfully!' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;




// routes/changePassword.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // or bcrypt
const pool = require('../models/db');

// POST /api/change-password
router.post('/change-password', async (req, res) => {
    const { user_id, newPassword } = req.body;

    try {
        const saltRounds = 8;
        const hash = await bcrypt.hash(newPassword, saltRounds);

        await pool.query(
            'UPDATE User SET password = ? WHERE user_id = ?',
            [hash, user_id]
        );

        res.json({ message: 'Password reset successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; // ✅ must export router, not controller function
