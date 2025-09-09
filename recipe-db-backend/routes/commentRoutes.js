const express = require('express');
const router = express.Router();
const { addComment, getCommentsByRecipeId } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Add a comment to a recipe (Authenticated)
router.post('/', authMiddleware, addComment);

// ➤ Get all comments for a recipe
router.get('/:recipe_id', getCommentsByRecipeId);

module.exports = router;
