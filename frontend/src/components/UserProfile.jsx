import React, { useState, useEffect } from 'react';
import { getUserStats, getAuthToken } from '../services/api';

const UserProfile = ({ onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtering state
  const [selectedOperation, setSelectedOperation] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }
        const data = await getUserStats(token);
        setStats(data);
      } catch (err) {
        console.error('Error fetching profile stats:', err);
        setError('Failed to load user performance data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div style={modalStyles.overlay}><div style={modalStyles.content}>Loading performance stats...</div></div>;
  if (error) return <div style={modalStyles.overlay}><div style={modalStyles.content}>{error}</div></div>;

  const { history = [] } = stats || {};

  // Filter game history dynamically
  const filteredHistory = history.filter((game) => {
    const matchesOp = selectedOperation === 'ALL' || game.operation === selectedOperation;
    const matchesDiff = selectedDifficulty === 'ALL' || String(game.difficulty) === String(selectedDifficulty);
    return matchesOp && matchesDiff;
  });

  // Calculate filtered stats dynamically
  const totalGames = filteredHistory.length;
  const highScore = totalGames > 0 ? Math.max(...filteredHistory.map(g => g.score)) : 0;
  const avgScore = totalGames > 0 ? (filteredHistory.reduce((sum, g) => sum + g.score, 0) / totalGames).toFixed(1) : 0;
  const avgAccuracy = totalGames > 0 
    ? (filteredHistory.reduce((sum, g) => sum + Number(g.accuracy || 100), 0) / totalGames).toFixed(1) 
    : '100.0';

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <div style={modalStyles.header}>
          <h2>📊 Player Performance Profile</h2>
          <button style={modalStyles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Filters */}
        <div style={modalStyles.filterRow}>
          <div>
            <label>Operation: </label>
            <select value={selectedOperation} onChange={(e) => setSelectedOperation(e.target.value)}>
              <option value="ALL">All Operations</option>
              <option value="+">Addition (+)</option>
              <option value="-">Subtraction (-)</option>
              <option value="*">Multiplication (×)</option>
              <option value="/">Division (÷)</option>
            </select>
          </div>

          <div>
            <label>Difficulty: </label>
            <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
              <option value="ALL">All Difficulties</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={modalStyles.grid}>
          <div style={modalStyles.card}>
            <h3>Total Games</h3>
            <p>{totalGames}</p>
          </div>
          <div style={modalStyles.card}>
            <h3>High Score</h3>
            <p>{highScore}</p>
          </div>
          <div style={modalStyles.card}>
            <h3>Average Score</h3>
            <p>{avgScore}</p>
          </div>
          <div style={modalStyles.card}>
            <h3>Avg Accuracy</h3>
            <p>{avgAccuracy}%</p>
          </div>
        </div>

        {/* Recent Games Log */}
        <h3>Recent Game History</h3>
        <div style={modalStyles.tableWrapper}>
          <table style={modalStyles.table}>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Difficulty</th>
                <th>Score</th>
                <th>Correct / Wrong</th>
                <th>Accuracy</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No games played under these filters.</td></tr>
              ) : (
                filteredHistory.slice(0, 10).map((game, idx) => (
                  <tr key={idx}>
                    <td>{game.operation}</td>
                    <td>Level {game.difficulty}</td>
                    <td><strong>{game.score}</strong></td>
                    <td>{game.correct_count ?? '-'} / {game.wrong_count ?? '-'}</td>
                    <td>{game.accuracy ? `${Number(game.accuracy).toFixed(0)}%` : '100%'}</td>
                    <td>{new Date(game.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#1e1e2e',
    color: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    maxWidth: '650px',
    width: '90%',
    maxHeight: '85vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    paddingBottom: '12px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
  },
  filterRow: {
    display: 'flex',
    gap: '16px',
    margin: '16px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#2b2b3d',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  tableWrapper: {
    maxHeight: '200px',
    overflowY: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
};

export default UserProfile;