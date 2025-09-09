



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./models/db');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Test DB connection
// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Database connected successfully');
//         connection.release();
//     }
// });

// app.get('/', (req, res) => {
//     res.send('Smart Recipe DB Backend is running');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });












const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db');
const recipeRoutes = require('./routes/recipe');
const ingredientRoutes = require('./routes/ingredient');
const stepRoutes = require('./routes/steps');
const favoriteRoutes = require('./routes/favorite');
const searchRoutes = require('./routes/search');

const authRoutes = require('./routes/auth');
const cuisineRoutes = require('./routes/cuisineRoutes');
const unitRoutes = require('./routes/unitRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully');
        connection.release();
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cuisines', cuisineRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);



app.get('/', (req, res) => {
    res.send('Smart Recipe DB Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
