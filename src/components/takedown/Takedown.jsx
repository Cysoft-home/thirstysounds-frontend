import { useState } from 'react';
import { Link } from 'react-router-dom';
// Update these imports based on your actual file structure
import Navigation from '../Navigation'; // Adjust path as needed
import Footer from '../ui/Footer'; // Adjust path as needed
import AudioSearch from './AudioSearch';
import TakedownForm from './TakedownForm';
import EvidenceUpload from './EvidenceUpload';
import ReviewSubmit from './ReviewSubmit';
import styles from './Takedown.module.css';

export default function Takedown() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [formData, setFormData] = useState({
    requester_name: '',
    requester_email: '',
    requester_relationship: '',
    reason: '',
    legal_agreed: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const steps = [
    {
      number: 1,
      title: 'Find Audio',
      description: 'Search and select the audio content',
    },
    {
      number: 2,
      title: 'Verify Audio',
      description: 'Confirm this is the correct content',
    },
    {
      number: 3,
      title: 'Fill Form',
      description: 'Provide your information and reason',
    },
    {
      number: 4,
      title: 'Add Evidence',
      description: 'Upload supporting documents (optional)',
    },
    {
      number: 5,
      title: 'Review & Submit',
      description: 'Review and submit your request',
    },
  ];

  // Validate step before proceeding
  const validateStep = (step) => {
    const errors = {};

    if (step === 1 && !selectedAudio) {
      return { step: 'Please select an audio file to continue.' };
    }

    if (step === 3) {
      if (!formData.requester_name) errors.requester_name = 'Name is required';
      if (!formData.requester_email)
        errors.requester_email = 'Email is required';
      if (!formData.requester_relationship)
        errors.requester_relationship = 'Relationship is required';
      if (!formData.reason) errors.reason = 'Reason is required';
      if (!formData.legal_agreed)
        errors.legal_agreed = 'You must agree to the legal declaration';

      // Email validation
      if (
        formData.requester_email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.requester_email)
      ) {
        errors.requester_email = 'Please enter a valid email address';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return errors;
    }

    setFormErrors({});
    return null;
  };

  const handleNextStep = () => {
    const errors = validateStep(currentStep);
    if (errors) {
      // Show error message
      if (errors.step) {
        alert(errors.step);
      }
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle final submission
  // In Takedown.jsx, update the handleSubmit function:

  // Handle final submission
  const handleSubmit = async (submissionData) => {
    setIsSubmitting(true);

    try {
      // Use environment variable for API URL
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

      // Prepare submission data according to your serializer
      const payload = {
        audio: submissionData.audio,
        requester_name: submissionData.requester_name,
        requester_email: submissionData.requester_email,
        requester_relationship: submissionData.requester_relationship,
        reason: submissionData.reason,
        // Note: evidence_file will be handled separately if you're uploading files
      };

      console.log('Submitting takedown request:', payload);
      console.log('API URL:', `${apiUrl}/audio/takedown/submit/`);

      const response = await fetch(`${apiUrl}/audio/takedown/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(
          `Submission failed: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log('Submission success:', result);

      setSubmissionResult({
        ...result.data,
        id: result.data?.id || `TR-${Date.now()}`,
        message: result.message || 'Takedown request submitted successfully!',
        submitted_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Submission error:', error);

      // Show user-friendly error message
      setSubmissionResult({
        error: true,
        message:
          'Failed to submit takedown request. Please try again or contact support.',
        details: error.message,
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedAudio(null);
    setFormData({
      requester_name: '',
      requester_email: '',
      requester_relationship: '',
      reason: '',
      legal_agreed: false,
    });
    setUploadedFiles([]);
    setFormErrors({});
    setSubmissionResult(null);
  };

  return (
    <div
      className={`${styles.takedownPage} ${
        darkMode ? styles.takedownPageDark : ''
      }`}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={styles.takedownContainer}>
        <div className={styles.takedownContent}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Takedown Request</span>
          </nav>

          {/* Header */}
          <header className={styles.takedownHeader}>
            <h1 className={styles.takedownTitle}>Submit Takedown Request</h1>
            <p className={styles.takedownSubtitle}>
              Use this form to report copyright infringement or other violations
              of our terms of service.
            </p>
          </header>

          {/* Steps Progress - Only show if not in success state */}
          {!submissionResult && (
            <div className={styles.stepsContainer}>
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`${styles.stepItem} ${
                    step.number === currentStep ? styles.stepItemActive : ''
                  } ${
                    step.number < currentStep ? styles.stepItemCompleted : ''
                  }`}
                >
                  <div className={styles.stepNumber}>
                    {step.number < currentStep ? (
                      <span className={styles.checkIcon}>✓</span>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step Content */}
          <div className={styles.stepContentContainer}>
            {!submissionResult ? (
              <>
                {currentStep === 1 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepContentTitle}>
                      Step 1: Find the Audio
                    </h2>
                    <p className={styles.stepContentDescription}>
                      Search for the audio content you want to report. You can
                      search by title, creator, or keywords.
                    </p>
                    <div className={styles.stepContentInner}>
                      <AudioSearch
                        onAudioSelect={setSelectedAudio}
                        selectedAudio={selectedAudio}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepContentTitle}>
                      Step 2: Verify Audio
                    </h2>
                    <p className={styles.stepContentDescription}>
                      Please verify that this is the correct audio content you
                      want to report.
                    </p>
                    <div className={styles.stepContentInner}>
                      {selectedAudio ? (
                        <div className={styles.audioVerification}>
                          <div className={styles.verificationHeader}>
                            <h3 className={styles.verificationTitle}>
                              Selected Audio
                            </h3>
                            <span className={styles.verificationBadge}>
                              ✓ Selected
                            </span>
                          </div>

                          <div className={styles.audioPreviewCard}>
                            <div className={styles.audioPreviewHeader}>
                              <span className={styles.audioIcon}>🎵</span>
                              <div className={styles.audioPreviewInfo}>
                                <h4 className={styles.audioPreviewTitle}>
                                  {selectedAudio.title}
                                </h4>
                                {selectedAudio.creator_name && (
                                  <p className={styles.audioPreviewCreator}>
                                    by {selectedAudio.creator_name}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className={styles.audioPreviewDetails}>
                              {selectedAudio.category && (
                                <div className={styles.audioDetail}>
                                  <span className={styles.detailLabel}>
                                    Category:
                                  </span>
                                  <span className={styles.detailValue}>
                                    {selectedAudio.category}
                                  </span>
                                </div>
                              )}

                              {selectedAudio.duration && (
                                <div className={styles.audioDetail}>
                                  <span className={styles.detailLabel}>
                                    Duration:
                                  </span>
                                  <span className={styles.detailValue}>
                                    {selectedAudio.duration}
                                  </span>
                                </div>
                              )}

                              {selectedAudio.created_at && (
                                <div className={styles.audioDetail}>
                                  <span className={styles.detailLabel}>
                                    Uploaded:
                                  </span>
                                  <span className={styles.detailValue}>
                                    {new Date(
                                      selectedAudio.created_at
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}

                              {selectedAudio.description && (
                                <div className={styles.audioDetail}>
                                  <span className={styles.detailLabel}>
                                    Description:
                                  </span>
                                  <span className={styles.detailValue}>
                                    {selectedAudio.description.length > 100
                                      ? selectedAudio.description.substring(
                                          0,
                                          100
                                        ) + '...'
                                      : selectedAudio.description}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className={styles.verificationActions}>
                              <button
                                type="button"
                                className={styles.verificationButton}
                                onClick={() => {
                                  // Play audio preview if available
                                  console.log('Play audio:', selectedAudio.id);
                                }}
                              >
                                🎧 Play Preview
                              </button>
                              <a
                                href={`/audio/${selectedAudio.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.viewDetailsButton}
                              >
                                🔍 View Full Details
                              </a>
                            </div>
                          </div>

                          <div className={styles.verificationConfirmation}>
                            <div className={styles.confirmationCheck}>
                              <input
                                type="checkbox"
                                id="audio-confirmation"
                                className={styles.confirmationCheckbox}
                              />
                              <label
                                htmlFor="audio-confirmation"
                                className={styles.confirmationLabel}
                              >
                                <span className={styles.checkboxCustom}></span>
                                <span className={styles.confirmationText}>
                                  I confirm this is the correct audio content I
                                  want to report.
                                </span>
                              </label>
                            </div>

                            <div className={styles.verificationNote}>
                              <span className={styles.noteIcon}>ℹ️</span>
                              <p className={styles.noteText}>
                                <strong>Important:</strong> Please verify this
                                is the exact audio you want to report. Reporting
                                incorrect content may delay the review process.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.noAudioSelected}>
                          <div className={styles.noAudioIcon}>⚠️</div>
                          <div className={styles.noAudioContent}>
                            <h3 className={styles.noAudioTitle}>
                              No Audio Selected
                            </h3>
                            <p className={styles.noAudioDescription}>
                              Please go back to Step 1 and select an audio file
                              to report.
                            </p>
                            <button
                              className={styles.backToSearchButton}
                              onClick={() => setCurrentStep(1)}
                            >
                              ← Back to Search
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepContentTitle}>
                      Step 3: Fill Takedown Form
                    </h2>
                    <p className={styles.stepContentDescription}>
                      Provide your information and the reason for this takedown
                      request.
                    </p>
                    <div className={styles.stepContentInner}>
                      <TakedownForm
                        formData={formData}
                        onChange={handleFormChange}
                        errors={formErrors}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepContentTitle}>
                      Step 4: Add Evidence (Optional)
                    </h2>
                    <p className={styles.stepContentDescription}>
                      Upload supporting documents that prove your claim (e.g.,
                      copyright certificates, authorization letters).
                    </p>
                    <div className={styles.stepContentInner}>
                      <EvidenceUpload
                        uploadedFiles={uploadedFiles}
                        onFilesChange={setUploadedFiles}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className={styles.stepContent}>
                    <h2 className={styles.stepContentTitle}>
                      Step 5: Review & Submit
                    </h2>
                    <p className={styles.stepContentDescription}>
                      Review all information before submitting your takedown
                      request.
                    </p>
                    <div className={styles.stepContentInner}>
                      <ReviewSubmit
                        selectedAudio={selectedAudio}
                        formData={formData}
                        uploadedFiles={uploadedFiles}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        submissionResult={submissionResult}
                      />
                    </div>
                  </div>
                )}

                {/* Step Navigation Buttons */}
                {currentStep !== 5 && (
                  <div className={styles.stepNavigation}>
                    {currentStep > 1 && (
                      <button
                        className={styles.prevButton}
                        onClick={handlePrevStep}
                        disabled={isSubmitting}
                      >
                        ← Previous Step
                      </button>
                    )}

                    <div className={styles.stepSpacer} />

                    <button
                      className={styles.nextButton}
                      onClick={handleNextStep}
                      disabled={isSubmitting}
                    >
                      {currentStep === steps.length - 1
                        ? 'Review & Submit →'
                        : 'Next Step →'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Success state - handled by ReviewSubmit component
              <div className={styles.stepContentInner}>
                <ReviewSubmit
                  selectedAudio={selectedAudio}
                  formData={formData}
                  uploadedFiles={uploadedFiles}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submissionResult={submissionResult}
                />

                <div className={styles.successActions}>
                  <button
                    className={styles.newRequestButton}
                    onClick={handleReset}
                  >
                    Submit Another Request
                  </button>
                  <Link to="/" className={styles.homeLink}>
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          {!submissionResult && (
            <div className={styles.helpSection}>
              <div className={styles.helpIcon}>ℹ️</div>
              <div className={styles.helpContent}>
                <h3 className={styles.helpTitle}>Need Help?</h3>
                <p className={styles.helpText}>
                  If you're unsure about any part of this process, please review
                  our{' '}
                  <Link to="/faq" className={styles.helpLink}>
                    FAQ
                  </Link>{' '}
                  or{' '}
                  <Link to="/contact" className={styles.helpLink}>
                    contact our legal team
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
