import { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer({ audioUrl, title, darkMode }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Handle audio URL
  const getAudioUrl = () => {
    if (!audioUrl) return null;

    // Cloudinary URLs are already complete
    if (audioUrl.startsWith('http://') || audioUrl.startsWith('https://')) {
      return audioUrl;
    }

    // If it's a relative URL
    if (audioUrl.startsWith('/media/') || audioUrl.startsWith('media/')) {
      return `http://localhost:8000${
        audioUrl.startsWith('/') ? '' : '/'
      }${audioUrl}`;
    }

    return audioUrl;
  };

  const finalAudioUrl = getAudioUrl();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleAudioError = (e) => {
    console.error('Audio loading error:', e);
    console.error('Attempted URL:', finalAudioUrl);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!finalAudioUrl) {
    return (
      <div
        className={
          darkMode ? `${styles.player} ${styles.playerDark}` : styles.player
        }
      >
        <div className={styles.errorMessage}>⚠️ Audio file not available</div>
      </div>
    );
  }

  return (
    <div
      className={
        darkMode ? `${styles.player} ${styles.playerDark}` : styles.player
      }
    >
      <audio
        ref={audioRef}
        src={finalAudioUrl}
        preload="metadata"
        onError={handleAudioError}
      />

      {/* Audio Title */}
      <div className={styles.titleContainer}>
        <h3
          className={
            darkMode ? `${styles.title} ${styles.titleDark}` : styles.title
          }
        >
          {title}
        </h3>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <span
          className={
            darkMode ? `${styles.time} ${styles.timeDark}` : styles.time
          }
        >
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className={styles.progressBar}
        />
        <span
          className={
            darkMode ? `${styles.time} ${styles.timeDark}` : styles.time
          }
        >
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className={styles.playButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Volume Control */}
        <div className={styles.volumeContainer}>
          <span className={styles.volumeIcon}>
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className={styles.volumeBar}
          />
        </div>
      </div>
    </div>
  );
}
