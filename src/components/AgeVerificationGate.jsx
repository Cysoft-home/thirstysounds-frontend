// src/components/AgeVerificationGate.jsx
import { useState, useEffect } from 'react';
import styles from './AgeVerificationGate.module.css';

export default function AgeVerificationGate({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUnderageMessage, setShowUnderageMessage] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Constants
  const VERIFICATION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const STORAGE_KEYS = {
    VERIFIED: 'ageVerified',
    TIMESTAMP: 'ageVerifiedTimestamp',
  };

  // Check verification on component mount
  useEffect(() => {
    const checkVerification = () => {
      try {
        const verified = localStorage.getItem(STORAGE_KEYS.VERIFIED);
        const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);

        console.log('🔍 Age Verification Check:', { verified, timestamp });

        if (timestamp) {
          const verificationTime = parseInt(timestamp);
          const currentTime = Date.now();
          const timeElapsed = currentTime - verificationTime;
          const isExpired = timeElapsed > VERIFICATION_DURATION;

          console.log('⏰ Time Check:', {
            verificationTime: new Date(verificationTime).toLocaleString(),
            currentTime: new Date(currentTime).toLocaleString(),
            timeElapsed: Math.floor(timeElapsed / (60 * 60 * 1000)) + ' hours',
            isExpired,
            VERIFICATION_DURATION: '24 hours',
          });

          if (isExpired) {
            // Verification expired - clear and require re-verification
            console.log('⏳ Verification expired after 24 hours');
            localStorage.removeItem(STORAGE_KEYS.VERIFIED);
            localStorage.removeItem(STORAGE_KEYS.TIMESTAMP);
            setIsVerified(false);

            // Calculate time until next verification (for UI display)
            const nextVerificationTime =
              verificationTime + VERIFICATION_DURATION;
            setTimeRemaining(nextVerificationTime - currentTime);
          } else {
            // Still valid
            setIsVerified(true);

            // Calculate time until expiration
            const timeUntilExpiry = VERIFICATION_DURATION - timeElapsed;
            setTimeRemaining(timeUntilExpiry);

            console.log(
              '✅ Verification valid for',
              Math.floor(timeUntilExpiry / (60 * 60 * 1000)) + ' more hours'
            );
          }
        } else if (verified === 'true') {
          // Legacy format (without timestamp) - treat as expired
          console.log(
            '🔄 Legacy verification found, requiring re-verification'
          );
          localStorage.removeItem(STORAGE_KEYS.VERIFIED);
          setIsVerified(false);
        } else {
          // No verification found
          setIsVerified(false);
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

  // Update time remaining every minute
  useEffect(() => {
    if (!isVerified || !timeRemaining) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 60000) {
          // Less than 1 minute
          // Trigger re-verification
          localStorage.removeItem(STORAGE_KEYS.VERIFIED);
          localStorage.removeItem(STORAGE_KEYS.TIMESTAMP);
          setIsVerified(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 60000; // Subtract 1 minute
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isVerified, timeRemaining]);

  const handleVerify = (verified) => {
    if (verified) {
      // User is 18+
      const timestamp = Date.now();
      localStorage.setItem(STORAGE_KEYS.VERIFIED, 'true');
      localStorage.setItem(STORAGE_KEYS.TIMESTAMP, timestamp.toString());
      setIsVerified(true);
      setTimeRemaining(VERIFICATION_DURATION);

      console.log(
        '✅ Age verified for 24 hours. Next verification at:',
        new Date(timestamp + VERIFICATION_DURATION).toLocaleString()
      );
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

  const handleExtendVerification = () => {
    // Re-verify to extend another 24 hours
    console.log('User extending verification for another 24 hours');
    handleVerify(true);
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
              <h2 className={styles.title}>
                {timeRemaining
                  ? 'Verification Expired'
                  : 'Age Verification Required'}
              </h2>

              {timeRemaining && (
                <div className={styles.expiryNotice}>
                  <div className={styles.clockIcon}>⏰</div>
                  <p className={styles.expiryText}>
                    Your age verification has expired. Please verify again to
                    continue.
                  </p>
                  <p className={styles.expirySubtext}>
                    Verification is required every 24 hours for your safety.
                  </p>
                </div>
              )}

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
                <p className={styles.verificationNote}>
                  <strong>Note:</strong> Age verification is required every 24
                  hours.
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
                <span className={styles.buttonIcon}>✅</span>
                {timeRemaining
                  ? 'Verify Again - Enter Site'
                  : 'I am 18 or older - Enter Site'}
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
                <strong>24-Hour Policy:</strong> Verification expires every 24
                hours for safety. Need to report an issue?{' '}
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

  // Verified users see the app content - NO TIMER OR EXIT BUTTON DISPLAYED
  return <>{children}</>;
}
