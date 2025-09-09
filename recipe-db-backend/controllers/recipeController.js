const db = require('../models/db');

// ➤ Add New Recipe
exports.addRecipe = (req, res) => {
    const user_id = req.userId;  // From authMiddleware
    const {
        title,
        description,
        cuisine_id,
        servings,
        cook_time,
        difficulty,
        image_url,
        ingredients =[],  // Array of { ingredient_id, unit_id, quantity, sequence_no }
        steps = []       // Array of { step_number, instruction }
    } = req.body;

    const recipeQuery = `
        INSERT INTO Recipe (user_id, title, description, cuisine_id, servings, cook_time, difficulty, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        recipeQuery,
        [user_id, title, description, cuisine_id, servings || 1, cook_time, difficulty, image_url],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });

            const recipe_id = result.insertId;

            // Insert Ingredients into RecipeIngredient
            const ingredientPromises = ingredients.map(ing => {
                return new Promise((resolve, reject) => {
                    const query = `
                        INSERT INTO RecipeIngredient (recipe_id, ingredient_id, unit_id, quantity, sequence_no)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    db.query(
                        query,
                        [recipe_id, ing.ingredient_id, ing.unit_id, ing.quantity, ing.sequence_no],
                        (err) => err ? reject(err) : resolve()
                    );
                });
            });

            // Insert Steps
            const stepPromises = steps.map(step => {
                return new Promise((resolve, reject) => {
                    const query = `
                        INSERT INTO Step (recipe_id, step_number, instruction)
                        VALUES (?, ?, ?)
                    `;
                    db.query(
                        query,
                        [recipe_id, step.step_number, step.instruction],
                        (err) => err ? reject(err) : resolve()
                    );
                });
            });

            Promise.all([...ingredientPromises, ...stepPromises])
                .then(() => res.status(201).json({ message: 'Recipe created successfully', recipe_id }))
                .catch(error => res.status(500).json({ error }));
        }
    );
};

// ➤ Get All Recipes with Cuisine Name
exports.getAllRecipes = (req, res) => {
    const query = `
        SELECT r.*, c.name AS cuisine_name
        FROM Recipe r
        LEFT JOIN Cuisine c ON r.cuisine_id = c.cuisine_id
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
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

// ➤ Update Recipe
exports.updateRecipe = (req, res) => {
    const recipe_id = req.params.id;
    const { title, description, cuisine_id, servings, cook_time, difficulty, image_url } = req.body;

    const query = `
        UPDATE Recipe
        SET title = ?, description = ?, cuisine_id = ?, servings = ?, cook_time = ?, difficulty = ?, image_url = ?
        WHERE recipe_id = ?
    `;

    db.query(
        query,
        [title, description, cuisine_id, servings || 1, cook_time, difficulty, image_url, recipe_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Recipe updated successfully' });
        }
    );
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
