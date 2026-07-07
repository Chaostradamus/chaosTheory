const API_URL = 'http://localhost:5000/api';

// Helper for fetch requests
const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const options = {
    method,
    headers,
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

// Auth endpoints
export const register = (username, password) => {
  return apiRequest('/auth/register', 'POST', { username, password });
};

export const login = (username, password) => {
  return apiRequest('/auth/login', 'POST', { username, password });
};

// Score endpoints
export const saveScore = (operation, difficulty, score, token) => {
  return apiRequest('/scores/save', 'POST', { operation, difficulty, score }, token);
};

export const saveGuestScore = (operation, difficulty, score, guestName) => {
  return apiRequest('/scores/guest-save', 'POST', { operation, difficulty, score, guestName });
};

export const getLeaderboard = (operation, difficulty) => {
  return apiRequest(`/scores/leaderboard/${operation}/${difficulty}`);
};

export const getUserScores = (token) => {
  return apiRequest('/scores/user-scores', 'GET', null, token);
};

// Store token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};