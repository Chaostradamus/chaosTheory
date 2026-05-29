import { getDifficultyBlurb } from '../utils/problemGenerator'

const DifficultySelector = ({ operation, difficulty, onDifficultyChange, isDisabled }) => {
  const levels = [1, 2, 3, 4, 5, 6, 7]

  return (
    <div style={{ 
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#fff3e0',
      borderRadius: '10px'
    }}>
      <label style={{ fontSize: '18px', marginRight: '10px' }}>
        Difficulty Level:
      </label>
      <select 
        value={difficulty}
        onChange={(e) => onDifficultyChange(parseInt(e.target.value))}
        disabled={isDisabled || operation !== '+'}
        style={{
          fontSize: '18px',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: (isDisabled || operation !== '+') ? 'not-allowed' : 'pointer',
          opacity: (isDisabled || operation !== '+') ? 0.6 : 1
        }}
      >
        {levels.map(level => (
          <option key={level} value={level}>Level {level}</option>
        ))}
      </select>
      <div style={{ 
        fontSize: '14px', 
        color: '#666', 
        marginTop: '10px',
        fontStyle: 'italic'
      }}>
        {getDifficultyBlurb(operation, difficulty)}
        {operation !== '+' && '⚠️ Difficulty levels currently only available for Addition'}
      </div>
    </div>
  )
}

export default DifficultySelector