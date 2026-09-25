const pool = require('../db');

// Save score for logged-in user
const saveScore = async (req, res) => {
  const { operation, difficulty, score, duration = 60 } = req.body;
  const userId = req.userId;

  if (!operation || !difficulty || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      'INSERT INTO scores (user_id, operation, difficulty, score, duration) VALUES ($1, $2, $3, $4, $5)',
      [userId, operation, difficulty, score, duration]
    );
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Save score for guest user
const saveGuestScore = async (req, res) => {
  const { operation, difficulty, score, guestName, duration = 60 } = req.body;

  if (!operation || !difficulty || score === undefined || !guestName) {
    return res.status(400).json({ error: 'Missing required guest fields' });
  }

  try {
    await pool.query(
      'INSERT INTO scores (guest_name, operation, difficulty, score, duration) VALUES ($1, $2, $3, $4, $5)',
      [guestName, operation, difficulty, score, duration]
    );
    res.status(201).json({ message: 'Guest score saved successfully' });
  } catch (error) {
    console.error('Error saving guest score:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get leaderboard filtered by operation, difficulty, and duration
const getLeaderboard = async (req, res) => {
  const { operation, difficulty } = req.params;
  const duration = req.query.duration || 60;

  try {
    const result = await pool.query(
      `SELECT 
        COALESCE(u.username, s.guest_name) as name,
        s.score,
        s.duration,
        s.created_at
      FROM scores s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.operation = $1 AND s.difficulty = $2 AND s.duration = $3
      ORDER BY s.score DESC
      LIMIT 10`,
      [operation, parseInt(difficulty), parseInt(duration)]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserScores = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      `SELECT operation, difficulty, score, duration, created_at
       FROM scores
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting user scores:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { saveScore, saveGuestScore, getLeaderboard, getUserScores };