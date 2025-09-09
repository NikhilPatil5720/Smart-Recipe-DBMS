const express = require('express');
const router = express.Router();
const { getAllTags, addTagToRecipe } = require('../controllers/tagController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Get all tags
router.get('/', getAllTags);

// ➤ Add a tag to a recipe (Authenticated)
router.post('/recipe', authMiddleware, addTagToRecipe);

module.exports = router;
