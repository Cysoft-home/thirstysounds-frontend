import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AudioCard from '../components/AudioCard';
import { useAudioList } from '../hooks/useAudio';
import styles from './Audio.module.css';

export default function Audio() {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useAudioList(page, 12);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
          Browse Audio
        </h1>

        <p
          className={
            darkMode
              ? `${styles.description} ${styles.descriptionDark}`
              : styles.description
          }
        >
          Discover our collection of premium audio content
        </p>

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p
              className={
                darkMode
                  ? `${styles.loadingText} ${styles.loadingTextDark}`
                  : styles.loadingText
              }
            >
              Loading audio...
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
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        )}

        {/* Audio Grid */}
        {!loading && !error && data && (
          <>
            {data.results && data.results.length > 0 ? (
              <>
                <div className={styles.audioGrid}>
                  {data.results.map((audio) => (
                    <AudioCard
                      key={audio.id}
                      audio={audio}
                      darkMode={darkMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {data.count > 12 && (
                  <div className={styles.pagination}>
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={!data.previous}
                      className={styles.paginationButton}
                    >
                      Previous
                    </button>
                    <span
                      className={
                        darkMode
                          ? `${styles.pageInfo} ${styles.pageInfoDark}`
                          : styles.pageInfo
                      }
                    >
                      Page {page}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={!data.next}
                      className={styles.paginationButton}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div
                className={
                  darkMode
                    ? `${styles.placeholder} ${styles.placeholderDark}`
                    : styles.placeholder
                }
              >
                <p
                  className={
                    darkMode
                      ? `${styles.placeholderText} ${styles.placeholderTextDark}`
                      : styles.placeholderText
                  }
                >
                  🎵 No audio content available yet
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
