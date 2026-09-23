// Generates addition problems based on difficulty (Levels 1-8)
export const generateAdditionProblem = (difficulty) => {
  switch (difficulty) {
    case 1: {
      // Single digit + Single digit (NO CARRYING / sum < 10)
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * (10 - num1));
      return [num1, num2];
    }
    case 2: {
      // Single digit + Single digit (WITH CARRYING / sum >= 10)
      const num1 = Math.floor(Math.random() * 9) + 1;
      const minNum2 = 10 - num1;
      const num2 = Math.floor(Math.random() * (10 - minNum2)) + minNum2;
      return [num1, num2];
    }
    case 3: {
      // 1 Single-digit + 1 Double-digit
      const singleDigit = Math.floor(Math.random() * 9) + 1;
      const doubleDigit = Math.floor(Math.random() * 90) + 10;
      return Math.random() < 0.5 ? [singleDigit, doubleDigit] : [doubleDigit, singleDigit];
    }
    case 4: {
      // 2 Double-digit addends (10-99)
      return [
        Math.floor(Math.random() * 90) + 10,
        Math.floor(Math.random() * 90) + 10
      ];
    }
    case 5: {
      // 3 Double-digit addends (10-99)
      return [
        Math.floor(Math.random() * 90) + 10,
        Math.floor(Math.random() * 90) + 10,
        Math.floor(Math.random() * 90) + 10
      ];
    }
    case 6: {
      // 2 Triple-digit addends (100-999)
      return [
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100
      ];
    }
    case 7: {
      // 3 Triple-digit addends (100-999)
      return [
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100
      ];
    }
    case 8: {
      // 4 Triple-digit addends (100-999)
      return [
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100
      ];
    }
    default: {
      return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
  }
};

// Generates subtraction problems based on difficulty (Levels 1-7)
export const generateSubtractionProblem = (difficulty) => {
  switch (difficulty) {
    case 1: {
      // Single digit minus single digit (No Borrowing)
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * (num1 + 1));
      return [num1, num2];
    }
    case 2: {
      // Teen numbers minus single digit (Requires Borrowing)
      const num1 = Math.floor(Math.random() * 9) + 10;
      const minSubtrahend = (num1 % 10) + 1;
      const num2 = Math.floor(Math.random() * (10 - minSubtrahend)) + minSubtrahend;
      return [num1, num2];
    }
    case 3: {
      // Double digit minus double digit (No Borrowing)
      const tens1 = Math.floor(Math.random() * 8) + 2;
      const tens2 = Math.floor(Math.random() * tens1) + 1;
      const ones1 = Math.floor(Math.random() * 10);
      const ones2 = Math.floor(Math.random() * (ones1 + 1));
      
      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      return [num1, num2];
    }
    case 4: {
      // Double digit minus double digit (With Borrowing)
      const tens1 = Math.floor(Math.random() * 7) + 3;
      const tens2 = Math.floor(Math.random() * (tens1 - 1)) + 1;
      const ones1 = Math.floor(Math.random() * 9);
      const ones2 = Math.floor(Math.random() * (9 - ones1)) + ones1 + 1;
      
      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      return [num1, num2];
    }
    case 5: {
      // 3-digit minus 3-digit (Standard)
      const num1 = Math.floor(Math.random() * 800) + 200;
      const num2 = Math.floor(Math.random() * (num1 - 100)) + 100;
      return [num1, num2];
    }
    case 6: {
      // Subtraction Across Zeros
      const hundreds = (Math.floor(Math.random() * 9) + 1) * 100;
      const usesMiddleZero = Math.random() < 0.5;
      
      let num1;
      if (usesMiddleZero) {
        const ones = Math.floor(Math.random() * 9) + 1;
        num1 = hundreds + ones;
      } else {
        num1 = hundreds;
      }
      
      const num2 = Math.floor(Math.random() * (num1 - 100)) + 50;
      return [num1, num2];
    }
    case 7: {
      // 6-digit subtraction
      const num1 = Math.floor(Math.random() * 899999) + 100000;
      const num2 = Math.floor(Math.random() * (num1 - 100000)) + 100000;
      return [num1, num2];
    }
    default: {
      const n1 = Math.floor(Math.random() * 13);
      const n2 = Math.floor(Math.random() * 13);
      return [Math.max(n1, n2), Math.min(n1, n2)];
    }
  }
};

// Generates multiplication problems based on difficulty (Levels 1-3)
export const generateMultiplicationProblem = (difficulty) => {
  switch (difficulty) {
    case 1: {
      // Level 1: Single digit x Single digit (0 to 12)
      const num1 = Math.floor(Math.random() * 13);
      const num2 = Math.floor(Math.random() * 13);
      return [num1, num2];
    }
    case 2: {
      // Level 2: Single digit x Double digit
      const singleDigit = Math.floor(Math.random() * 8) + 2; // 2-9
      const doubleDigit = Math.floor(Math.random() * 90) + 10; // 10-99
      return Math.random() < 0.5 ? [singleDigit, doubleDigit] : [doubleDigit, singleDigit];
    }
    case 3: {
      // Level 3: Double digit x Double digit
      const num1 = Math.floor(Math.random() * 90) + 10;
      const num2 = Math.floor(Math.random() * 90) + 10;
      return [num1, num2];
    }
    default: {
      return [Math.floor(Math.random() * 13), Math.floor(Math.random() * 13)];
    }
  }
};

