// pages/Terms.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/ui/Footer';
import styles from './Terms.module.css';

export default function Terms() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${styles.termsPage} ${darkMode ? styles.termsPageDark : ''}`}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={styles.termsContainer}>
        <div className={styles.termsContent}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Terms of Service</span>
          </nav>

          {/* Header */}
          <header className={styles.termsHeader}>
            <h1 className={styles.termsTitle}>Terms of Service</h1>
            <p className={styles.termsLastUpdated}>
              Last Updated: December 1, 2025
            </p>
          </header>

          {/* Introduction */}
          <section className={styles.section}>
            <p className={styles.introText}>
              Welcome to ThirstySounds. By accessing or using our website, you
              agree to be bound by these Terms of Service. Please read them
              carefully.
            </p>
          </section>

          {/* Table of Contents */}
          <nav className={styles.tableOfContents}>
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ul className={styles.tocList}>
              <li>
                <a href="#acceptance" className={styles.tocLink}>
                  1. Acceptance of Terms
                </a>
              </li>
              <li>
                <a href="#eligibility" className={styles.tocLink}>
                  2. Eligibility
                </a>
              </li>
              <li>
                <a href="#account" className={styles.tocLink}>
                  3. User Accounts
                </a>
              </li>
              <li>
                <a href="#content" className={styles.tocLink}>
                  4. Content Guidelines
                </a>
              </li>
              <li>
                <a href="#intellectual" className={styles.tocLink}>
                  5. Intellectual Property
                </a>
              </li>
              <li>
                <a href="#prohibited" className={styles.tocLink}>
                  6. Prohibited Conduct
                </a>
              </li>
              <li>
                <a href="#privacy" className={styles.tocLink}>
                  7. Privacy Policy
                </a>
              </li>
              <li>
                <a href="#termination" className={styles.tocLink}>
                  8. Termination
                </a>
              </li>
              <li>
                <a href="#disclaimer" className={styles.tocLink}>
                  9. Disclaimer
                </a>
              </li>
              <li>
                <a href="#liability" className={styles.tocLink}>
                  10. Limitation of Liability
                </a>
              </li>
              <li>
                <a href="#changes" className={styles.tocLink}>
                  11. Changes to Terms
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.tocLink}>
                  12. Contact Information
                </a>
              </li>
            </ul>
          </nav>

          {/* Terms Sections */}
          <div className={styles.termsSections}>
            <section id="acceptance" className={styles.termSection}>
              <h2 className={styles.termTitle}>1. Acceptance of Terms</h2>
              <p>
                By accessing or using ThirstySounds, you acknowledge that you
                have read, understood, and agree to be bound by these Terms of
                Service.
              </p>
            </section>

            <section id="eligibility" className={styles.termSection}>
              <h2 className={styles.termTitle}>2. Eligibility</h2>
              <p>
                You must be at least 18 years old to use ThirstySounds. By using
                our services, you represent and warrant that you are 18 years of
                age or older.
              </p>
            </section>

            <section id="account" className={styles.termSection}>
              <h2 className={styles.termTitle}>3. User Accounts</h2>
              <ul className={styles.termList}>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials
                </li>
                <li>
                  You are responsible for all activities that occur under your
                  account
                </li>
                <li>
                  You must provide accurate and complete information when
                  creating an account
                </li>
                <li>
                  You must notify us immediately of any unauthorized use of your
                  account
                </li>
              </ul>
            </section>

            <section id="content" className={styles.termSection}>
              <h2 className={styles.termTitle}>4. Content Guidelines</h2>
              <p>
                ThirstySounds contains adult-oriented audio content. Users must:
              </p>
              <ul className={styles.termList}>
                <li>Only upload content they have the right to distribute</li>
                <li>
                  Not upload content that violates any laws or regulations
                </li>
                <li>Respect copyright and intellectual property rights</li>
                <li>
                  Not upload content that is illegal, harmful, or offensive
                </li>
              </ul>
            </section>

            <section id="intellectual" className={styles.termSection}>
              <h2 className={styles.termTitle}>5. Intellectual Property</h2>
              <p>
                All content on ThirstySounds, including audio files, text,
                graphics, logos, and software, is the property of ThirstySounds
                or its content providers and is protected by copyright and other
                intellectual property laws.
              </p>
            </section>

            <section id="prohibited" className={styles.termSection}>
              <h2 className={styles.termTitle}>6. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul className={styles.termList}>
                <li>Use the service for any illegal purpose</li>
                <li>
                  Attempt to gain unauthorized access to any part of the service
                </li>
                <li>Interfere with the proper working of the service</li>
                <li>Upload viruses or malicious code</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section id="privacy" className={styles.termSection}>
              <h2 className={styles.termTitle}>7. Privacy Policy</h2>
              <p>
                Your use of ThirstySounds is also governed by our{' '}
                <Link to="/privacy" className={styles.inlineLink}>
                  Privacy Policy
                </Link>
                , which explains how we collect, use, and protect your personal
                information.
              </p>
            </section>

            <section id="termination" className={styles.termSection}>
              <h2 className={styles.termTitle}>8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account and
                access to the service at our sole discretion, without notice,
                for conduct that we believe violates these Terms or is harmful
                to other users, us, or third parties.
              </p>
            </section>

            <section id="disclaimer" className={styles.termSection}>
              <h2 className={styles.termTitle}>9. Disclaimer</h2>
              <p>
                ThirstySounds is provided "as is" and "as available" without
                warranties of any kind, either express or implied. We do not
                warrant that the service will be uninterrupted or error-free.
              </p>
            </section>

            <section id="liability" className={styles.termSection}>
              <h2 className={styles.termTitle}>10. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, ThirstySounds shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of or inability to
                use the service.
              </p>
            </section>

            <section id="changes" className={styles.termSection}>
              <h2 className={styles.termTitle}>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will
                notify users of significant changes by posting the new Terms on
                this page. Your continued use of the service after changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section id="contact" className={styles.termSection}>
              <h2 className={styles.termTitle}>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className={styles.contactInfo}>
                <p>
                  <strong>Email:</strong> legal@thirstysounds.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Audio Street, Digital City, DC
                  10101
                </p>
              </div>
            </section>
          </div>

          {/* Acceptance Section */}
          <div className={styles.acceptanceSection}>
            <div className={styles.acceptanceBox}>
              <h3 className={styles.acceptanceTitle}>Acceptance of Terms</h3>
              <p className={styles.acceptanceText}>
                By using ThirstySounds, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service.
              </p>
              <div className={styles.acceptanceActions}>
                <Link to="/" className={styles.backButton}>
                  Back to Home
                </Link>
                <Link to="/privacy" className={styles.privacyButton}>
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
