import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import styles from './Home.module.css';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

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

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1
            className={
              darkMode
                ? `${styles.heroTitle} ${styles.heroTitleDark}`
                : styles.heroTitle
            }
          >
            Welcome to{' '}
            <span
              className={
                darkMode
                  ? `${styles.heroTitleGradient} ${styles.heroTitleGradientDark}`
                  : styles.heroTitleGradient
              }
            >
              ThirstySounds
            </span>
          </h1>
          <p
            className={
              darkMode
                ? `${styles.heroDescription} ${styles.heroDescriptionDark}`
                : styles.heroDescription
            }
          >
            Discover and enjoy premium audio content. High-quality recordings,
            professional narration, and immersive experiences await you.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/audio" className={styles.buttonPrimary}>
              Browse Audio
            </Link>
            <Link
              to="/search"
              className={
                darkMode
                  ? `${styles.buttonSecondary} ${styles.buttonSecondaryDark}`
                  : styles.buttonSecondary
              }
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          <div
            className={
              darkMode
                ? `${styles.featureCard} ${styles.featureCardDark}`
                : styles.featureCard
            }
          >
            <div className={styles.featureIcon}>🎵</div>
            <h3
              className={
                darkMode
                  ? `${styles.featureTitle} ${styles.featureTitleDark}`
                  : styles.featureTitle
              }
            >
              High-Quality Audio
            </h3>
            <p
              className={
                darkMode
                  ? `${styles.featureDescription} ${styles.featureDescriptionDark}`
                  : styles.featureDescription
              }
            >
              Experience crystal-clear audio with multiple bitrate options for
              seamless playback on any device.
            </p>
          </div>

          <div
            className={
              darkMode
                ? `${styles.featureCard} ${styles.featureCardDark}`
                : styles.featureCard
            }
          >
            <div className={styles.featureIcon}>🔍</div>
            <h3
              className={
                darkMode
                  ? `${styles.featureTitle} ${styles.featureTitleDark}`
                  : styles.featureTitle
              }
            >
              Advanced Search
            </h3>
            <p
              className={
                darkMode
                  ? `${styles.featureDescription} ${styles.featureDescriptionDark}`
                  : styles.featureDescription
              }
            >
              Find exactly what you're looking for with our powerful search
              engine featuring filters and autocomplete.
            </p>
          </div>

          <div
            className={
              darkMode
                ? `${styles.featureCard} ${styles.featureCardDark}`
                : styles.featureCard
            }
          >
            <div className={styles.featureIcon}>🔒</div>
            <h3
              className={
                darkMode
                  ? `${styles.featureTitle} ${styles.featureTitleDark}`
                  : styles.featureTitle
              }
            >
              Safe & Secure
            </h3>
            <p
              className={
                darkMode
                  ? `${styles.featureDescription} ${styles.featureDescriptionDark}`
                  : styles.featureDescription
              }
            >
              Your privacy and security are our top priorities. All content is
              moderated and encrypted.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={
          darkMode ? `${styles.footer} ${styles.footerDark}` : styles.footer
        }
      >
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerColumn}>
              <h4
                className={
                  darkMode
                    ? `${styles.footerTitle} ${styles.footerTitleDark}`
                    : styles.footerTitle
                }
              >
                ThirstySounds
              </h4>
              <p
                className={
                  darkMode
                    ? `${styles.footerText} ${styles.footerTextDark}`
                    : styles.footerText
                }
              >
                Premium audio content platform for discerning listeners.
              </p>
            </div>

            <div className={styles.footerColumn}>
              <h4
                className={
                  darkMode
                    ? `${styles.footerTitle} ${styles.footerTitleDark}`
                    : styles.footerTitle
                }
              >
                Legal
              </h4>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <Link
                    to="/terms"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Terms of Service
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link
                    to="/privacy"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link
                    to="/dmca"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    DMCA
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4
                className={
                  darkMode
                    ? `${styles.footerTitle} ${styles.footerTitleDark}`
                    : styles.footerTitle
                }
              >
                Support
              </h4>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <Link
                    to="/faq"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    FAQ
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link
                    to="/contact"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Contact Us
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link
                    to="/takedown"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Report Content
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4
                className={
                  darkMode
                    ? `${styles.footerTitle} ${styles.footerTitleDark}`
                    : styles.footerTitle
                }
              >
                Connect
              </h4>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <a
                    href="#"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Twitter
                  </a>
                </li>
                <li className={styles.footerListItem}>
                  <a
                    href="#"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Discord
                  </a>
                </li>
                <li className={styles.footerListItem}>
                  <a
                    href="#"
                    className={
                      darkMode
                        ? `${styles.footerLink} ${styles.footerLinkDark}`
                        : styles.footerLink
                    }
                  >
                    Reddit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={
              darkMode
                ? `${styles.footerBottom} ${styles.footerBottomDark}`
                : styles.footerBottom
            }
          >
            <p>&copy; 2025 ThirstySounds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
