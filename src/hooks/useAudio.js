import { useState, useEffect } from 'react';
import { audioService } from '../services';

/**
 * Custom hook to fetch audio data
 * @param {number} page - Current page number
 * @param {number} pageSize - Items per page
 * @returns {object} Audio data, loading state, and error
 */
export const useAudioList = (page = 1, pageSize = 20) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await audioService.getAudioList(page, pageSize);
        setData(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch audio');
        console.error('Error fetching audio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, [page, pageSize]);

  return { data, loading, error };
};

/**
 * Custom hook to fetch single audio by ID
 * @param {number|string} id - Audio ID
 * @returns {object} Audio data, loading state, and error
 */
export const useAudioById = (id) => {
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAudio = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await audioService.getAudioById(id);
        setAudio(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch audio');
        console.error('Error fetching audio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, [id]);

  return { audio, loading, error };
};

/**
 * Custom hook for audio autocomplete search
 * @param {string} query - Search query
 * @returns {object} Search results, loading state, and error
 */
export const useAudioSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const searchAudio = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await audioService.autocomplete(query);
        setResults(response);
      } catch (err) {
        setError(err.message || 'Search failed');
        console.error('Error searching audio:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchAudio, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { results, loading, error };
};
