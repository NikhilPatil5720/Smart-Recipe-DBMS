// const express = require('express');
// const router = express.Router();
// const { searchRecipes } = require('../controllers/searchController');

// // Search Route
// router.get('/', searchRecipes);

// module.exports = router;









const express = require('express');
const router = express.Router();
const { searchRecipes } = require('../controllers/searchController');

// ➤ Search recipes by keyword, ingredient, cuisine, dietary_type
// Example: /search?keyword=pasta&ingredient=cheese&cuisine=Italian
router.get('/', searchRecipes);

module.exports = router;
