// Generates problems based on operation and difficulty
export const generateAdditionProblem = (difficulty) => {
  switch(difficulty) {
    case 1: {
      let num1 = Math.floor(Math.random() * 90) + 1
      let num2 = Math.floor(Math.random() * (100 - num1))
      return [num1, num2]
    }
    case 2: {
      return [
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100
      ]
    }
    case 3: {
      return [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    }
    case 4: {
      return [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    }
    case 5: {
      return [
        Math.floor(Math.random() * 90) + 10,
        Math.floor(Math.random() * 90) + 10,
        Math.floor(Math.random() * 90) + 10
      ]
    }
    case 6: {
      return [
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100
      ]
    }
    case 7: {
      return [
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100,
        Math.floor(Math.random() * 900) + 100
      ]
    }
    default: {
      return [Math.floor(Math.random() * 13), Math.floor(Math.random() * 13)]
    }
  }
}

export const generateBasicProblem = (operation) => {
  const num1 = Math.floor(Math.random() * 13)
  const num2 = Math.floor(Math.random() * 13)
  
  if (operation === '-') {
    // Ensure no negatives for basic subtraction
    return [Math.max(num1, num2), Math.min(num1, num2)]
  }
  return [num1, num2]
}

export const calculateAnswer = (addends, operation) => {
  if (operation !== '+') {
    const num1 = addends[0]
    const num2 = addends[1]
    switch(operation) {
      case '-': return num1 - num2
      case '×': return num1 * num2
      case '÷': return num2 !== 0 ? parseFloat((num1 / num2).toFixed(2)) : 0
      default: return num1 + num2
    }
  }
  return addends.reduce((sum, num) => sum + num, 0)
}

export const getProblemString = (addends, operation) => {
  const getSymbol = () => {
    switch(operation) {
      case '+': return '+'
      case '-': return '−'
      case '×': return '×'
      case '÷': return '÷'
      default: return '+'
    }
  }
  
  if (operation !== '+') {
    return `${addends[0]} ${getSymbol()} ${addends[1]} = ?`
  }
  
  let problem = ''
  for (let i = 0; i < addends.length; i++) {
    problem += addends[i]
    if (i < addends.length - 1) problem += ' + '
  }
  return `${problem} = ?`
}

export const getDifficultyBlurb = (operation, difficulty) => {
  if (operation !== '+') return 'Difficulty levels vary by operation'
  
  switch(difficulty) {
    case 1: return '📘 Level 1: Two numbers that add up to under 100'
    case 2: return '📙 Level 2: Two triple-digit numbers (100-999)'
    case 3: return '📗 Level 3: Three single-digit numbers (0-9 each)'
    case 4: return '📕 Level 4: Four single-digit numbers (0-9 each)'
    case 5: return '📔 Level 5: Three double-digit numbers (10-99 each)'
    case 6: return '📓 Level 6: Three triple-digit numbers (100-999 each)'
    case 7: return '📒 Level 7: Four triple-digit numbers (100-999 each)'
    default: return ''
  }
}