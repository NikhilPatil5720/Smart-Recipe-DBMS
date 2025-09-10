const db = require('../models/db');

// // Search Recipes by keyword, ingredient, cuisine name
// exports.searchRecipes = (req, res) => {
//     const { keyword, ingredient, cuisine } = req.query;

//     let query = `
//         SELECT DISTINCT r.*, c.name AS cuisine_name
//         FROM Recipe r
//         LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
//         LEFT JOIN RecipeIngredient ri ON r.recipe_id = ri.recipe_id
//         LEFT JOIN Ingredient i ON ri.ingredient_id = i.ingredient_id
//         WHERE 1=1
//     `;

//     const params = [];

//     if (keyword) {
//         query += ' AND r.title LIKE ?';
//         params.push(`%${keyword}%`);
//     }

//     if (ingredient) {
//         query += ' AND i.name LIKE ?';
//         params.push(`%${ingredient}%`);
//     }

//     if (cuisine) {
//         query += ' AND c.name LIKE ?';
//         params.push(`%${cuisine}%`);
//     }

//     db.query(query, params, (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.json(result);
//     });
// };








// const db = require('../models/db');

exports.searchRecipes = (req, res) => {
    const { keyword, ingredient, cuisine, dietary_type } = req.query;

    let query = `
        SELECT DISTINCT r.*, c.name AS cuisine_name
        FROM Recipe r
        LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
        LEFT JOIN RecipeIngredient ri ON r.recipe_id = ri.recipe_id
        LEFT JOIN Ingredient i ON ri.ingredient_id = i.ingredient_id
    `;

    const conditions = [];
    const params = [];

    if (keyword) {
        conditions.push('r.title LIKE ?');
        params.push(`%${keyword}%`);
    }

    if (ingredient) {
        conditions.push('i.name LIKE ?');
        params.push(`%${ingredient}%`);
    }

    if (cuisine) {
        conditions.push('c.name LIKE ?');
        params.push(`%${cuisine}%`);
    }

    if (dietary_type) {
     conditions.push('LOWER(r.dietary_type) = ?');
    params.push(dietary_type.toLowerCase());
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');  // Use AND instead of OR
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Search query error:", err);
            return res.status(500).json({ error: err });
        }
        return res.json(result);
    });
};
