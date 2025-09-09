const db = require('../models/db');

// ➤ Add Favorite Recipe for User
exports.addFavorite = async (req, res) => {
    try {
        const user_id = req.user.user_id;  // From authMiddleware
        const { recipe_id } = req.params;  // From URL param

        if (!recipe_id) {
            return res.status(400).json({ message: "Recipe ID is required" });
        }

        // Check if favorite already exists
        const checkQuery = `
            SELECT * FROM Favorite WHERE user_id = ? AND recipe_id = ?
        `;

        db.query(checkQuery, [user_id, recipe_id], (err, existing) => {
            if (err) return res.status(500).json({ error: err });

            if (existing.length > 0) {
                return res.status(400).json({ message: "Recipe already in favorites" });
            }

            // Insert into Favorite table
            const insertQuery = `
                INSERT INTO Favorite (user_id, recipe_id) VALUES (?, ?)
            `;

            db.query(insertQuery, [user_id, recipe_id], (err, result) => {
                if (err) return res.status(500).json({ error: err });

                return res.status(200).json({ message: "Recipe added to favorites" });
            });
        });

    } catch (err) {
        console.error("Add favorite error:", err);
        return res.status(500).json({ message: "Server error while adding favorite" });
    }
};

// ➤ Get Favorite Recipes of User
exports.getFavoritesByUserId = (req, res) => {
    const userId = req.params.user_id;

    const query = `
        SELECT r.*, c.name AS cuisine_name
        FROM Recipe r
        LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
        JOIN Favorite f ON r.recipe_id = f.recipe_id
        WHERE f.user_id = ?
    `;

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};
