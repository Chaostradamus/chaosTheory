import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = ({ operation, difficulty }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getLeaderboard(operation, difficulty);
        setScores(data);
      } catch (err) {
        console.error('Leaderboard error:', err);
        setError('Failed to load leaderboard. Make sure backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [operation, difficulty]);

  const getOperationDisplay = () => {
    const symbols = { '+': '+', '-': '−', '×': '×', '÷': '÷' };
    return symbols[operation] || operation;
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', textAlign: 'center' }}>
        🏆 Top Scores - {getOperationDisplay()} Level {difficulty}
      </h3>
      
      {loading && (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          Loading...
        </div>
      )}
      
      {error && (
        <div style={{ textAlign: 'center', color: 'red', padding: '20px', fontSize: '14px' }}>
          {error}
        </div>
      )}
      
      {!loading && !error && scores.length === 0 && (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No scores yet. Be the first! 🎯
        </div>
      )}
      
      {!loading && !error && scores.length > 0 && (
        <div>
          {scores.map((score, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                marginBottom: '4px',
                backgroundColor: index === 0 ? '#fff3e0' : 'white',
                borderRadius: '6px',
                borderLeft: index === 0 ? '4px solid #ff9800' : 'none',
                fontWeight: index === 0 ? 'bold' : 'normal',
              }}
            >
              <span>
                {index + 1}. {score.name || 'Anonymous'}
              </span>
              <span style={{ color: '#2196F3', fontWeight: 'bold' }}>
                {score.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leaderboard