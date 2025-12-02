import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/ui/HeroSection';
import FeaturedCarousel from '../components/ui/FeaturedCarousel';
import Footer from '../components/ui/Footer';
import { useFeaturedAudio } from '../hooks/useAudio'; // Changed from useAudioList
import styles from './Home.module.css';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const autoPlayInterval = 5000;

  // Use the dedicated featured audio hook
  const { data, loading, error, refetch } = useFeaturedAudio(50);

  // Extract featured audio from the data
  // Note: Adjust this based on your API response structure
  const featuredAudio = data?.results || data || [];

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Handle carousel item click
  const handleCarouselItemClick = (item, event) => {
    console.log('Carousel item clicked:', item);
    // You can add analytics or additional logic here
  };

  // Handle carousel slide change
  const handleSlideChange = (index) => {
    console.log('Slide changed to:', index);
    // You can add analytics or additional logic here
  };

  // Handle hero section button clicks
  const handleHeroButtonClick = (buttonType, event) => {
    console.log(`${buttonType} button clicked`);
    // You can add analytics or additional logic here
  };

  // Handle footer link clicks
  const handleFooterLinkClick = (link) => {
    console.log('Footer link clicked:', link);
    // You can add analytics or additional logic here
  };

  // Handle retry for errors
  const handleRetry = () => {
    refetch();
  };

  return (
    <main className={`${styles.main} ${darkMode ? styles.mainDark : ''}`}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <HeroSection darkMode={darkMode} onButtonClick={handleHeroButtonClick} />

      {/* Featured Audio Carousel Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Featured Audio</h2>

        {/* Optional: Add retry button for errors */}
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>Failed to load featured content</p>
            <button onClick={handleRetry} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        )}

        <FeaturedCarousel
          items={featuredAudio}
          loading={loading}
          error={error}
          darkMode={darkMode}
          autoPlay={true}
          autoPlayInterval={autoPlayInterval}
          onItemClick={handleCarouselItemClick}
          onSlideChange={handleSlideChange}
        />
      </section>

      <Footer darkMode={darkMode} onLinkClick={handleFooterLinkClick} />
    </main>
  );
}
