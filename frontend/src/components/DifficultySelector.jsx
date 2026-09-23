import React from 'react';
import { getDifficultyBlurb } from '../utils/problemGenerator';

const MAX_LEVELS = {
  '+': 8,
  '-': 7,
  '×': 3,
  '÷': 3
};

const DifficultySelector = ({ operation, difficulty, onDifficultyChange, isDisabled }) => {
  const maxLevel = MAX_LEVELS[operation] || 1;
  const currentDifficulty = Math.min(difficulty, maxLevel);

  const options = Array.from({ length: maxLevel }, (_, index) => index + 1);

  const handleChange = (e) => {
    const selectedLevel = Number(e.target.value);
    onDifficultyChange(selectedLevel);
  };

  return (
    <div className="difficulty-selector" style={{ margin: '15px 0' }}>
      <label htmlFor="difficulty-select" className="selector-label" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Difficulty Level:
      </label>
      <select
        id="difficulty-select"
        value={currentDifficulty}
        onChange={handleChange}
        disabled={isDisabled}
        className="difficulty-dropdown"
        style={{ padding: '6px 12px', fontSize: '16px', borderRadius: '6px' }}
      >
        {options.map((level) => (
          <option key={level} value={level}>
            Level {level}
          </option>
        ))}
      </select>
      <p className="difficulty-blurb" style={{ marginTop: '6px', color: '#666', fontSize: '14px' }}>
        {getDifficultyBlurb(operation, currentDifficulty)}
      </p>
    </div>
  );
};

export default DifficultySelector;