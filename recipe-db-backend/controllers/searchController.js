const db = require('../models/db');

// Search Recipes by keyword, ingredient, cuisine name
exports.searchRecipes = (req, res) => {
    const { keyword, ingredient, cuisine } = req.query;

    let query = `
        SELECT DISTINCT r.*, c.name AS cuisine_name
        FROM Recipe r
        LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
        LEFT JOIN RecipeIngredient ri ON r.recipe_id = ri.recipe_id
        LEFT JOIN Ingredient i ON ri.ingredient_id = i.ingredient_id
        WHERE 1=1
    `;

    const params = [];

    if (keyword) {
        query += ' AND r.title LIKE ?';
        params.push(`%${keyword}%`);
    }

    if (ingredient) {
        query += ' AND i.name LIKE ?';
        params.push(`%${ingredient}%`);
    }

    if (cuisine) {
        query += ' AND c.name LIKE ?';
        params.push(`%${cuisine}%`);
    }

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};
