const express = require('express');
const pool = require('../db');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(posts.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create post (admin only)
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await pool.query(
      "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, req.user.id]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete post (admin only)
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
