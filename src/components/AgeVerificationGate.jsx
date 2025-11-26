import { useState, useEffect } from 'react';
import styles from './AgeVerificationGate.module.css';

export default function AgeVerificationGate({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already verified
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsVerified(true);
    }
    setIsLoading(false);
  }, []);

  const handleVerify = (verified) => {
    if (verified) {
      localStorage.setItem('ageVerified', 'true');
      setIsVerified(true);
    } else {
      alert('You must be 18 or older to access this content.');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>ThirstySounds</h1>
            <p className={styles.subtitle}>Adult Content Warning</p>
          </div>

          <div className={styles.content}>
            <p className={styles.description}>
              This website contains adult content. By entering, you confirm
              that:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>You are at least 18 years old</li>
              <li className={styles.listItem}>
                You agree to view adult content
              </li>
              <li className={styles.listItem}>
                You accept our Terms of Service
              </li>
            </ul>
          </div>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleVerify(true)}
              className={styles.buttonPrimary}
            >
              I am 18 or older - Enter
            </button>
            <button
              onClick={() => handleVerify(false)}
              className={styles.buttonSecondary}
            >
              I am under 18 - Exit
            </button>
          </div>

          <p className={styles.footer}>
            By entering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
