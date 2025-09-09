const db = require('../models/db');

// ➤ Add New Recipe

exports.addRecipe = (req, res) => {

    const user_id = req.userId;
    const { title, description, cuisine_id, servings, cook_time, difficulty, image_url, ingredients = [], steps = [] } = req.body;

    const recipeQuery = `
        INSERT INTO Recipe (user_id, title, description, cuisine_id, servings, cook_time, difficulty, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(recipeQuery,
        [user_id, title, description, cuisine_id, servings || 1, cook_time, difficulty, image_url],
        async (err, result) => {
            if (err) return res.status(500).json({ error: err });

            const recipe_id = result.insertId;

            try {
                // Handle ingredients
                for (let i = 0; i < ingredients.length; i++) {
                    const ing = ingredients[i];
                    let ingredient_id;

                    // Check if ingredient exists
                    const [existing] = await new Promise((resolve, reject) => {
                        db.query(`SELECT ingredient_id FROM Ingredient WHERE name = ?`, [ing.name], (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        });
                    });

                    if (existing && existing.length > 0) {
                        ingredient_id = existing[0].ingredient_id;
                    } else {
                        // Insert new ingredient
                        const insertResult = await new Promise((resolve, reject) => {
                            db.query(`INSERT INTO Ingredient (name) VALUES (?)`, [ing.name], (err, result) => {
                                if (err) reject(err);
                                else resolve(result);
                            });
                        });
                        ingredient_id = insertResult.insertId;
                    }

                    // Insert into RecipeIngredient
                    await new Promise((resolve, reject) => {
                        db.query(
                            `INSERT INTO RecipeIngredient (recipe_id, ingredient_id, unit_id, quantity, sequence_no) VALUES (?, ?, ?, ?, ?)`,
                            [recipe_id, ingredient_id, ing.unit_id || null, ing.quantity, i + 1],
                            (err) => err ? reject(err) : resolve()
                        );
                    });
                }

                // Handle steps
                for (let i = 0; i < steps.length; i++) {
                    const step = steps[i];
                    await new Promise((resolve, reject) => {
                        db.query(
                            `INSERT INTO Step (recipe_id, step_number, instruction) VALUES (?, ?, ?)`,
                            [recipe_id, step.step_number, step.instruction],
                            (err) => err ? reject(err) : resolve()
                        );
                    });
                }

                res.status(201).json({ message: "Recipe and ingredients added successfully", recipe_id });
            } catch (error) {
                res.status(500).json({ error });
            }
        }
    );
};


// ➤ Get All Recipes with Cuisine Name
// exports.getAllRecipes = (req, res) => {
//     const query = `
//         SELECT r.*, c.name AS cuisine_name
//         FROM Recipe r
//         LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
//     `;

//     db.query(query, (err, result) => {
//         if (err) 
//                             console.error("Update recipe error:", err); // <-- this will log the actual MySQL error

//             return res.status(500).json({ error: err });
//         res.json(result);
//     });
// };



exports.getAllRecipes = (req, res) => {
    const query = `
        SELECT r.recipe_id, r.title, r.description, r.servings, r.cook_time, r.difficulty, r.image_url,
               c.name AS cuisine
        FROM Recipe r
        LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};


// ➤ Get Recipe by ID (including Ingredients and Steps)
exports.getRecipeById = (req, res) => {
    const recipeId = req.params.id;

    const recipeQuery = `
        SELECT r.*, c.name AS cuisine_name
        FROM Recipe r
        LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
        WHERE r.recipe_id = ?
    `;

    db.query(recipeQuery, [recipeId], (err, recipes) => {
        if (err) return res.status(500).json({ error: err });
        if (recipes.length === 0) return res.status(404).json({ message: 'Recipe not found' });

        const recipe = recipes[0];

        const ingredientsQuery = `
            SELECT ri.quantity, ri.sequence_no, u.name AS unit_name, i.ingredient_id, i.name AS ingredient_name
            FROM RecipeIngredient ri
            JOIN Ingredient i ON ri.ingredient_id = i.ingredient_id
            LEFT JOIN Unit u ON ri.unit_id = u.unit_id
            WHERE ri.recipe_id = ?
            ORDER BY ri.sequence_no ASC
        `;

        const stepsQuery = `
            SELECT step_number, instruction
            FROM Step
            WHERE recipe_id = ?
            ORDER BY step_number ASC
        `;

        db.query(ingredientsQuery, [recipeId], (err, ingredients) => {
            if (err) return res.status(500).json({ error: err });

            db.query(stepsQuery, [recipeId], (err, steps) => {
                if (err) return res.status(500).json({ error: err });

                res.json({
                    ...recipe,
                    ingredients,
                    steps
                });
            });
        });
    });
};

// Update Recipe (with string cuisine & JSON ingredients)
// exports.updateRecipe = (req, res) => {
//     const recipe_id = req.params.id;
//     const { title, description, cuisine, servings, cook_time, difficulty, image_url, ingredients } = req.body;

//     const query = `
//         UPDATE Recipe
//         SET title = ?, description = ?, cuisine = ?, servings = ?, cook_time = ?, difficulty = ?, image_url = ?, ingredients = ?
//         WHERE recipe_id = ?
//     `;

//     db.query(
//         query,
//         [
//             title,
//             description,
//             cuisine,
//             servings || 1,
//             cook_time,
//             difficulty,
//             image_url,
//             JSON.stringify(ingredients || []),
//             recipe_id
//         ],
//         (err, result) => {
//             if (err) {
//                 console.error("Update recipe error:", err);
//                 return res.status(500).json({ error: err });
//             }
//             res.json({ message: 'Recipe updated successfully' });
//         }
//     );
// };

exports.updateRecipe = (req, res) => {
    const recipe_id = req.params.id;
    const { title, description, cuisine_id, servings, cook_time, difficulty, image_url, ingredients } = req.body;

    const safeIngredients = Array.isArray(ingredients) ? ingredients : [];

    const updateRecipeQuery = `
        UPDATE Recipe
        SET title = ?, description = ?, cuisine_id = ?, servings = ?, cook_time = ?, difficulty = ?, image_url = ?
        WHERE recipe_id = ?
    `;

    db.query(updateRecipeQuery,
        [title, description, cuisine_id, servings || 1, cook_time, difficulty, image_url, recipe_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });

            // Remove existing ingredients
            db.query('DELETE FROM RecipeIngredient WHERE recipe_id = ?', [recipe_id], (err2) => {
                if (err2) return res.status(500).json({ error: err2 });

                // Insert new ingredients
                const insertPromises = safeIngredients.map((ing, index) => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            'INSERT INTO RecipeIngredient (recipe_id, ingredient_id, quantity, sequence_no) VALUES (?, ?, ?, ?)',
                            [recipe_id, ing.ingredient_id, ing.quantity, index + 1],
                            (err3, result3) => {
                                if (err3) reject(err3);
                                else resolve(result3);
                            }
                        );
                    });
                });

                Promise.all(insertPromises)
                    .then(() => res.json({ message: 'Recipe and ingredients updated successfully' }))
                    .catch(err4 => res.status(500).json({ error: err4 }));
            });
        });
};



// ➤ Delete Recipe
exports.deleteRecipe = (req, res) => {
    const recipeId = req.params.id;

    const query = `DELETE FROM Recipe WHERE recipe_id = ?`;

    db.query(query, [recipeId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Recipe deleted successfully' });
    });
};
