// src/components/AgeVerificationGate/AgeVerificationGate.jsx
import { useState, useEffect } from 'react';
import styles from './AgeVerificationGate.module.css';

export default function AgeVerificationGate({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUnderageMessage, setShowUnderageMessage] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Check verification on component mount
  useEffect(() => {
    const checkVerification = () => {
      try {
        const verified = localStorage.getItem('ageVerified');
        const timestamp = localStorage.getItem('ageVerifiedTimestamp');

        // Check if verification is older than 30 days (optional re-verification)
        if (timestamp) {
          const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
          const isExpired = Date.now() - parseInt(timestamp) > THIRTY_DAYS;

          if (isExpired) {
            localStorage.removeItem('ageVerified');
            localStorage.removeItem('ageVerifiedTimestamp');
            setIsVerified(false);
          } else {
            setIsVerified(true);
          }
        } else if (verified === 'true') {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Error checking age verification:', error);
        // If localStorage fails, treat as not verified
        setIsVerified(false);
      } finally {
        // Small delay for better UX
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
      }
    };

    checkVerification();
  }, []);

  const handleVerify = (verified) => {
    if (verified) {
      // User is 18+
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('ageVerifiedTimestamp', Date.now().toString());
      setIsVerified(true);

      // Optional: Send analytics event
      console.log('User verified age as 18+');
    } else {
      // User is underage
      setShowUnderageMessage(true);

      // Optional: Log exit attempt
      console.log('User declined age verification (likely under 18)');

      // Redirect after a delay
      setTimeout(() => {
        setIsExiting(true);
        // Redirect to a safe site
        setTimeout(() => {
          window.location.href = 'https://www.google.com';
        }, 1000);
      }, 2000);
    }
  };

  const handleExitSite = () => {
    // Clear verification and redirect
    localStorage.removeItem('ageVerified');
    localStorage.removeItem('ageVerifiedTimestamp');
    setIsExiting(true);

    setTimeout(() => {
      window.location.href = 'https://www.google.com';
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </div>
    );
  }

  if (isExiting) {
    return (
      <div className={styles.container}>
        <div className={styles.exitOverlay}>
          <div className={styles.exitAnimation}></div>
          <p className={styles.exitText}>Redirecting to a safe site...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className={styles.container}>
        {showUnderageMessage ? (
          <div className={styles.underageMessage}>
            <div className={styles.messageIcon}>🚫</div>
            <h2 className={styles.messageTitle}>Access Denied</h2>
            <p className={styles.messageText}>
              You must be 18 years or older to access this content.
            </p>
            <p className={styles.messageSubtext}>
              You are being redirected to a safe website.
            </p>
          </div>
        ) : (
          <div className={styles.verificationCard}>
            {/* Header */}
            <div className={styles.header}>
              <h1 className={styles.siteTitle}>ThirstySounds</h1>
              <div className={styles.warningBadge}>
                <span className={styles.warningIcon}>⚠️</span>
                <span className={styles.warningText}>18+</span>
              </div>
            </div>

            {/* Main Content */}
            <div className={styles.content}>
              <h2 className={styles.title}>Age Verification Required</h2>

              <div className={styles.warningSection}>
                <p className={styles.warningDescription}>
                  This website contains explicit audio content intended for
                  adults only.
                </p>
                <div className={styles.ageRequirement}>
                  <span className={styles.ageIcon}>🔞</span>
                  <span className={styles.ageText}>
                    You must be 18 years or older to enter
                  </span>
                </div>
              </div>

              <div className={styles.requirementsSection}>
                <h3 className={styles.requirementsTitle}>
                  By entering this site, you confirm:
                </h3>
                <ul className={styles.requirementsList}>
                  <li className={styles.requirementItem}>
                    <span className={styles.checkIcon}>✓</span>
                    You are at least 18 years old
                  </li>
                  <li className={styles.requirementItem}>
                    <span className={styles.checkIcon}>✓</span>
                    You wish to access adult-oriented content
                  </li>
                  <li className={styles.requirementItem}>
                    <span className={styles.checkIcon}>✓</span>
                    You accept our{' '}
                    <a href="/terms" className={styles.legalLink}>
                      Terms of Service
                    </a>
                  </li>
                  <li className={styles.requirementItem}>
                    <span className={styles.checkIcon}>✓</span>
                    You have read our{' '}
                    <a href="/privacy" className={styles.legalLink}>
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.legalDisclaimer}>
                <p>
                  Any unauthorized access or misrepresentation of age is
                  strictly prohibited and may result in legal action.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button
                onClick={() => handleVerify(true)}
                className={styles.enterButton}
                autoFocus
              >
                <span className={styles.buttonIcon}>✅</span>I am 18 or older -
                Enter Site
              </button>

              <button
                onClick={() => handleVerify(false)}
                className={styles.exitButton}
              >
                <span className={styles.buttonIcon}>❌</span>I am under 18 -
                Exit Site
              </button>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.footerText}>
                This age verification is required by law. Your verification
                status is stored locally on your device and is not shared with
                third parties.
              </p>
              <p className={styles.footerNote}>
                Need to report an issue?{' '}
                <a href="/contact" className={styles.footerLink}>
                  Contact us
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Verified users see the app content
  return (
    <>
      {children}

      {/* Optional: Add a discreet exit button for verified users */}
      <button
        onClick={handleExitSite}
        className={styles.floatingExitButton}
        title="Exit site (clears age verification)"
        aria-label="Exit site and clear age verification"
      >
        🚪 Exit
      </button>
    </>
  );
}
