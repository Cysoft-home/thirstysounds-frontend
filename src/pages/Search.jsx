import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import AudioCard from '../components/AudioCard';
import { useAudioSearch } from '../hooks/useAudio';
import { audioService } from '../services';
import styles from './Search.module.css';

export default function Search() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Use autocomplete hook for suggestions
  const { results: suggestions, loading: suggestionsLoading } =
    useAudioSearch(searchQuery);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Search using the main audio list with search parameter
      const response = await audioService.getAllAudios({ search: searchQuery });
      setSearchResults(response);
    } catch (err) {
      setError(err.message || 'Search failed');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    navigate(`/audio/${suggestion.id}`);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Clear search results when user starts typing again
    if (searchResults) {
      setSearchResults(null);
    }
  };

  return (
    <main
      className={darkMode ? `${styles.main} ${styles.mainDark}` : styles.main}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className={styles.container}>
        <h1
          className={
            darkMode ? `${styles.title} ${styles.titleDark}` : styles.title
          }
        >
          Search Audio
        </h1>

        <p
          className={
            darkMode
              ? `${styles.description} ${styles.descriptionDark}`
              : styles.description
          }
        >
          Find your favorite audio content
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for audio titles, categories, tags..."
              className={
                darkMode
                  ? `${styles.searchInput} ${styles.searchInputDark}`
                  : styles.searchInput
              }
            />
            <button
              type="submit"
              className={styles.searchButton}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? '🔍 Searching...' : '🔍 Search'}
            </button>
          </div>

          {/* Autocomplete Suggestions */}
          {searchQuery.length >= 2 &&
            suggestions.length > 0 &&
            !searchResults && (
              <div
                className={
                  darkMode
                    ? `${styles.suggestions} ${styles.suggestionsDark}`
                    : styles.suggestions
                }
              >
                <p className={styles.suggestionsTitle}>Suggestions:</p>
                {suggestions.slice(0, 5).map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={
                      darkMode
                        ? `${styles.suggestionItem} ${styles.suggestionItemDark}`
                        : styles.suggestionItem
                    }
                  >
                    <span className={styles.suggestionIcon}>🎵</span>
                    <span className={styles.suggestionText}>
                      {suggestion.title}
                    </span>
                    {suggestion.category && (
                      <span className={styles.suggestionCategory}>
                        in {suggestion.category.name || suggestion.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
        </form>

        {/* Search Results */}
        {isSearching && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p
              className={
                darkMode
                  ? `${styles.loadingText} ${styles.loadingTextDark}`
                  : styles.loadingText
              }
            >
              Searching...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={
              darkMode ? `${styles.error} ${styles.errorDark}` : styles.error
            }
          >
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Results Display */}
        {searchResults && !isSearching && (
          <div className={styles.resultsSection}>
            <h2
              className={
                darkMode
                  ? `${styles.resultsTitle} ${styles.resultsTitleDark}`
                  : styles.resultsTitle
              }
            >
              Search Results for "{searchQuery}"
            </h2>

            {searchResults.results && searchResults.results.length > 0 ? (
              <>
                <p
                  className={
                    darkMode
                      ? `${styles.resultsCount} ${styles.resultsCountDark}`
                      : styles.resultsCount
                  }
                >
                  Found {searchResults.count} result
                  {searchResults.count !== 1 ? 's' : ''}
                </p>

                <div className={styles.resultsGrid}>
                  {searchResults.results.map((audio) => (
                    <AudioCard
                      key={audio.id}
                      audio={audio}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div
                className={
                  darkMode
                    ? `${styles.noResults} ${styles.noResultsDark}`
                    : styles.noResults
                }
              >
                <p className={styles.noResultsIcon}>🔍</p>
                <p className={styles.noResultsText}>
                  No results found for "{searchQuery}"
                </p>
                <p className={styles.noResultsHint}>
                  Try different keywords or browse all audio
                </p>
                <button
                  onClick={() => navigate('/audio')}
                  className={styles.browseButton}
                >
                  Browse All Audio
                </button>
              </div>
            )}
          </div>
        )}

        {/* Default State - Search Features */}
        {!searchQuery && !searchResults && (
          <div className={styles.featuresGrid}>
            <div
              className={
                darkMode
                  ? `${styles.featureCard} ${styles.featureCardDark}`
                  : styles.featureCard
              }
            >
              <div className={styles.featureIcon}>⚡</div>
              <h3
                className={
                  darkMode
                    ? `${styles.featureTitle} ${styles.featureTitleDark}`
                    : styles.featureTitle
                }
              >
                Quick Search
              </h3>
              <p
                className={
                  darkMode
                    ? `${styles.featureDescription} ${styles.featureDescriptionDark}`
                    : styles.featureDescription
                }
              >
                Find audio content instantly with our fast search algorithm
              </p>
            </div>

            <div
              className={
                darkMode
                  ? `${styles.featureCard} ${styles.featureCardDark}`
                  : styles.featureCard
              }
            >
              <div className={styles.featureIcon}>🎯</div>
              <h3
                className={
                  darkMode
                    ? `${styles.featureTitle} ${styles.featureTitleDark}`
                    : styles.featureTitle
                }
              >
                Smart Filters
              </h3>
              <p
                className={
                  darkMode
                    ? `${styles.featureDescription} ${styles.featureDescriptionDark}`
                    : styles.featureDescription
                }
              >
                Search by title, category, tags, and more
              </p>
            </div>

            <div
              className={
                darkMode
                  ? `${styles.featureCard} ${styles.featureCardDark}`
                  : styles.featureCard
              }
            >
              <div className={styles.featureIcon}>💡</div>
              <h3
                className={
                  darkMode
                    ? `${styles.featureTitle} ${styles.featureTitleDark}`
                    : styles.featureTitle
                }
              >
                Autocomplete
              </h3>
              <p
                className={
                  darkMode
                    ? `${styles.featureDescription} ${styles.featureDescriptionDark}`
                    : styles.featureDescription
                }
              >
                Get smart suggestions as you type your search query
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
