const db = require('../models/db');

// ➤ Add Step
exports.addStep = (req, res) => {
    const { recipe_id, step_number, instruction } = req.body;

    const query = `
        INSERT INTO Step (recipe_id, step_number, instruction)
        VALUES (?, ?, ?)
    `;

    db.query(query, [recipe_id, step_number, instruction], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ message: 'Step added successfully', step_id: result.insertId });
    });
};

// ➤ Get Steps for a Recipe
exports.getStepsByRecipeId = (req, res) => {
    const recipeId = req.params.recipe_id;

    const query = `
        SELECT step_number, instruction
        FROM Step
        WHERE recipe_id = ?
        ORDER BY step_number ASC
    `;

    db.query(query, [recipeId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};
