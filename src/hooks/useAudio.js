// hooks/useAudio.js
import { useState, useEffect, useCallback } from 'react';
import audioService from '../services/audioService';

/**
 * Custom hook to fetch audio data with refetch capability
 */
export const useAudioList = (page = 1, pageSize = 20) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAudio = useCallback(async () => {
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
  }, [page, pageSize]);

  useEffect(() => {
    fetchAudio();
  }, [fetchAudio]);

  const refetch = useCallback(() => {
    fetchAudio();
  }, [fetchAudio]);

  return { data, loading, error, refetch };
};

/**
 * Custom hook specifically for featured audio
 */
export const useFeaturedAudio = (pageSize = 50) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedAudio = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await audioService.getFeaturedAudio(pageSize);
      setData(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch featured audio');
      console.error('Error fetching featured audio:', err);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchFeaturedAudio();
  }, [fetchFeaturedAudio]);

  const refetch = useCallback(() => {
    fetchFeaturedAudio();
  }, [fetchFeaturedAudio]);

  return { data, loading, error, refetch };
};

/**
 * Custom hook to fetch single audio by ID
 */
export const useAudioById = (id) => {
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAudio = useCallback(async () => {
    if (!id) return;

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
  }, [id]);

  useEffect(() => {
    fetchAudio();
  }, [fetchAudio]);

  const refetch = useCallback(() => {
    fetchAudio();
  }, [fetchAudio]);

  return { audio, loading, error, refetch };
};

/**
 * Custom hook for audio autocomplete search
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
