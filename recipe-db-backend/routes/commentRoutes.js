// const express = require('express');
// const router = express.Router();
// const { addComment, getCommentsByRecipeId } = require('../controllers/commentController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // ➤ Add a comment to a recipe (Authenticated)
// router.post('/', authMiddleware, addComment);

// // ➤ Get all comments for a recipe
// router.get('/:recipe_id', getCommentsByRecipeId);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { addComment, getCommentsByRecipeId, editComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Add comment
router.post('/', authMiddleware, addComment);

// Edit comment
router.put('/:id', authMiddleware, editComment);

// Delete comment
router.delete('/:id', authMiddleware, deleteComment);

// Get comments by recipe
router.get('/:recipe_id', getCommentsByRecipeId);

module.exports = router;
