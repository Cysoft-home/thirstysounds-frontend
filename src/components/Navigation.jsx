import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

export default function Navigation({ darkMode, setDarkMode }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Combine nav classes based on state
  const getNavClasses = () => {
    let classes = [styles.nav];
    if (scrolled) {
      classes.push(darkMode ? styles.navDarkScrolled : styles.navScrolled);
    } else {
      classes.push(darkMode ? styles.navDark : '');
    }
    return classes.join(' ');
  };

  // Get link classes based on active state and dark mode
  const getLinkClasses = (path) => {
    let classes = [styles.link];

    if (isActive(path)) {
      classes.push(darkMode ? styles.linkActiveDark : styles.linkActive);
    } else {
      classes.push(darkMode ? styles.linkDark : '');
    }

    return classes.join(' ');
  };

  return (
    <nav className={getNavClasses()}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.logoContainer}>
            <Link
              to="/"
              className={`${styles.logo} ${darkMode ? styles.logoDark : ''}`}
            >
              ThirstySounds
            </Link>
          </div>

          <div className={styles.linksContainer}>
            <Link to="/audio" className={getLinkClasses('/audio')}>
              Browse Audio
            </Link>

            <Link to="/search" className={getLinkClasses('/search')}>
              Search
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${styles.darkModeButton} ${
                darkMode ? styles.darkModeButtonDark : ''
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
