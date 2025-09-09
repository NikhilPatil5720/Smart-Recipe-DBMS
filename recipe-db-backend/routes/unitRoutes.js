const express = require('express');
const router = express.Router();
const { getAllUnits } = require('../controllers/unitController');

// ➤ Get all units
router.get('/', getAllUnits);

// (Optional) Add new unit
// router.post('/', authMiddleware, addUnit);

module.exports = router;
