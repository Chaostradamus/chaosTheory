const express = require('express');
const router = express.Router();
const { saveScore, getLeaderboard, getUserScores } = require('../controllers/scoreController');
const authenticateToken = require('../middleware/auth');

router.post('/save', authenticateToken, saveScore);
router.post('/guest-save', saveScore);
router.get('/leaderboard/:operation/:difficulty', getLeaderboard);
router.get('/user-scores', authenticateToken, getUserScores);

module.exports = router;