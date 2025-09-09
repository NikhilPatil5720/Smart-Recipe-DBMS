// const express = require('express');
// const router = express.Router();
// const { addIngredient, getAllIngredients } = require('../controllers/ingredientController');

// // Routes
// router.post('/', addIngredient);
// router.get('/', getAllIngredients);

// module.exports = router;



const express = require('express');
const router = express.Router();
const {
    addIngredient,
    getAllIngredients,
    addIngredientToRecipe,
    getIngredientsByRecipe
} = require('../controllers/ingredientController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Add a new ingredient (Admin or Authenticated User)
router.post('/', authMiddleware, addIngredient);

// ➤ Get all ingredients
router.get('/', getAllIngredients);

// ➤ Add ingredient to a recipe
router.post('/recipe', authMiddleware, addIngredientToRecipe);

// ➤ Get ingredients of a recipe
router.get('/recipe/:id', getIngredientsByRecipe);

module.exports = router;



