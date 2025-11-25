import api from './api';

const authService = {
  /**
   * Login user and store tokens
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Promise} User data and tokens
   */
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Refresh access token
   * @returns {Promise} New access token
   */
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/token/refresh/', {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem('access_token', access);

      return response.data;
    } catch (error) {
      // Clear tokens if refresh fails
      authService.logout();
      throw error.response?.data || error.message;
    }
  },

  /**
   * Logout user and clear tokens
   */
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  /**
   * Get current access token
   * @returns {string|null} Access token
   */
  getAccessToken: () => {
    return localStorage.getItem('access_token');
  },

  /**
   * Get current refresh token
   * @returns {string|null} Refresh token
   */
  getRefreshToken: () => {
    return localStorage.getItem('refresh_token');
  },
};

export default authService;
