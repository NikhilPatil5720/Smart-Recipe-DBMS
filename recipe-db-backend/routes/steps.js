// const express = require('express');
// const router = express.Router();
// const { addStep, getStepsByRecipeId } = require('../controllers/stepsController');

// // Routes
// router.post('/', addStep);
// router.get('/:recipe_id', getStepsByRecipeId);

// module.exports = router;











const express = require('express');
const router = express.Router();
const { addStep, getStepsByRecipeId } = require('../controllers/stepsController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Add a step to a recipe (Authenticated)
router.post('/', authMiddleware, addStep);

// ➤ Get all steps for a recipe
router.get('/:recipe_id', getStepsByRecipeId);

module.exports = router;
