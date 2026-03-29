import { useState, useRef } from 'react';
import styles from './MiniAudioPlayer.module.css';

export default function MiniAudioPlayer({
  audioUrl,
  audioId,
  darkMode,
  onPlay,
  onPause,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAudioUrl = () => {
    if (!audioUrl) return null;

    // Cloudinary URLs are already complete, just return them
    if (audioUrl.startsWith('http://') || audioUrl.startsWith('https://')) {
      return audioUrl;
    }

    // If it's a relative URL (shouldn't happen with Cloudinary)
    if (audioUrl.startsWith('/media/') || audioUrl.startsWith('media/')) {
      return `http://localhost:8000${
        audioUrl.startsWith('/') ? '' : '/'
      }${audioUrl}`;
    }

    return audioUrl;
  };

  const finalAudioUrl = getAudioUrl();

  const togglePlay = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        // Call onPause when audio is paused
        if (onPause) {
          onPause();
        }
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        // Call onPlay when audio starts playing
        if (onPlay) {
          onPlay();
        }
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Call onPause when audio ends naturally
    if (onPause) {
      onPause();
    }
  };

  const handleError = (e) => {
    console.error('Audio loading error:', e);
    console.error('Audio URL:', finalAudioUrl);
    setIsLoading(false);
    setIsPlaying(false);
  };

  if (!finalAudioUrl) {
    return (
      <button className={styles.playButton} disabled>
        ❌
      </button>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={finalAudioUrl}
        onEnded={handleEnded}
        onError={handleError}
      />
      <button
        onClick={togglePlay}
        className={`${styles.playButton} ${
          darkMode ? styles.playButtonDark : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
      </button>
    </>
  );
}