// Generates division problems based on difficulty (Levels 1-3)
export const generateDivisionProblem = (difficulty) => {
  switch (difficulty) {
    case 1: {
      // Level 1: Times tables division up to 12s (No remainders)
      const divisor = Math.floor(Math.random() * 12) + 1; // 1 to 12
      const quotient = Math.floor(Math.random() * 13); // 0 to 12
      const dividend = divisor * quotient;
      return [dividend, divisor];
    }
    case 2: {
      // Level 2: 3-digit dividend divided by 1-digit divisor (No remainders)
      const divisor = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const quotient = Math.floor(Math.random() * 400) + 50; // Ensures 3-digit dividend
      const dividend = divisor * quotient;
      return [dividend, divisor];
    }
    case 3: {
      // Level 3: 3 to 5 digit dividend divided by 2-digit divisor (No remainders)
      const divisor = Math.floor(Math.random() * 90) + 10; // 10 to 99
      const quotient = Math.floor(Math.random() * 900) + 10; // 10 to 909
      const dividend = divisor * quotient;
      return [dividend, divisor];
    }
    default: {
      const divisor = Math.floor(Math.random() * 12) + 1;
      const quotient = Math.floor(Math.random() * 13);
      return [divisor * quotient, divisor];
    }
  }
};

// Main routing function for problem generation
export const generateBasicProblem = (operation, difficulty = 1) => {
  switch (operation) {
    case '+': return generateAdditionProblem(difficulty);
    case '-': return generateSubtractionProblem(difficulty);
    case '×': return generateMultiplicationProblem(difficulty);
    case '÷': return generateDivisionProblem(difficulty);
    default: return generateAdditionProblem(difficulty);
  }
};

export const calculateAnswer = (addends, operation) => {
  if (operation === '+') {
    return addends.reduce((sum, num) => sum + num, 0);
  }
  
  const num1 = addends[0];
  const num2 = addends[1];
  switch (operation) {
    case '-': return num1 - num2;
    case '×': return num1 * num2;
    case '÷': return num2 !== 0 ? num1 / num2 : 0;
    default: return num1 + num2;
  }
};

export const getProblemString = (addends, operation) => {
  const getSymbol = () => {
    switch (operation) {
      case '+': return '+';
      case '-': return '−';
      case '×': return '×';
      case '÷': return '÷';
      default: return '+';
    }
  };

  if (operation !== '+') {
    return `${addends[0]} ${getSymbol()} ${addends[1]} = ?`;
  }

  let problem = '';
  for (let i = 0; i < addends.length; i++) {
    problem += addends[i];
    if (i < addends.length - 1) problem += ' + ';
  }
  return `${problem} = ?`;
};

export const getDifficultyBlurb = (operation, difficulty) => {
  if (operation === '+') {
    switch (difficulty) {
      case 1: return '📘 Level 1: Single digits (no carrying, sum under 10)';
      case 2: return '📙 Level 2: Single digits (with carrying, sum 10+)';
      case 3: return '📗 Level 3: One single-digit + one double-digit number';
      case 4: return '📕 Level 4: Two double-digit numbers (10–99)';
      case 5: return '📔 Level 5: Three double-digit numbers (10–99)';
      case 6: return '📓 Level 6: Two triple-digit numbers (100–999)';
      case 7: return '📒 Level 7: Three triple-digit numbers (100–999)';
      case 8: return '📕 Level 8: Four triple-digit numbers (100–999)';
      default: return '';
    }
  }

  if (operation === '-') {
    switch (difficulty) {
      case 1: return '📘 Level 1: Single digits (no borrowing)';
      case 2: return '📙 Level 2: Teen numbers minus single digits (with borrowing)';
      case 3: return '📗 Level 3: Double digits (no borrowing)';
      case 4: return '📕 Level 4: Double digits (with borrowing)';
      case 5: return '📔 Level 5: Triple digits standard';
      case 6: return '📓 Level 6: Subtraction across zeros (e.g. 500 - 237)';
      case 7: return '📒 Level 7: 6-digit multi-digit subtraction';
      default: return '';
    }
  }

  if (operation === '×') {
    switch (difficulty) {
      case 1: return '📘 Level 1: Single digit × single digit (0–12 times tables)';
      case 2: return '📙 Level 2: Single digit × double digit';
      case 3: return '📗 Level 3: Double digit × double digit';
      default: return '';
    }
  }

  if (operation === '÷') {
    switch (difficulty) {
      case 1: return '📘 Level 1: Basic division facts up to 12s';
      case 2: return '📙 Level 2: 3-digit ÷ 1-digit (exact whole numbers)';
      case 3: return '📗 Level 3: Multi-digit ÷ 2-digit (exact whole numbers)';
      default: return '';
    }
  }

  return 'Difficulty levels vary by operation';
};