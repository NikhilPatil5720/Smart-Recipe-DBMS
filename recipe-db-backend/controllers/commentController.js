// const db = require('../models/db');

// // Add Comment
// exports.addComment = (req, res) => {
//     const user_id = req.userId;  // From auth middleware
//     const { recipe_id, comment_text } = req.body;

//     const query = `
//         INSERT INTO Comment (recipe_id, user_id, comment_text)
//         VALUES (?, ?, ?)
//     `;

//     db.query(query, [recipe_id, user_id, comment_text], (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.status(201).json({ message: 'Comment added successfully' });
//     });
// };

// // Get Comments by Recipe ID
// exports.getCommentsByRecipeId = (req, res) => {
//     const recipe_id = req.params.recipe_id;

//     const query = `
//         SELECT c.comment_text, c.created_at, u.username
//         FROM Comment c
//         JOIN User u ON c.user_id = u.user_id
//         WHERE c.recipe_id = ?
//         ORDER BY c.created_at DESC
//     `;

//     db.query(query, [recipe_id], (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.json(result);
//     });
// };




const db = require('../models/db');

// Add Comment
exports.addComment = (req, res) => {
    const user_id = req.userId;  // from auth middleware
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
// exports.getCommentsByRecipeId = (req, res) => {
//     const recipe_id = req.params.recipe_id;

//     const query = `
//         SELECT c.comment_text, c.created_at, u.username
//         FROM Comment c
//         JOIN User u ON c.user_id = u.user_id
//         WHERE c.recipe_id = ?
//         ORDER BY c.created_at DESC
//     `;

//     db.query(query, [recipe_id], (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.json(result);
//     });
// };


exports.getCommentsByRecipeId = (req, res) => {
    const recipe_id = req.params.recipe_id;

    const query = `
        SELECT c.comment_id, c.comment_text, c.created_at, c.user_id, u.username
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

// Edit Comment
exports.editComment = (req, res) => {
    const { id } = req.params;
    const { comment_text } = req.body;
    const user_id = req.userId;

    const query = `
        UPDATE Comment 
        SET comment_text = ? 
        WHERE comment_id = ? AND user_id = ?
    `;

    db.query(query, [comment_text, id, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Comment not found or unauthorized" });
        }
        return res.json({ message: "Comment updated successfully" });
    });
};

// Delete Comment
exports.deleteComment = (req, res) => {
    const { id } = req.params;
    const user_id = req.userId;

    const query = `
        DELETE FROM Comment 
        WHERE comment_id = ? AND user_id = ?
    `;

    db.query(query, [id, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Comment not found or unauthorized" });
        }
        return res.json({ message: "Comment deleted successfully" });
    });
};
