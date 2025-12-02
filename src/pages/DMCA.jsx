// pages/DMCA.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/ui/Footer';
import styles from './DMCA.module.css';

export default function DMCA() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${styles.dmcaPage} ${darkMode ? styles.dmcaPageDark : ''}`}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={styles.dmcaContainer}>
        <div className={styles.dmcaContent}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>DMCA Policy</span>
          </nav>

          {/* Header */}
          <header className={styles.dmcaHeader}>
            <h1 className={styles.dmcaTitle}>DMCA Policy</h1>
            <p className={styles.dmcaSubtitle}>
              Digital Millennium Copyright Act Notice & Takedown Policy
            </p>
            <p className={styles.dmcaLastUpdated}>
              Last Updated: December 1, 2025
            </p>
          </header>

          {/* Important Notice */}
          <div className={styles.importantNotice}>
            <div className={styles.noticeIcon}>⚠️</div>
            <div className={styles.noticeContent}>
              <h3 className={styles.noticeTitle}>Important Notice</h3>
              <p className={styles.noticeText}>
                This page contains legal information about copyright
                infringement claims. Please read carefully before submitting a
                DMCA notice.
              </p>
            </div>
          </div>

          {/* Introduction */}
          <section className={styles.introSection}>
            <p className={styles.introText}>
              ThirstySounds respects the intellectual property rights of others
              and expects its users to do the same. In accordance with the
              Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond
              expeditiously to claims of copyright infringement committed using
              our service.
            </p>
          </section>

          {/* Table of Contents */}
          <nav className={styles.tableOfContents}>
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ul className={styles.tocList}>
              <li>
                <a href="#reporting" className={styles.tocLink}>
                  1. Reporting Copyright Infringement
                </a>
              </li>
              <li>
                <a href="#notice-requirements" className={styles.tocLink}>
                  2. DMCA Notice Requirements
                </a>
              </li>
              <li>
                <a href="#submitting" className={styles.tocLink}>
                  3. Submitting a DMCA Notice
                </a>
              </li>
              <li>
                <a href="#counter-notice" className={styles.tocLink}>
                  4. Counter-Notification
                </a>
              </li>
              <li>
                <a href="#repeat-infringers" className={styles.tocLink}>
                  5. Repeat Infringers
                </a>
              </li>
              <li>
                <a href="#designated-agent" className={styles.tocLink}>
                  6. Designated Agent
                </a>
              </li>
              <li>
                <a href="#misrepresentation" className={styles.tocLink}>
                  7. Misrepresentation
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.tocLink}>
                  8. Contact Information
                </a>
              </li>
            </ul>
          </nav>

          {/* DMCA Sections */}
          <div className={styles.dmcaSections}>
            <section id="reporting" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>
                1. Reporting Copyright Infringement
              </h2>
              <p>
                If you believe that your copyrighted work has been copied in a
                way that constitutes copyright infringement and is accessible
                through our service, you may notify our copyright agent, as set
                forth in the DMCA.
              </p>
              <p>
                Please note that under Section 512(f) of the DMCA, any person
                who knowingly materially misrepresents that material or activity
                is infringing may be subject to liability.
              </p>
            </section>

            <section id="notice-requirements" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>
                2. DMCA Notice Requirements
              </h2>
              <p>
                To be effective, your DMCA infringement notification must
                include the following information:
              </p>
              <ol className={styles.requirementsList}>
                <li>
                  <strong>A physical or electronic signature</strong> of a
                  person authorized to act on behalf of the owner of an
                  exclusive right that is allegedly infringed
                </li>
                <li>
                  <strong>
                    Identification of the copyrighted work claimed to have been
                    infringed
                  </strong>
                  , or, if multiple copyrighted works are covered by a single
                  notification, a representative list of such works
                </li>
                <li>
                  <strong>
                    Identification of the material that is claimed to be
                    infringing
                  </strong>
                  or to be the subject of infringing activity and that is to be
                  removed or access to which is to be disabled, and information
                  reasonably sufficient to permit us to locate the material
                </li>
                <li>
                  <strong>
                    Information reasonably sufficient to permit us to contact
                    you
                  </strong>
                  , such as an address, telephone number, and, if available, an
                  email address
                </li>
                <li>
                  <strong>A statement that you have a good faith belief</strong>{' '}
                  that use of the material in the manner complained of is not
                  authorized by the copyright owner, its agent, or the law
                </li>
                <li>
                  <strong>
                    A statement that the information in the notification is
                    accurate
                  </strong>
                  , and under penalty of perjury, that you are authorized to act
                  on behalf of the owner of an exclusive right that is allegedly
                  infringed
                </li>
              </ol>
            </section>

            <section id="submitting" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>
                3. Submitting a DMCA Notice
              </h2>
              <p>
                DMCA infringement notifications should be sent to our designated
                agent:
              </p>

              <div className={styles.submissionInfo}>
                <div className={styles.submissionMethod}>
                  <h3 className={styles.methodTitle}>By Email (Preferred)</h3>
                  <p className={styles.methodDetail}>dmca@thirstysounds.com</p>
                </div>

                <div className={styles.submissionMethod}>
                  <h3 className={styles.methodTitle}>By Mail</h3>
                  <p className={styles.methodDetail}>
                    DMCA Agent
                    <br />
                    ThirstySounds
                    <br />
                    123 Copyright Avenue
                    <br />
                    Legal City, LC 10101
                  </p>
                </div>
              </div>

              <div className={styles.processingInfo}>
                <h3 className={styles.processingTitle}>Processing Time</h3>
                <p>
                  We typically respond to valid DMCA notices within 24-48 hours.
                  Upon receipt of a valid DMCA notice, we will remove or disable
                  access to the allegedly infringing material.
                </p>
              </div>
            </section>

            <section id="counter-notice" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>4. Counter-Notification</h2>
              <p>
                If you believe that your material was removed or disabled by
                mistake or misidentification, you may submit a
                counter-notification. To be effective, your counter-notification
                must include:
              </p>
              <ul className={styles.counterList}>
                <li>Your physical or electronic signature</li>
                <li>
                  Identification of the material that has been removed or to
                  which access has been disabled
                </li>
                <li>
                  A statement under penalty of perjury that you have a good
                  faith belief that the material was removed or disabled as a
                  result of mistake or misidentification
                </li>
                <li>Your name, address, and telephone number</li>
                <li>
                  A statement that you consent to the jurisdiction of the
                  Federal District Court for the judicial district in which your
                  address is located
                </li>
              </ul>
              <p>
                If we receive a valid counter-notification, we may forward it to
                the original complainant. If we do not receive notice within 10
                business days that the original complainant is seeking a court
                order to prevent further infringement, we may replace or restore
                access to the material.
              </p>
            </section>

            <section id="repeat-infringers" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>5. Repeat Infringers</h2>
              <p>
                It is our policy to terminate, in appropriate circumstances, the
                accounts of users who are repeat infringers of copyright. We
                reserve the right to terminate accounts that we determine, in
                our sole discretion, are repeatedly infringing the copyrights of
                others.
              </p>
            </section>

            <section id="designated-agent" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>6. Designated Agent</h2>
              <p>
                Our designated agent to receive notification of alleged
                copyright infringement on the ThirstySounds website is:
              </p>
              <div className={styles.agentInfo}>
                <p>
                  <strong>Name:</strong> DMCA Compliance Agent
                </p>
                <p>
                  <strong>Email:</strong> dmca@thirstysounds.com
                </p>
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Copyright Avenue, Legal City, LC
                  10101
                </p>
              </div>
            </section>

            <section id="misrepresentation" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>7. Misrepresentation</h2>
              <p>
                Please note that under Section 512(f) of the DMCA, any person
                who knowingly materially misrepresents that material or activity
                is infringing may be subject to liability for damages. This
                includes attorneys' fees and costs incurred by the alleged
                infringer, by any copyright owner or copyright owner's
                authorized licensee, or by a service provider who is injured by
                such misrepresentation.
              </p>
              <div className={styles.warningBox}>
                <div className={styles.warningIcon}>❗</div>
                <p className={styles.warningText}>
                  <strong>Warning:</strong> Submitting false DMCA notices may
                  result in legal consequences, including monetary damages and
                  attorneys' fees.
                </p>
              </div>
            </section>

            <section id="contact" className={styles.dmcaSection}>
              <h2 className={styles.sectionTitle}>8. Contact Information</h2>
              <p>For all DMCA-related inquiries, please contact:</p>
              <div className={styles.contactDetails}>
                <div className={styles.contactMethod}>
                  <h3 className={styles.contactTitle}>Primary Contact</h3>
                  <p>
                    DMCA Agent
                    <br />
                    dmca@thirstysounds.com
                    <br />
                    (555) 123-4567
                  </p>
                </div>

                <div className={styles.contactMethod}>
                  <h3 className={styles.contactTitle}>Mailing Address</h3>
                  <p>
                    ThirstySounds DMCA Department
                    <br />
                    123 Copyright Avenue
                    <br />
                    Legal City, LC 10101
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <p className={styles.responseTime}>
                <strong>Response Time:</strong> We aim to respond to all valid
                DMCA notices within 24-48 hours during business days
                (Monday-Friday, 9 AM - 5 PM EST).
              </p>
            </section>
          </div>

          {/* Action Section */}
          <div className={styles.actionSection}>
            <div className={styles.actionBox}>
              <h3 className={styles.actionTitle}>
                Need to File a DMCA Notice?
              </h3>
              <p className={styles.actionText}>
                Use our online DMCA notice form for faster processing:
              </p>
              <div className={styles.actionButtons}>
                <a
                  href="mailto:dmca@thirstysounds.com?subject=DMCA%20Infringement%20Notice"
                  className={styles.emailButton}
                >
                  Send DMCA Notice via Email
                </a>
                <Link to="/contact" className={styles.contactButton}>
                  Contact Support
                </Link>
                <Link to="/" className={styles.homeButton}>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className={styles.legalDisclaimer}>
            <p className={styles.disclaimerText}>
              <strong>Legal Disclaimer:</strong> This DMCA policy is provided
              for informational purposes only and does not constitute legal
              advice. If you have specific legal questions regarding copyright
              infringement, please consult with a qualified attorney.
            </p>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
