// components/ui/FeaturedCarousel.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './FeaturedCarousel.module.css';

/**
 * FeaturedCarousel Component
 * An accessible, responsive carousel for displaying featured audio items.
 * Supports auto-play, keyboard navigation, touch swiping, and dark mode.
 */

const FeaturedCarousel = ({
  items = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  darkMode = false,
  loading = false,
  error = null,
  onItemClick,
  onSlideChange,
  className = '',
}) => {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Refs
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Current item
  const currentItem = items[currentIndex] || null;

  // Format duration helper
  const formatDuration = useCallback((seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Format file size helper
  const formatFileSize = useCallback((bytes) => {
    if (!bytes) return '0 MB';
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }, []);

  // Get category name
  const getCategoryName = useCallback((category) => {
    if (!category) return null;
    if (typeof category === 'string') return category;
    if (category?.name) return category.name;
    return null;
  }, []);

  // Get tag name
  const getTagName = useCallback((tag) => {
    if (!tag) return '';
    if (typeof tag === 'string') return tag;
    if (tag?.name) return tag.name;
    return String(tag);
  }, []);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (items.length === 0) return;

    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);

    if (onSlideChange) {
      onSlideChange(newIndex);
    }
  }, [currentIndex, items.length, onSlideChange]);

  const prevSlide = useCallback(() => {
    if (items.length === 0) return;

    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);

    if (onSlideChange) {
      onSlideChange(newIndex);
    }
  }, [currentIndex, items.length, onSlideChange]);

  const goToSlide = useCallback(
    (index) => {
      if (items.length === 0 || index < 0 || index >= items.length) return;

      setCurrentIndex(index);

      if (onSlideChange) {
        onSlideChange(index);
      }
    },
    [items.length, onSlideChange]
  );

  // Handle item click
  const handleItemClick = useCallback(
    (item, event) => {
      if (onItemClick) {
        onItemClick(item, event);
      }
    },
    [onItemClick]
  );

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
    setIsPaused(true); // Pause auto-play during interaction
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) {
      setIsPaused(false);
      return;
    }

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
    setIsPaused(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(items.length - 1);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (currentItem) {
            handleItemClick(currentItem, e);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    currentItem,
    prevSlide,
    nextSlide,
    goToSlide,
    handleItemClick,
    items.length,
  ]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1 || loading || error) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [
    autoPlay,
    isPaused,
    items.length,
    loading,
    error,
    autoPlayInterval,
    nextSlide,
  ]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && !touchStartX) {
      setIsPaused(false);
    }
  };

  // Component classes
  const carouselClasses = `${styles.carousel} ${
    darkMode ? styles.carouselDark : ''
  } ${className}`;

  const slideClasses = (index) => `
    ${styles.carouselSlide}
    ${index === currentIndex ? styles.slideActive : ''}
    ${darkMode ? styles.slideDark : ''}
  `;

  const buttonClasses = `${styles.carouselButton} ${
    darkMode ? styles.buttonDark : ''
  }`;

  const dotClasses = (index) => `
    ${styles.carouselDot}
    ${index === currentIndex ? styles.dotActive : ''}
    ${darkMode ? styles.dotDark : ''}
  `;

  // Render loading state
  if (loading) {
    return (
      <div className={styles.loadingState} role="status" aria-live="polite">
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading featured content...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={styles.errorState} role="alert">
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorText}>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render empty state
  if (!items || items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🎵</div>
        <p className={styles.emptyText}>No featured content available</p>
      </div>
    );
  }

  return (
    <section
      className={carouselClasses}
      aria-label="Featured audio carousel"
      aria-roledescription="carousel"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel wrapper */}
      <div
        className={styles.carouselContainer}
        role="group"
        aria-label={`Slide ${currentIndex + 1} of ${items.length}`}
      >
        {/* Slide content */}
        {items.map((item, index) => (
          <article
            key={item.id}
            className={slideClasses(index)}
            aria-hidden={index !== currentIndex}
            aria-labelledby={`carousel-item-${index}-title`}
            role="group"
            aria-roledescription="slide"
          >
            {/* Image section */}
            <div className={styles.imageContainer}>
              {item.cover_image_url ? (
                <img
                  src={item.cover_image_url}
                  alt={item.title}
                  className={styles.carouselImage}
                  loading={index === currentIndex ? 'eager' : 'lazy'}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderIcon}>🎵</span>
                </div>
              )}
            </div>

            {/* Content section */}
            <div className={styles.contentContainer}>
              {/* Category badge */}
              {getCategoryName(item.category) && (
                <div className={styles.categoryBadge}>
                  <span className={styles.categoryText}>
                    {getCategoryName(item.category)}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3
                id={`carousel-item-${index}-title`}
                className={styles.itemTitle}
              >
                {item.title}
              </h3>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className={styles.tagsContainer}>
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      #{getTagName(tag)}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className={styles.metadata}>
                {item.duration_seconds && (
                  <span className={styles.metadataItem}>
                    <span className={styles.metadataIcon} aria-hidden="true">
                      ⏱️
                    </span>
                    <span className={styles.metadataText}>
                      {formatDuration(item.duration_seconds)}
                    </span>
                  </span>
                )}

                {item.file_size_bytes && (
                  <span className={styles.metadataItem}>
                    <span className={styles.metadataIcon} aria-hidden="true">
                      📦
                    </span>
                    <span className={styles.metadataText}>
                      {formatFileSize(item.file_size_bytes)}
                    </span>
                  </span>
                )}
              </div>

              {/* Play button - only visible on active slide */}
              {index === currentIndex && (
                <Link
                  to={`/audio/${item.id}`}
                  className={styles.playButton}
                  onClick={(e) => handleItemClick(item, e)}
                  aria-label={`Play ${item.title}`}
                >
                  <span className={styles.playIcon}>▶</span>
                  Play Now
                </Link>
              )}
            </div>
          </article>
        ))}

        {/* Navigation buttons */}
        {items.length > 1 && (
          <>
            <button
              className={`${buttonClasses} ${styles.prevButton}`}
              onClick={prevSlide}
              onKeyDown={(e) => e.key === 'Enter' && prevSlide()}
              aria-label="Previous slide"
              aria-controls="carousel-items"
              disabled={currentIndex === 0}
            >
              <span className={styles.buttonIcon} aria-hidden="true">
                ❮
              </span>
            </button>

            <button
              className={`${buttonClasses} ${styles.nextButton}`}
              onClick={nextSlide}
              onKeyDown={(e) => e.key === 'Enter' && nextSlide()}
              aria-label="Next slide"
              aria-controls="carousel-items"
              disabled={currentIndex === items.length - 1}
            >
              <span className={styles.buttonIcon} aria-hidden="true">
                ❯
              </span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {items.length > 1 && (
          <div
            className={styles.dotsContainer}
            role="tablist"
            aria-label="Slide indicators"
          >
            {items.map((_, index) => (
              <button
                key={index}
                className={dotClasses(index)}
                onClick={() => goToSlide(index)}
                onKeyDown={(e) => e.key === 'Enter' && goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
                aria-controls={`carousel-item-${index}`}
              />
            ))}
          </div>
        )}

        {/* Slide counter (for screen readers) */}
        <div
          className={styles.slideCounter}
          aria-live="polite"
          aria-atomic="true"
        >
          Slide {currentIndex + 1} of {items.length}
        </div>
      </div>

      {/* Auto-play status (for screen readers) */}
      {autoPlay && !isPaused && (
        <div className={styles.srOnly} aria-live="polite">
          Auto-play enabled, slides change every {autoPlayInterval / 1000}{' '}
          seconds
        </div>
      )}
    </section>
  );
};

// PropTypes for better development experience
FeaturedCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      cover_image_url: PropTypes.string,
      category: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ name: PropTypes.string }),
      ]),
      tags: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ name: PropTypes.string }),
        ])
      ),
      duration_seconds: PropTypes.number,
      file_size_bytes: PropTypes.number,
    })
  ).isRequired,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  darkMode: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onItemClick: PropTypes.func,
  onSlideChange: PropTypes.func,
  className: PropTypes.string,
};

// Default props
FeaturedCarousel.defaultProps = {
  items: [],
  autoPlay: true,
  autoPlayInterval: 5000,
  darkMode: false,
  loading: false,
  error: null,
};

export default FeaturedCarousel;
