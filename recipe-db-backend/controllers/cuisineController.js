const db = require('../models/db');

// Get All Cuisines
exports.getAllCuisines = (req, res) => {
    const query = `SELECT * FROM Cuisine`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};
