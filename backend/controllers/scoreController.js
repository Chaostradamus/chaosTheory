const pool = require('../db');

const saveScore = async (req, res) => {
  const { operation, difficulty, score, guestName } = req.body;
  const userId = req.userId;

  if (!operation || !difficulty || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    if (userId) {
      // Logged in user
      await pool.query(
        'INSERT INTO scores (user_id, operation, difficulty, score) VALUES ($1, $2, $3, $4)',
        [userId, operation, difficulty, score]
      );
    } else if (guestName) {
      // Guest with a name
      await pool.query(
        'INSERT INTO scores (guest_name, operation, difficulty, score) VALUES ($1, $2, $3, $4)',
        [guestName, operation, difficulty, score]
      );
    } else {
      return res.status(400).json({ error: 'Either userId or guestName required' });
    }
    
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getLeaderboard = async (req, res) => {
  const { operation, difficulty } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
        COALESCE(u.username, s.guest_name) as name,
        s.score,
        s.created_at
      FROM scores s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.operation = $1 AND s.difficulty = $2
      ORDER BY s.score DESC
      LIMIT 10`,
      [operation, parseInt(difficulty)]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserScores = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      `SELECT operation, difficulty, score, created_at
       FROM scores
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { saveScore, getLeaderboard, getUserScores };