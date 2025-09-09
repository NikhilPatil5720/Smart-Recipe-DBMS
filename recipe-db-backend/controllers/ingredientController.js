// const db = require('../models/db');

// // Add Ingredient
// exports.addIngredient = (req, res) => {
//     const { name } = req.body;

//     db.query('INSERT INTO Ingredients (name) VALUES (?)', [name], (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.status(201).json({ message: 'Ingredient added successfully', ingredientId: result.insertId });
//     });
// };

// // Get All Ingredients
// exports.getAllIngredients = (req, res) => {
//     db.query('SELECT * FROM Ingredients', (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.json(result);
//     });
// };














const db = require('../models/db');

// Add new ingredient
exports.addIngredient = (req, res) => {
    const { name } = req.body;

    const checkQuery = `SELECT ingredient_id FROM Ingredient WHERE name = ?`;
    db.query(checkQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length > 0) {
            // Ingredient already exists → return existing id
            return res.status(200).json({ ingredient_id: result[0].ingredient_id });
        } else {
            // Insert new ingredient
            const insertQuery = `INSERT INTO Ingredient (name) VALUES (?)`;
            db.query(insertQuery, [name], (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ ingredient_id: result.insertId });
            });
        }
    });
};

// Get all ingredients
exports.getAllIngredients = (req, res) => {
    const query = `SELECT * FROM Ingredient`;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Add ingredient to recipe
exports.addIngredientToRecipe = (req, res) => {
    const { recipe_id, ingredient_id, unit_id, quantity, sequence_no } = req.body;

    const query = `
      INSERT INTO RecipeIngredient (recipe_id, ingredient_id, unit_id, quantity, sequence_no)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), unit_id = VALUES(unit_id), sequence_no = VALUES(sequence_no)
    `;

    db.query(query, [recipe_id, ingredient_id, unit_id, quantity, sequence_no], (err, result) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Ingredient added/updated to recipe' });
    });
};

// Get ingredients of a recipe
exports.getIngredientsByRecipe = (req, res) => {
    const recipe_id = req.params.id;
    const query = `
        SELECT ri.quantity, ri.sequence_no, u.name AS unit_name, i.ingredient_id, i.name AS ingredient_name
        FROM RecipeIngredient ri
        JOIN Ingredient i ON ri.ingredient_id = i.ingredient_id
        LEFT JOIN Unit u ON ri.unit_id = u.unit_id
        WHERE ri.recipe_id = ?
        ORDER BY ri.sequence_no ASC
    `;

    db.query(query, [recipe_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
