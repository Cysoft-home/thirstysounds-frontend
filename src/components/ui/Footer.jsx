// components/ui/Footer/Footer.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';

/**
 * Footer Component
 * A reusable footer with configurable sections, dark mode support, and responsive design.
 */

// Default footer sections configuration
const defaultSections = [
  {
    id: 'about',
    title: 'ThirstySounds',
    links: null, // Special case - will render description instead
    description: 'Premium audio content platform for discerning listeners.',
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { name: 'Terms of Service', path: '/terms', isExternal: false },
      { name: 'Privacy Policy', path: '/privacy', isExternal: false },
      { name: 'DMCA', path: '/dmca', isExternal: false },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { name: 'FAQ', path: '/faq', isExternal: false },
      { name: 'Contact Us', path: '/contact', isExternal: false },
      { name: 'Report Content', path: '/takedown', isExternal: false },
    ],
  },
  {
    id: 'connect',
    title: 'Connect',
    links: [
      { name: 'Twitter', path: 'https://twitter.com', isExternal: true },
      { name: 'Discord', path: 'https://discord.com', isExternal: true },
      { name: 'Reddit', path: 'https://reddit.com', isExternal: true },
    ],
  },
];

const Footer = ({
  darkMode = false,
  variant = 'default',
  sections = defaultSections,
  showCopyright = true,
  customCopyrightText,
  className = '',
  onLinkClick,
}) => {
  const footerClasses = `${styles.footer} ${
    darkMode ? styles.footerDark : ''
  } ${className}`;

  const containerClasses = `${styles.footerContainer} ${
    variant === 'minimal' ? styles.containerMinimal : ''
  }`;

  const currentYear = new Date().getFullYear();
  const copyrightText =
    customCopyrightText ||
    `© ${currentYear} ThirstySounds. All rights reserved.`;

  // Handle link clicks
  const handleLinkClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  // Render link based on type (internal/external)
  const renderLink = (link) => {
    const linkClasses = `${styles.footerLink} ${
      darkMode ? styles.footerLinkDark : ''
    }`;

    if (link.isExternal) {
      return (
        <a
          href={link.path}
          className={linkClasses}
          onClick={() => handleLinkClick(link)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name} (opens in new tab)`}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        to={link.path}
        className={linkClasses}
        onClick={() => handleLinkClick(link)}
        aria-label={link.name}
      >
        {link.name}
      </Link>
    );
  };

  // Render a footer column
  const renderColumn = (section) => (
    <div key={section.id} className={styles.footerColumn}>
      <h4
        className={`${styles.footerTitle} ${
          darkMode ? styles.footerTitleDark : ''
        }`}
      >
        {section.title}
      </h4>

      {section.description ? (
        <p
          className={`${styles.footerText} ${
            darkMode ? styles.footerTextDark : ''
          }`}
        >
          {section.description}
        </p>
      ) : (
        <ul className={styles.footerList}>
          {section.links.map((link, index) => (
            <li key={index} className={styles.footerListItem}>
              {renderLink(link)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <footer className={footerClasses} role="contentinfo">
      <div className={containerClasses}>
        {/* Main footer content - only show if not minimal variant */}
        {variant !== 'minimal' && (
          <div className={styles.footerGrid}>{sections.map(renderColumn)}</div>
        )}

        {/* Copyright section */}
        {showCopyright && (
          <div
            className={`${styles.footerBottom} ${
              darkMode ? styles.footerBottomDark : ''
            }`}
          >
            <p className={styles.copyrightText}>{copyrightText}</p>

            {/* Additional copyright info for default variant */}
            {variant === 'default' && (
              <div className={styles.legalInfo}>
                <span className={styles.legalText}>
                  All audio content is protected by copyright. Unauthorized use
                  is prohibited.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

// PropTypes for better development experience
Footer.propTypes = {
  darkMode: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'minimal', 'extended']),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          isExternal: PropTypes.bool,
        })
      ),
    })
  ),
  showCopyright: PropTypes.bool,
  customCopyrightText: PropTypes.string,
  className: PropTypes.string,
  onLinkClick: PropTypes.func,
};

export default Footer;
