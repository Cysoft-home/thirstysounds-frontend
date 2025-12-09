// AudioDetail.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import AudioPlayer from '../components/AudioPlayer';
import { useAudioById } from '../hooks/useAudio';
import styles from './AudioDetail.module.css';

export default function AudioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Use the hook with limit parameter (default: 6 related audios)
  const { audio, loading, error, refetch } = useAudioById(id, 6);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Debug logging
  useEffect(() => {
    if (audio) {
      console.log('=== AUDIO DATA DEBUG ===');
      console.log('Full audio object:', audio);
      console.log('Audio URL:', audio.audio_url);
      console.log('Cover Image URL:', audio.cover_image_url);
      console.log('Related audios:', audio.related_audios);
      console.log('Related count:', audio.related_audios?.length || 0);
      console.log('=======================');
    }
  }, [audio]);

  const handleRelatedAudioClick = (audioId) => {
    navigate(`/audio/${audioId}`);
  };

  const handleBackClick = () => {
    navigate('/audio');
  };

  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return (
      <main
        className={darkMode ? `${styles.main} ${styles.mainDark}` : styles.main}
      >
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className={styles.container}>
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
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={darkMode ? `${styles.main} ${styles.mainDark}` : styles.main}
      >
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className={styles.container}>
          <div
            className={
              darkMode ? `${styles.error} ${styles.errorDark}` : styles.error
            }
          >
            <p>⚠️ {error}</p>
            <div className={styles.errorActions}>
              <button onClick={handleRetry} className={styles.retryButton}>
                Try Again
              </button>
              <button onClick={handleBackClick} className={styles.backButton}>
                Back to Audio List
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!audio) {
    return (
      <main
        className={darkMode ? `${styles.main} ${styles.mainDark}` : styles.main}
      >
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className={styles.container}>
          <div
            className={
              darkMode ? `${styles.error} ${styles.errorDark}` : styles.error
            }
          >
            <p>⚠️ Audio not found</p>
            <button onClick={handleBackClick} className={styles.backButton}>
              Back to Audio List
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Extract related audios from audio data
  const relatedAudios = audio.related_audios || [];

  return (
    <main
      className={darkMode ? `${styles.main} ${styles.mainDark}` : styles.main}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className={styles.container}>
        {/* Header with back button */}
        <div className={styles.header}>
          <button onClick={handleBackClick} className={styles.backLink}>
            ← Back to Audio List
          </button>
          <h1 className={styles.pageTitle}>Audio Details</h1>
        </div>

        {/* Main content grid */}
        <div className={styles.contentGrid}>
          {/* Left column: Audio info */}
          <div className={styles.leftColumn}>
            <div
              className={
                darkMode
                  ? `${styles.audioInfo} ${styles.audioInfoDark}`
                  : styles.audioInfo
              }
            >
              {/* Cover Image */}
              <div className={styles.imageContainer}>
                {audio.cover_image_url || audio.thumbnail_url ? (
                  <img
                    src={audio.cover_image_url || audio.thumbnail_url}
                    alt={audio.title}
                    className={styles.coverImage}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderText}>No Image</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className={styles.details}>
                <h2
                  className={
                    darkMode
                      ? `${styles.title} ${styles.titleDark}`
                      : styles.title
                  }
                >
                  {audio.title}
                </h2>

                {/* Category */}
                {audio.category && (
                  <div className={styles.categorySection}>
                    <span className={styles.sectionLabel}>Category:</span>
                    <span
                      className={
                        darkMode
                          ? `${styles.category} ${styles.categoryDark}`
                          : styles.category
                      }
                    >
                      {audio.category.name || audio.category}
                    </span>
                  </div>
                )}

                {/* Tags */}
                {audio.tags && audio.tags.length > 0 && (
                  <div className={styles.tagsSection}>
                    <span className={styles.sectionLabel}>Tags:</span>
                    <div className={styles.tagsContainer}>
                      {audio.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={
                            darkMode
                              ? `${styles.tag} ${styles.tagDark}`
                              : styles.tag
                          }
                        >
                          {tag.name || tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className={styles.metadata}>
                  {audio.duration_formatted && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Duration:</span>
                      <span className={styles.metaValue}>
                        {audio.duration_formatted}
                      </span>
                    </div>
                  )}

                  {audio.file_size_formatted && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>File Size:</span>
                      <span className={styles.metaValue}>
                        {audio.file_size_formatted}
                      </span>
                    </div>
                  )}

                  {audio.created_at && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Published:</span>
                      <span className={styles.metaValue}>
                        {new Date(audio.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {audio.is_featured && (
                    <div className={styles.metaItem}>
                      <span
                        className={`${styles.metaValue} ${styles.featured}`}
                      >
                        ⭐ Featured Audio
                      </span>
                    </div>
                  )}
                </div>

                {/* Description (if available) */}
                {audio.description && (
                  <div className={styles.descriptionSection}>
                    <span className={styles.sectionLabel}>Description:</span>
                    <p className={styles.description}>{audio.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Audio Player */}
            {audio.audio_url && (
              <div className={styles.playerSection}>
                <h3
                  className={
                    darkMode
                      ? `${styles.playerTitle} ${styles.playerTitleDark}`
                      : styles.playerTitle
                  }
                >
                  Listen Now
                </h3>
                <AudioPlayer
                  audioUrl={audio.audio_url}
                  title={audio.title}
                  darkMode={darkMode}
                />
              </div>
            )}
          </div>

          {/* Right column: Related audios */}
          {relatedAudios.length > 0 && (
            <div className={styles.rightColumn}>
              <div
                className={
                  darkMode
                    ? `${styles.relatedSection} ${styles.relatedSectionDark}`
                    : styles.relatedSection
                }
              >
                <h3
                  className={
                    darkMode
                      ? `${styles.relatedTitle} ${styles.relatedTitleDark}`
                      : styles.relatedTitle
                  }
                >
                  Related Audios ({relatedAudios.length})
                </h3>

                <div className={styles.relatedList}>
                  {relatedAudios.map((relatedAudio) => (
                    <div
                      key={relatedAudio.id}
                      className={
                        darkMode
                          ? `${styles.relatedItem} ${styles.relatedItemDark}`
                          : styles.relatedItem
                      }
                      onClick={() => handleRelatedAudioClick(relatedAudio.id)}
                    >
                      {relatedAudio.thumbnail_url && (
                        <div className={styles.relatedImage}>
                          <img
                            src={relatedAudio.thumbnail_url}
                            alt={relatedAudio.title}
                          />
                        </div>
                      )}

                      <div className={styles.relatedContent}>
                        <h4 className={styles.relatedAudioTitle}>
                          {relatedAudio.title}
                        </h4>

                        {relatedAudio.category_name && (
                          <span className={styles.relatedCategory}>
                            {relatedAudio.category_name}
                          </span>
                        )}

                        {relatedAudio.duration_formatted && (
                          <span className={styles.relatedDuration}>
                            {relatedAudio.duration_formatted}
                          </span>
                        )}

                        <span className={styles.clickHint}>
                          Click to listen →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile view: Related audios below */}
        {relatedAudios.length > 0 && (
          <div className={styles.mobileRelatedSection}>
            <h3
              className={
                darkMode
                  ? `${styles.relatedTitle} ${styles.relatedTitleDark}`
                  : styles.relatedTitle
              }
            >
              Related Audios
            </h3>

            <div className={styles.relatedGrid}>
              {relatedAudios.map((relatedAudio) => (
                <div
                  key={relatedAudio.id}
                  className={
                    darkMode
                      ? `${styles.relatedCard} ${styles.relatedCardDark}`
                      : styles.relatedCard
                  }
                  onClick={() => handleRelatedAudioClick(relatedAudio.id)}
                >
                  {relatedAudio.thumbnail_url && (
                    <div className={styles.relatedCardImage}>
                      <img
                        src={relatedAudio.thumbnail_url}
                        alt={relatedAudio.title}
                      />
                    </div>
                  )}

                  <div className={styles.relatedCardContent}>
                    <h4 className={styles.relatedCardTitle}>
                      {relatedAudio.title}
                    </h4>

                    <div className={styles.relatedCardMeta}>
                      {relatedAudio.category_name && (
                        <span className={styles.relatedCardCategory}>
                          {relatedAudio.category_name}
                        </span>
                      )}

                      {relatedAudio.duration_formatted && (
                        <span className={styles.relatedCardDuration}>
                          {relatedAudio.duration_formatted}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Helper function to format duration (fallback if duration_formatted is not available)
function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
