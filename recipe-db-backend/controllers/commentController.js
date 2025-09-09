const db = require('../models/db');

// Add Comment
exports.addComment = (req, res) => {
    const user_id = req.userId;  // From auth middleware
    const { recipe_id, comment_text } = req.body;

    const query = `
        INSERT INTO Comment (recipe_id, user_id, comment_text)
        VALUES (?, ?, ?)
    `;

    db.query(query, [recipe_id, user_id, comment_text], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ message: 'Comment added successfully' });
    });
};

// Get Comments by Recipe ID
exports.getCommentsByRecipeId = (req, res) => {
    const recipe_id = req.params.recipe_id;

    const query = `
        SELECT c.comment_text, c.created_at, u.username
        FROM Comment c
        JOIN User u ON c.user_id = u.user_id
        WHERE c.recipe_id = ?
        ORDER BY c.created_at DESC
    `;

    db.query(query, [recipe_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
};
