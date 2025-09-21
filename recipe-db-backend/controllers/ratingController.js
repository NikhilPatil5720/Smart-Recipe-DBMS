const db = require('../models/db');

// Add Rating
exports.addRating = (req, res) => {
    const user_id = req.userId;  // From auth middleware
    const { recipe_id, rating } = req.body;

    // const query = `
    //     INSERT INTO Rating (recipe_id, user_id, rating)
    //     VALUES (?, ?, ?)
    //     ON DUPLICATE KEY UPDATE rating = VALUES(rating), rated_at = CURRENT_TIMESTAMP
    // `;


    const query = `
    INSERT INTO Rating (recipe_id, user_id, rating)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = VALUES(rating), rated_at = CURRENT_TIMESTAMP
`;

    db.query(query, [recipe_id, user_id, rating], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ message: 'Rating added/updated successfully' });
    });
};

// Get Ratings for a Recipe
exports.getRecipeRatings = (req, res) => {
    const recipe_id = req.params.recipe_id;

    const query = `
        SELECT AVG(rating) AS average_rating, COUNT(*) AS rating_count
        FROM Rating
        WHERE recipe_id = ?
    `;

    db.query(query, [recipe_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result[0]);
    });
};
