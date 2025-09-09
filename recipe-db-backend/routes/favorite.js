
const express = require('express');
const router = express.Router();
const { addFavorite, getFavoritesByUserId , removeFavorite} = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/remove", authMiddleware, removeFavorite);  // ✅ This is needed

// ➤ Add a recipe to favorites (Authenticated user)
router.post('/:recipe_id', authMiddleware, addFavorite);

// ➤ Get all favorite recipes of the logged-in user
router.get('/', authMiddleware, (req, res, next) => {
    req.params.user_id = req.userId;  // Automatically get user_id from auth
    next();
}, getFavoritesByUserId);


module.exports = router;
