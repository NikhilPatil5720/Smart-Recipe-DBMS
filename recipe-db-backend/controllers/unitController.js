const db = require('../models/db');

// Get All Units
exports.getAllUnits = (req, res) => {
    const query = `SELECT * FROM Unit`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};
