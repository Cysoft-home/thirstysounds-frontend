// components/ui/HeroSection.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './HeroSection.module.css';

/**
 * HeroSection Component
 * A reusable hero/banner component with gradient background, title, description, and call-to-action buttons.
 * Supports dark mode and customizable content.
 */

const HeroSection = ({
  darkMode = false,
  title = 'Welcome to ThirstySounds',
  titleGradient = 'ThirstySounds',
  description = 'Discover and enjoy premium audio content. High-quality recordings, professional narration, and immersive experiences await you.',
  primaryButton = {
    text: 'Browse Audio',
    to: '/audio',
  },
  secondaryButton = {
    text: 'Explore Now',
    to: '/search',
  },
  showButtons = true,
  className = '',
  onButtonClick,
  children,
}) => {
  // Handle button clicks
  const handleButtonClick = (buttonType, event) => {
    if (onButtonClick) {
      onButtonClick(buttonType, event);
    }
  };

  // Split title to find where to insert gradient
  const renderTitle = () => {
    if (!title.includes(titleGradient)) {
      return (
        <>
          {title}{' '}
          <span
            className={`${styles.heroTitleGradient} ${
              darkMode ? styles.heroTitleGradientDark : ''
            }`}
          >
            {titleGradient}
          </span>
        </>
      );
    }

    const parts = title.split(titleGradient);
    return (
      <>
        {parts[0]}
        <span
          className={`${styles.heroTitleGradient} ${
            darkMode ? styles.heroTitleGradientDark : ''
          }`}
        >
          {titleGradient}
        </span>
        {parts[1]}
      </>
    );
  };

  // Component classes
  const heroClasses = `${styles.heroSection} ${
    darkMode ? styles.heroSectionDark : ''
  } ${className}`;

  const titleClasses = `${styles.heroTitle} ${
    darkMode ? styles.heroTitleDark : ''
  }`;

  const descriptionClasses = `${styles.heroDescription} ${
    darkMode ? styles.heroDescriptionDark : ''
  }`;

  const secondaryButtonClasses = `${styles.buttonSecondary} ${
    darkMode ? styles.buttonSecondaryDark : ''
  }`;

  return (
    <section className={heroClasses} aria-label="Hero section" role="banner">
      <div className={styles.heroContent}>
        {/* Title */}
        <h1 className={titleClasses}>{renderTitle()}</h1>

        {/* Description */}
        <p className={descriptionClasses}>{description}</p>

        {/* Custom children content */}
        {children && <div className={styles.heroChildren}>{children}</div>}

        {/* Call-to-action buttons */}
        {showButtons && (
          <div className={styles.heroButtons}>
            {/* Primary Button */}
            <Link
              to={primaryButton.to}
              className={styles.buttonPrimary}
              onClick={(e) => handleButtonClick('primary', e)}
              aria-label={primaryButton.ariaLabel || primaryButton.text}
            >
              {primaryButton.text}
            </Link>

            {/* Secondary Button */}
            <Link
              to={secondaryButton.to}
              className={secondaryButtonClasses}
              onClick={(e) => handleButtonClick('secondary', e)}
              aria-label={secondaryButton.ariaLabel || secondaryButton.text}
            >
              {secondaryButton.text}
            </Link>
          </div>
        )}

        {/* Additional content slot */}
        <div className={styles.heroExtra} role="complementary">
          {/* This div can be used for stats, badges, or additional info */}
        </div>
      </div>

      {/* Optional decorative elements */}
      <div className={styles.heroDecoration} aria-hidden="true">
        <div className={styles.decorationCircle}></div>
        <div className={styles.decorationCircle}></div>
        <div className={styles.decorationCircle}></div>
      </div>
    </section>
  );
};

// PropTypes for better development experience
HeroSection.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  titleGradient: PropTypes.string,
  description: PropTypes.string,
  primaryButton: PropTypes.shape({
    text: PropTypes.string,
    to: PropTypes.string,
    ariaLabel: PropTypes.string,
  }),
  secondaryButton: PropTypes.shape({
    text: PropTypes.string,
    to: PropTypes.string,
    ariaLabel: PropTypes.string,
  }),
  showButtons: PropTypes.bool,
  className: PropTypes.string,
  onButtonClick: PropTypes.func,
  children: PropTypes.node,
};

// Default props
HeroSection.defaultProps = {
  darkMode: false,
  title: 'Welcome to ThirstySounds',
  titleGradient: 'ThirstySounds',
  description:
    'Discover and enjoy premium audio content. High-quality recordings, professional narration, and immersive experiences await you.',
  primaryButton: {
    text: 'Browse Audio',
    to: '/audio',
  },
  secondaryButton: {
    text: 'Explore Now',
    to: '/search',
  },
  showButtons: true,
};

export default HeroSection;
