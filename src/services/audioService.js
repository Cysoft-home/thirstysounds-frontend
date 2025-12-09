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
   * Get all audios using ViewSet
   * @param {object} params - Query parameters (page, search, filters, etc.)
   * @returns {Promise} Audio list
   */
  getAllAudios: async (params = {}) => {
    try {
      const response = await api.get('/audio/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get single audio by ID with related audios
   * @param {number|string} id - Audio ID
   * @param {number} limit - Number of related audios to fetch (default: 6, max: 20)
   * @returns {Promise} Audio details with related audios
   */
  getAudioById: async (id, limit = 6) => {
    try {
      // Correct endpoint: /api/v1/audio/{id}/?limit=6
      const response = await api.get(`/audio/${id}/`, {
        params: { limit },
      });
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
   * Get category by slug
   * @param {string} slug - Category slug
   * @returns {Promise} Category details
   */
  getCategoryBySlug: async (slug) => {
    try {
      const response = await api.get(`/audio/categories/${slug}/`);
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
   * Advanced audio search with filters
   * @param {object} params - Search parameters (search, category__slug, tags__slug, etc.)
   * @returns {Promise} Search results
   */
  searchAudio: async (params = {}) => {
    try {
      const response = await api.get('/audio/list/', { params });
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
      const response = await api.post('/audio/admin/audio/', formData, {
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
      const response = await api.patch(`/audio/admin/audio/${id}/`, data);
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
      const response = await api.delete(`/audio/admin/audio/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get admin audio by ID
   * @param {number|string} id - Audio ID
   * @returns {Promise} Audio details
   */
  getAdminAudioById: async (id) => {
    try {
      const response = await api.get(`/audio/admin/audio/${id}/`);
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
      const response = await api.get('/audio/admin/audio/', { params });
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

  // ==================== ADVANCED ENDPOINTS ====================

  /**
   * Get audio with advanced related audios algorithm
   * @param {number|string} id - Audio ID
   * @param {number} limit - Number of related audios
   * @param {string} strategy - 'smart' or 'tags'
   * @returns {Promise} Audio details with advanced related audios
   */
  getAdvancedAudioById: async (id, limit = 6, strategy = 'smart') => {
    try {
      const response = await api.get(`/audio/${id}/advanced/`, {
        params: { limit, strategy },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get related audios by category
   * @param {string} categoryId - Category ID
   * @param {number} limit - Number of audios to return
   * @param {number} excludeId - Audio ID to exclude
   * @returns {Promise} Related audios
   */
  getRelatedByCategory: async (categoryId, limit = 6, excludeId = null) => {
    try {
      const params = {
        category__id: categoryId,
        page_size: limit,
        ordering: '-created_at',
      };

      if (excludeId) {
        params.exclude = excludeId;
      }

      const response = await api.get('/audio/list/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default audioService;
