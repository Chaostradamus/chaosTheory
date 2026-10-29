const pool = require('../db');

// Save score for logged-in user
const saveScore = async (req, res) => {
  const { operation, difficulty, score, duration = 60, correctCount, wrongCount, accuracy } = req.body;
  const userId = req.userId;

  if (!operation || !difficulty || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const finalCorrect = correctCount !== undefined ? correctCount : score;
  const finalWrong = wrongCount !== undefined ? wrongCount : 0;
  const finalAccuracy = accuracy !== undefined ? accuracy : 100.00;

  try {
    await pool.query(
      `INSERT INTO scores (user_id, operation, difficulty, score, duration, correct_count, wrong_count, accuracy) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, operation, difficulty, score, duration, finalCorrect, finalWrong, finalAccuracy]
    );
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Save score for guest user
const saveGuestScore = async (req, res) => {
  const { operation, difficulty, score, guestName, duration = 60, correctCount, wrongCount, accuracy } = req.body;

  if (!operation || !difficulty || score === undefined || !guestName) {
    return res.status(400).json({ error: 'Missing required guest fields' });
  }

  const finalCorrect = correctCount !== undefined ? correctCount : score;
  const finalWrong = wrongCount !== undefined ? wrongCount : 0;
  const finalAccuracy = accuracy !== undefined ? accuracy : 100.00;

  try {
    await pool.query(
      `INSERT INTO scores (guest_name, operation, difficulty, score, duration, correct_count, wrong_count, accuracy) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [guestName, operation, difficulty, score, duration, finalCorrect, finalWrong, finalAccuracy]
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

// Fetch raw user scores log
const getUserScores = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      `SELECT operation, difficulty, score, duration, correct_count, wrong_count, accuracy, created_at
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

// Fetch user performance metrics and history for Profile page
const getUserStats = async (req, res) => {
  const userId = req.userId;

  try {
    const historyResult = await pool.query(
      `SELECT operation, difficulty, duration, score, correct_count, wrong_count, accuracy, created_at
       FROM scores
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    const history = historyResult.rows;
    const totalGames = history.length;
    const highScore = totalGames > 0 ? Math.max(...history.map(g => g.score)) : 0;
    const avgScore = totalGames > 0 ? (history.reduce((sum, g) => sum + g.score, 0) / totalGames).toFixed(1) : 0;
    const avgAccuracy = totalGames > 0 ? (history.reduce((sum, g) => sum + Number(g.accuracy || 100), 0) / totalGames).toFixed(1) : 100;

    res.json({
      summary: {
        totalGames,
        highScore,
        avgScore: Number(avgScore),
        avgAccuracy: Number(avgAccuracy),
      },
      history,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { saveScore, saveGuestScore, getLeaderboard, getUserScores, getUserStats };