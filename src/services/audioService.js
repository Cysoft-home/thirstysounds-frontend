// services/audioService.js
import api from './api';

const audioService = {
  /**
   * Get paginated list of audio files (public)
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise} Paginated audio list
   */
  getAudioList: async (page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/audio/list/', {
        params: { page, page_size: pageSize },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get all audios using ViewSet (with full CRUD)
   * @param {object} params - Query parameters (page, search, filters, etc.)
   * @returns {Promise} Audio list
   */
  getAllAudios: async (params = {}) => {
    try {
      const response = await api.get('/audio/audios/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get featured audio files
   * @param {number} pageSize - Number of featured items to return
   * @returns {Promise} Featured audio list
   */
  getFeaturedAudio: async (pageSize = 50) => {
    try {
      const response = await api.get('/audio/featured/', {
        params: { page_size: pageSize },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get single audio by ID
   * @param {number|string} id - Audio ID
   * @returns {Promise} Audio details
   */
  getAudioById: async (id) => {
    try {
      const response = await api.get(`/audio/audios/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Search audio with autocomplete
   * @param {string} query - Search query
   * @returns {Promise} Autocomplete suggestions
   */
  autocomplete: async (query) => {
    try {
      const response = await api.get('/audio/autocomplete/', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get all categories
   * @returns {Promise} Categories list
   */
  getCategories: async () => {
    try {
      const response = await api.get('/audio/categories/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get category by ID
   * @param {number|string} id - Category ID
   * @returns {Promise} Category details
   */
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/audio/categories/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Upload new audio (requires authentication)
   * @param {FormData} formData - Audio file and metadata
   * @returns {Promise} Created audio object
   */
  uploadAudio: async (formData) => {
    try {
      const response = await api.post('/audio/audios/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update audio (requires authentication)
   * @param {number|string} id - Audio ID
   * @param {object} data - Updated audio data
   * @returns {Promise} Updated audio object
   */
  updateAudio: async (id, data) => {
    try {
      const response = await api.patch(`/audio/audios/${id}/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete audio (requires authentication)
   * @param {number|string} id - Audio ID
   * @returns {Promise} Deletion confirmation
   */
  deleteAudio: async (id) => {
    try {
      const response = await api.delete(`/audio/audios/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ==================== ADMIN ENDPOINTS ====================

  /**
   * Get admin audio list (requires admin authentication)
   * @param {object} params - Query parameters
   * @returns {Promise} Admin audio list
   */
  getAdminAudioList: async (params = {}) => {
    try {
      const response = await api.get('/audio/admin/audios/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get admin takedown requests list (requires admin authentication)
   * @param {object} params - Query parameters
   * @returns {Promise} Takedown requests list
   */
  getAdminTakedowns: async (params = {}) => {
    try {
      const response = await api.get('/audio/admin/takedowns/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ==================== TAKEDOWN ====================

  /**
   * Submit a takedown request
   * @param {object} data - Takedown request data
   * @returns {Promise} Created takedown request
   */
  submitTakedown: async (data) => {
    try {
      const response = await api.post('/audio/takedown/submit/', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Export as a named export (for import { audioService } from '../services/audioService')
export default audioService;
