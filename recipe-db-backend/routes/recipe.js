// const express = require('express');
// const router = express.Router();
// const {
//     addRecipe,
//     getAllRecipes,
//     getRecipeById,
//     updateRecipe,
//     deleteRecipe
// } = require('../controllers/recipeController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // Routes
// router.post('/', authMiddleware, addRecipe);
// router.get('/',getAllRecipes);
// router.get('/:id', getRecipeById);
// router.put('/:id',authMiddleware, updateRecipe);
// router.delete('/:id',authMiddleware, deleteRecipe);

// module.exports = router;












const express = require('express');
const router = express.Router();
const {
    addRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Create a new recipe (Authenticated)
router.post('/', authMiddleware, addRecipe);

// ➤ Get all recipes
router.get('/', getAllRecipes);

// ➤ Get recipe by ID
router.get('/:id', getRecipeById);

// ➤ Update a recipe (Authenticated)
router.put('/:id', authMiddleware, updateRecipe);

// ➤ Delete a recipe (Authenticated)
router.delete('/:id', authMiddleware, deleteRecipe);

// // ➤ Search recipes by keyword, ingredient, cuisine
// router.get('/search', searchRecipes);

module.exports = router;
