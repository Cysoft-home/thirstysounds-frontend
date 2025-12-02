// pages/Privacy.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/ui/Footer';
import styles from './Privacy.module.css';

export default function Privacy() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${styles.privacyPage} ${
        darkMode ? styles.privacyPageDark : ''
      }`}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={styles.privacyContainer}>
        <div className={styles.privacyContent}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Privacy Policy</span>
          </nav>

          {/* Header */}
          <header className={styles.privacyHeader}>
            <h1 className={styles.privacyTitle}>Privacy Policy</h1>
            <p className={styles.privacyLastUpdated}>
              Last Updated: December 1, 2025
            </p>
            <p className={styles.privacySubtitle}>
              We value your privacy and are committed to protecting your
              personal information.
            </p>
          </header>

          {/* Introduction */}
          <section className={styles.introSection}>
            <p className={styles.introText}>
              This Privacy Policy explains how ThirstySounds collects, uses,
              discloses, and safeguards your information when you use our
              website. Please read this policy carefully.
            </p>
          </section>

          {/* Table of Contents */}
          <nav className={styles.tableOfContents}>
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ul className={styles.tocList}>
              <li>
                <a href="#information-collected" className={styles.tocLink}>
                  1. Information We Collect
                </a>
              </li>
              <li>
                <a href="#information-use" className={styles.tocLink}>
                  2. How We Use Your Information
                </a>
              </li>
              <li>
                <a href="#information-sharing" className={styles.tocLink}>
                  3. Information Sharing and Disclosure
                </a>
              </li>
              <li>
                <a href="#data-security" className={styles.tocLink}>
                  4. Data Security
                </a>
              </li>
              <li>
                <a href="#data-retention" className={styles.tocLink}>
                  5. Data Retention
                </a>
              </li>
              <li>
                <a href="#your-rights" className={styles.tocLink}>
                  6. Your Privacy Rights
                </a>
              </li>
              <li>
                <a href="#cookies" className={styles.tocLink}>
                  7. Cookies and Tracking
                </a>
              </li>
              <li>
                <a href="#third-party" className={styles.tocLink}>
                  8. Third-Party Services
                </a>
              </li>
              <li>
                <a href="#children" className={styles.tocLink}>
                  9. Children's Privacy
                </a>
              </li>
              <li>
                <a href="#changes" className={styles.tocLink}>
                  10. Changes to This Policy
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.tocLink}>
                  11. Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Privacy Sections */}
          <div className={styles.privacySections}>
            <section
              id="information-collected"
              className={styles.privacySection}
            >
              <h2 className={styles.sectionTitle}>1. Information We Collect</h2>

              <h3 className={styles.subsectionTitle}>Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide
                to us, including:
              </p>
              <ul className={styles.infoList}>
                <li>Name and contact information (email address)</li>
                <li>Account credentials (username, password)</li>
                <li>Age verification information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className={styles.subsectionTitle}>Usage Information</h3>
              <p>
                We automatically collect certain information when you visit our
                website:
              </p>
              <ul className={styles.infoList}>
                <li>
                  Device information (IP address, browser type, operating
                  system)
                </li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>
                  Audio consumption patterns (listening history, preferences)
                </li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className={styles.subsectionTitle}>
                Audio Content Information
              </h3>
              <p>For audio uploads, we may collect:</p>
              <ul className={styles.infoList}>
                <li>Audio file metadata (title, description, tags)</li>
                <li>Upload timestamps and file information</li>
                <li>Content categorization and classification</li>
              </ul>
            </section>

            <section id="information-use" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className={styles.infoList}>
                <li>To provide, maintain, and improve our services</li>
                <li>
                  To verify your age and ensure compliance with legal
                  requirements
                </li>
                <li>To personalize your experience and recommend content</li>
                <li>
                  To communicate with you about updates, security alerts, and
                  support
                </li>
                <li>
                  To detect, prevent, and address technical issues and security
                  breaches
                </li>
                <li>
                  To comply with legal obligations and enforce our Terms of
                  Service
                </li>
                <li>For analytics and research to improve our services</li>
              </ul>
            </section>

            <section id="information-sharing" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>
                3. Information Sharing and Disclosure
              </h2>
              <p>
                We do not sell your personal information. We may share
                information in the following circumstances:
              </p>

              <h3 className={styles.subsectionTitle}>Service Providers</h3>
              <p>
                We may share information with trusted third-party service
                providers who assist us in operating our website, conducting our
                business, or servicing you, so long as those parties agree to
                keep this information confidential.
              </p>

              <h3 className={styles.subsectionTitle}>Legal Requirements</h3>
              <p>
                We may disclose your information if required to do so by law or
                in response to valid requests by public authorities (e.g., a
                court or government agency).
              </p>

              <h3 className={styles.subsectionTitle}>Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of all or a
                portion of our assets, your information may be transferred as
                part of that transaction.
              </p>

              <h3 className={styles.subsectionTitle}>With Your Consent</h3>
              <p>
                We may share your information with your consent or at your
                direction.
              </p>
            </section>

            <section id="data-security" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet or
                electronic storage is 100% secure.
              </p>
              <p>Security measures include:</p>
              <ul className={styles.infoList}>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure server infrastructure and network protection</li>
              </ul>
            </section>

            <section id="data-retention" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>5. Data Retention</h2>
              <p>
                We retain your personal information only for as long as
                necessary to fulfill the purposes for which it was collected,
                including for the purposes of satisfying any legal, accounting,
                or reporting requirements.
              </p>
              <p>
                When determining the appropriate retention period, we consider:
              </p>
              <ul className={styles.infoList}>
                <li>
                  The amount, nature, and sensitivity of the personal
                  information
                </li>
                <li>
                  The potential risk of harm from unauthorized use or disclosure
                </li>
                <li>The purposes for which we process the information</li>
                <li>Applicable legal requirements</li>
              </ul>
            </section>

            <section id="your-rights" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>6. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className={styles.infoList}>
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of
                  processing of your information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your
                  information to another service
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your
                  personal information
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Withdraw consent at any
                  time where we rely on consent to process your information
                </li>
              </ul>
              <p>
                To exercise these rights, please contact us using the
                information provided in the "Contact Us" section.
              </p>
            </section>

            <section id="cookies" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our website and hold certain information.
              </p>

              <h3 className={styles.subsectionTitle}>
                Types of Cookies We Use
              </h3>
              <ul className={styles.infoList}>
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the website
                  to function properly
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your preferences
                  and settings
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors interact with our website
                </li>
                <li>
                  <strong>Security Cookies:</strong> Support security features
                  and detect malicious activity
                </li>
              </ul>

              <h3 className={styles.subsectionTitle}>Managing Cookies</h3>
              <p>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                service.
              </p>
            </section>

            <section id="third-party" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>8. Third-Party Services</h2>
              <p>
                Our website may contain links to third-party websites or
                services that are not owned or controlled by ThirstySounds. We
                have no control over, and assume no responsibility for, the
                content, privacy policies, or practices of any third-party
                websites or services.
              </p>
              <p>
                We encourage you to review the privacy policies of any
                third-party services you access.
              </p>
            </section>

            <section id="children" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>9. Children's Privacy</h2>
              <p>
                ThirstySounds is intended for adults only. We do not knowingly
                collect or solicit personal information from anyone under the
                age of 18.
              </p>
              <p>
                If you are a parent or guardian and believe that your child has
                provided us with personal information, please contact us
                immediately. If we become aware that we have collected personal
                information from children without verification of parental
                consent, we take steps to remove that information from our
                servers.
              </p>
            </section>

            <section id="changes" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>
                10. Changes to This Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </section>

            <section id="contact" className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className={styles.contactInfo}>
                <p>
                  <strong>Email:</strong> privacy@thirstysounds.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Audio Street, Digital City, DC
                  10101
                </p>
                <p>
                  <strong>Data Protection Officer:</strong>{' '}
                  dpo@thirstysounds.com
                </p>
              </div>
              <p>We will respond to your inquiry within 30 days.</p>
            </section>
          </div>

          {/* Footer Actions */}
          <div className={styles.footerActions}>
            <div className={styles.actionsBox}>
              <h3 className={styles.actionsTitle}>Your Privacy Matters</h3>
              <p className={styles.actionsText}>
                We are committed to protecting your privacy and being
                transparent about our data practices.
              </p>
              <div className={styles.actionsButtons}>
                <Link to="/" className={styles.homeButton}>
                  Back to Home
                </Link>
                <Link to="/terms" className={styles.termsButton}>
                  View Terms of Service
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
