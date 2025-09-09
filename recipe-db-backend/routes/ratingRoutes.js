const express = require('express');
const router = express.Router();
const { addRating, getRecipeRatings } = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Add or update rating for a recipe (Authenticated)
router.post('/', authMiddleware, addRating);

// ➤ Get rating info for a recipe
router.get('/:recipe_id', getRecipeRatings);

module.exports = router;
