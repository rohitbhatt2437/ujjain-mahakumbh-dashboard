/**
 * API utility for making fetch requests with the correct base URL
 */

const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Make a fetch request to the API
 * @param {string} endpoint - The API endpoint (without the /api prefix)
 * @param {Object} options - Fetch options
 * @returns {Promise} - The fetch promise
 */
export const fetchApi = (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  return fetch(url, options);
};

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - The fetch promise
 */
export const loginUser = (email, password) => {
  return fetchApi('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - The fetch promise
 */
export const registerUser = (email, password) => {
  return fetchApi('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Upload a file
 * @param {FormData} formData - The form data with the file
 * @returns {Promise} - The fetch promise
 */
export const uploadFile = (formData) => {
  return fetchApi('/upload', {
    method: 'POST',
    body: formData,
  });
};