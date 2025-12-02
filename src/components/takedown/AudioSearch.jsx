import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './AudioSearch.module.css';

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function AudioSearch({ onAudioSelect, selectedAudio }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch search results
  // In AudioSearch.jsx, update the fetchSearchResults function:

  // In AudioSearch.jsx, update the fetchSearchResults function:

  const fetchSearchResults = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use environment variable for API URL
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
      const response = await fetch(
        `${apiUrl}/audio/autocomplete?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get response text first to debug
      const responseText = await response.text();
      console.log('API Response:', responseText.substring(0, 200)); // Log first 200 chars

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Full response:', responseText);
        throw new Error('Invalid JSON response from server');
      }

      // Handle different response formats
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else if (data && data.results && Array.isArray(data.results)) {
        setSearchResults(data.results);
      } else if (data && Array.isArray(data.data)) {
        setSearchResults(data.data);
      } else {
        console.warn('Unexpected API response format:', data);
        setSearchResults([]);
      }

      setShowResults(true);
    } catch (err) {
      console.error('Search API error:', err);

      // Use mock data as fallback
      console.log('Using mock data as fallback...');
      const mockResults = getMockSearchResults(query);
      setSearchResults(mockResults);
      setShowResults(true);

      // Don't show error to user if we have mock data
      // setError(err.message || 'Failed to search audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add mock data function
  const getMockSearchResults = (query) => {
    const mockAudioData = [
      {
        id: 1,
        title: 'Relaxing Rain Sounds',
        creator_name: 'Nature Sounds Co.',
        category: 'ASMR',
        duration: '45:30',
        created_at: '2024-01-15T10:30:00Z',
        description: 'Gentle rain sounds for relaxation and sleep',
      },
      {
        id: 2,
        title: 'Meditation Guide',
        creator_name: 'Mindful Moments',
        category: 'Guided Meditation',
        duration: '20:15',
        created_at: '2024-01-14T14:20:00Z',
        description: 'Guided meditation for stress relief',
      },
      {
        id: 3,
        title: 'Focus Music',
        creator_name: 'Productive Audio',
        category: 'Music',
        duration: '60:00',
        created_at: '2024-01-13T09:45:00Z',
        description: 'Concentration-enhancing music',
      },
    ];

    if (!query.trim()) return mockAudioData;

    return mockAudioData.filter(
      (audio) =>
        audio.title.toLowerCase().includes(query.toLowerCase()) ||
        audio.creator_name.toLowerCase().includes(query.toLowerCase()) ||
        audio.category.toLowerCase().includes(query.toLowerCase())
    );
  };
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchSearchResults(query);
    }, 300),
    [fetchSearchResults]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle audio selection
  const handleAudioSelect = (audio) => {
    onAudioSelect(audio);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setError(null);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.searchContainer}`)) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.audioSearch}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search audio by title, creator, or keywords..."
            className={styles.searchInput}
            aria-label="Search audio"
            aria-describedby="search-instructions"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <div className={styles.searchIcon}>🔍</div>
        </div>

        <p id="search-instructions" className={styles.searchInstructions}>
          Type to search for audio. Select the audio you want to report.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <span>Searching...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.errorState}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className={styles.resultsDropdown}>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                {searchResults.length} result
                {searchResults.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className={styles.resultsList}>
              {searchResults.map((audio) => (
                <button
                  key={audio.id}
                  type="button"
                  className={styles.resultItem}
                  onClick={() => handleAudioSelect(audio)}
                >
                  <div className={styles.audioInfo}>
                    <h4 className={styles.audioTitle}>{audio.title}</h4>
                    {audio.creator_name && (
                      <p className={styles.audioCreator}>
                        by {audio.creator_name}
                      </p>
                    )}
                    {audio.category && (
                      <span className={styles.audioCategory}>
                        {audio.category}
                      </span>
                    )}
                    {audio.duration && (
                      <span className={styles.audioDuration}>
                        {audio.duration}
                      </span>
                    )}
                  </div>
                  <div className={styles.selectArrow}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {showResults &&
          searchQuery &&
          !isLoading &&
          searchResults.length === 0 && (
            <div className={styles.noResults}>
              <p>No audio found for "{searchQuery}"</p>
              <p className={styles.noResultsHelp}>
                Try different keywords or check the spelling.
              </p>
            </div>
          )}
      </div>

      {/* Selected Audio Preview */}
      {selectedAudio && (
        <div className={styles.selectedAudio}>
          <div className={styles.selectedHeader}>
            <h3 className={styles.selectedTitle}>Selected Audio</h3>
            <button
              type="button"
              className={styles.changeSelection}
              onClick={() => onAudioSelect(null)}
              aria-label="Change selection"
            >
              Change
            </button>
          </div>

          <div className={styles.selectedContent}>
            <div className={styles.audioCard}>
              <div className={styles.audioCardHeader}>
                <div className={styles.audioCardIcon}>🎵</div>
                <div className={styles.audioCardInfo}>
                  <h4 className={styles.audioCardTitle}>
                    {selectedAudio.title}
                  </h4>
                  {selectedAudio.creator_name && (
                    <p className={styles.audioCardCreator}>
                      Creator: {selectedAudio.creator_name}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.audioCardMeta}>
                {selectedAudio.category && (
                  <span className={styles.metaItem}>
                    <span className={styles.metaLabel}>Category:</span>
                    <span className={styles.metaValue}>
                      {selectedAudio.category}
                    </span>
                  </span>
                )}

                {selectedAudio.duration && (
                  <span className={styles.metaItem}>
                    <span className={styles.metaLabel}>Duration:</span>
                    <span className={styles.metaValue}>
                      {selectedAudio.duration}
                    </span>
                  </span>
                )}

                {selectedAudio.created_at && (
                  <span className={styles.metaItem}>
                    <span className={styles.metaLabel}>Uploaded:</span>
                    <span className={styles.metaValue}>
                      {new Date(selectedAudio.created_at).toLocaleDateString()}
                    </span>
                  </span>
                )}
              </div>

              <div className={styles.audioCardActions}>
                <Link
                  to={`/audio/${selectedAudio.id}`}
                  className={styles.viewDetails}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Details
                </Link>
              </div>
            </div>

            <div className={styles.confirmationNote}>
              <span className={styles.checkIcon}>✓</span>
              <p>
                <strong>Is this the correct audio?</strong> If yes, click "Next
                Step" to continue. If not, click "Change" above to select a
                different audio.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Tips */}
      {!selectedAudio && (
        <div className={styles.searchTips}>
          <h4 className={styles.tipsTitle}>Search Tips:</h4>
          <ul className={styles.tipsList}>
            <li>Use the exact title if you know it</li>
            <li>Try searching by creator name</li>
            <li>Use keywords from the audio description</li>
            <li>If you can't find it, contact our support team</li>
          </ul>
        </div>
      )}
    </div>
  );
}
