import { Link, useNavigate } from 'react-router-dom';
import MiniAudioPlayer from './MiniAudioPlayer';
import { trackAudioPlay, trackAudioPause, trackDownload } from '../App';
import styles from './AudioCard.module.css';

export default function AudioCard({ audio, darkMode }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/audio/${audio.id}`);
  };

  const handlePlay = () => {
    trackAudioPlay(audio.id, audio.title);
  };

  const handlePause = () => {
    trackAudioPause(audio.id, audio.title);
  };

  const handleDownload = () => {
    trackDownload(audio.id, audio.title);
    // Trigger actual download
    if (audio.audio_url) {
      const link = document.createElement('a');
      link.href = audio.audio_url;
      link.download = `${audio.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className={darkMode ? `${styles.card} ${styles.cardDark}` : styles.card}
    >
      {/* Thumbnail - Use thumbnail_url instead of thumbnail */}
      {audio.thumbnail_url && (
        <div className={styles.thumbnail}>
          <img src={audio.thumbnail_url} alt={audio.title} />
          {/* Overlay Play Button - Use audio_url instead of audio_file */}
          <div className={styles.thumbnailOverlay}>
            <MiniAudioPlayer
              audioUrl={audio.audio_url}
              audioId={audio.id}
              darkMode={darkMode}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        <h3
          className={
            darkMode ? `${styles.title} ${styles.titleDark}` : styles.title
          }
        >
          {audio.title}
        </h3>

        {audio.description && (
          <p
            className={
              darkMode
                ? `${styles.description} ${styles.descriptionDark}`
                : styles.description
            }
          >
            {audio.description.substring(0, 100)}
            {audio.description.length > 100 && '...'}
          </p>
        )}

        {/* Meta Information */}
        <div className={styles.meta}>
          {audio.category && (
            <span
              className={
                darkMode ? `${styles.badge} ${styles.badgeDark}` : styles.badge
              }
            >
              {audio.category.name || audio.category}
            </span>
          )}

          {audio.duration_seconds && (
            <span
              className={
                darkMode
                  ? `${styles.duration} ${styles.durationDark}`
                  : styles.duration
              }
            >
              {formatDuration(audio.duration_seconds)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={handleViewDetails} className={styles.button}>
            View Details
          </button>
          {audio.audio_url && (
            <button onClick={handleDownload} className={styles.downloadButton}>
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to format duration
function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
