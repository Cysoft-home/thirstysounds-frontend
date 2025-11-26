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
  const { audio, loading, error } = useAudioById(id);

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
      console.log('=======================');
    }
  }, [audio]);

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
            <button
              onClick={() => navigate('/audio')}
              className={styles.backButton}
            >
              Back to Audio List
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!audio) {
    return null;
  }

  return (
    <main
      className={darkMode ? `${styles.main} ${styles.mainDark}` : styles.main}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className={styles.container}>
        {/* Back Button */}
        <button onClick={() => navigate('/audio')} className={styles.backLink}>
          ← Back to Audio List
        </button>

        {/* Audio Info Section */}
        <div
          className={
            darkMode
              ? `${styles.audioInfo} ${styles.audioInfoDark}`
              : styles.audioInfo
          }
        >
          {/* Cover Image - Use cover_image_url */}
          {audio.cover_image_url && (
            <div className={styles.thumbnail}>
              <img src={audio.cover_image_url} alt={audio.title} />
            </div>
          )}

          {/* Details */}
          <div className={styles.details}>
            <h1
              className={
                darkMode ? `${styles.title} ${styles.titleDark}` : styles.title
              }
            >
              {audio.title}
            </h1>

            {audio.category && (
              <span
                className={
                  darkMode
                    ? `${styles.badge} ${styles.badgeDark}`
                    : styles.badge
                }
              >
                {audio.category.name || audio.category}
              </span>
            )}

            {audio.description && (
              <p
                className={
                  darkMode
                    ? `${styles.description} ${styles.descriptionDark}`
                    : styles.description
                }
              >
                {audio.description}
              </p>
            )}

            {/* Meta Information */}
            <div className={styles.meta}>
              {audio.created_at && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Published:</span>
                  <span
                    className={
                      darkMode
                        ? `${styles.metaValue} ${styles.metaValueDark}`
                        : styles.metaValue
                    }
                  >
                    {new Date(audio.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
              {audio.views !== undefined && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Views:</span>
                  <span
                    className={
                      darkMode
                        ? `${styles.metaValue} ${styles.metaValueDark}`
                        : styles.metaValue
                    }
                  >
                    {audio.views.toLocaleString()}
                  </span>
                </div>
              )}
              {audio.duration_seconds && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Duration:</span>
                  <span
                    className={
                      darkMode
                        ? `${styles.metaValue} ${styles.metaValueDark}`
                        : styles.metaValue
                    }
                  >
                    {formatDuration(audio.duration_seconds)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Audio Player - Use audio_url instead of audio_file */}
        {audio.audio_url && (
          <AudioPlayer
            audioUrl={audio.audio_url}
            title={audio.title}
            darkMode={darkMode}
          />
        )}
      </div>
    </main>
  );
}

// Helper function to format duration
function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
