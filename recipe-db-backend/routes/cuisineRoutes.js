const express = require('express');
const router = express.Router();
const { getAllCuisines } = require('../controllers/cuisineController');
const authMiddleware = require('../middlewares/authMiddleware');

// ➤ Get all cuisines
router.get('/', getAllCuisines);

// (Optional) Add a new cuisine (Authenticated)
router.post('/', authMiddleware, (req, res, next) => {
    // You can implement an addCuisine controller if needed
    next();
});

module.exports = router;
