const db = require('../models/db');

// Get All Tags
exports.getAllTags = (req, res) => {
    const query = `SELECT * FROM Tag`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};

// Add Tag to a Recipe
exports.addTagToRecipe = (req, res) => {
    const { recipe_id, tag_id } = req.body;

    const query = `
        INSERT INTO RecipeTag (recipe_id, tag_id)
        VALUES (?, ?)
    `;

    db.query(query, [recipe_id, tag_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ message: 'Tag added to recipe' });
    });
};
