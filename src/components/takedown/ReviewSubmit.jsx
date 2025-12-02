import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ReviewSubmit.module.css';

const RELATIONSHIP_LABELS = {
  copyright_holder: 'Copyright Holder',
  authorized_agent: 'Authorized Agent',
  rights_owner: 'Rights Owner',
  trademark_owner: 'Trademark Owner',
  other: 'Other',
};

export default function ReviewSubmit({
  selectedAudio,
  formData,
  uploadedFiles,
  onSubmit,
  isSubmitting = false,
  submissionResult = null,
}) {
  const [submissionError, setSubmissionError] = useState(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📋';
    return '📎';
  };

  // Handle final submission
  const handleSubmit = async () => {
    setSubmissionError(null);

    // Validate required data
    if (!selectedAudio) {
      setSubmissionError('Please select an audio file to report.');
      return;
    }

    if (
      !formData.requester_name ||
      !formData.requester_email ||
      !formData.requester_relationship ||
      !formData.reason ||
      !formData.legal_agreed
    ) {
      setSubmissionError('Please complete all required fields in the form.');
      return;
    }

    try {
      // Prepare submission data
      const submissionData = {
        audio: selectedAudio.id,
        requester_name: formData.requester_name,
        requester_email: formData.requester_email,
        requester_relationship: formData.requester_relationship,
        reason: formData.reason,
        evidence_public_ids: uploadedFiles
          .filter((file) => file.public_id && file.status === 'completed')
          .map((file) => file.public_id),
      };

      await onSubmit(submissionData);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(
        error.message || 'Failed to submit takedown request. Please try again.'
      );
    }
  };

  // If submission was successful, show confirmation
  if (submissionResult) {
    return (
      <div className={styles.submissionSuccess}>
        <div className={styles.successIcon}>✅</div>
        <h2 className={styles.successTitle}>Takedown Request Submitted!</h2>

        <div className={styles.successDetails}>
          <div className={styles.referenceCard}>
            <div className={styles.referenceHeader}>
              <h3>Reference Information</h3>
            </div>
            <div className={styles.referenceContent}>
              <div className={styles.referenceItem}>
                <span className={styles.referenceLabel}>Reference ID:</span>
                <span className={styles.referenceValue}>
                  {submissionResult.id || 'TR-' + Date.now()}
                </span>
              </div>
              <div className={styles.referenceItem}>
                <span className={styles.referenceLabel}>Submitted:</span>
                <span className={styles.referenceValue}>
                  {new Date().toLocaleDateString()} at{' '}
                  {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.nextSteps}>
            <h3>What happens next?</h3>
            <ol className={styles.stepsList}>
              <li>
                <strong>Review Process:</strong> Our legal team will review your
                request within 3-5 business days.
              </li>
              <li>
                <strong>Email Confirmation:</strong> You will receive an email
                confirmation shortly (check your spam folder).
              </li>
              <li>
                <strong>Status Updates:</strong> We will notify you via email
                when your request is reviewed.
              </li>
              <li>
                <strong>Resolution:</strong> If approved, the content will be
                removed within 24 hours of approval.
              </li>
            </ol>
          </div>

          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              Return to Home
            </Link>
            <Link to="/contact" className={styles.contactButton}>
              Contact Support
            </Link>
          </div>

          <div className={styles.importantNotes}>
            <h4>Important Notes:</h4>
            <ul>
              <li>Keep your reference ID for future inquiries</li>
              <li>False claims may result in legal liability</li>
              <li>Counter-notifications may be filed by the uploader</li>
              <li>For emergencies, contact legal@thirstysounds.com</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.reviewSubmit}>
      {/* Header */}
      <div className={styles.reviewHeader}>
        <h2 className={styles.reviewTitle}>Review Your Request</h2>
        <p className={styles.reviewDescription}>
          Please review all information below before submitting your takedown
          request.
        </p>
      </div>

      {/* Review Sections */}
      <div className={styles.reviewSections}>
        {/* Section 1: Selected Audio */}
        <div className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Audio Content</h3>
            <span className={styles.sectionStatus}>
              {selectedAudio ? '✓ Selected' : '⚠️ Missing'}
            </span>
          </div>

          {selectedAudio ? (
            <div className={styles.audioReview}>
              <div className={styles.audioCard}>
                <div className={styles.audioIcon}>🎵</div>
                <div className={styles.audioDetails}>
                  <h4 className={styles.audioTitle}>{selectedAudio.title}</h4>
                  {selectedAudio.creator_name && (
                    <p className={styles.audioCreator}>
                      by {selectedAudio.creator_name}
                    </p>
                  )}
                  <div className={styles.audioMeta}>
                    {selectedAudio.category && (
                      <span className={styles.metaItem}>
                        Category: {selectedAudio.category}
                      </span>
                    )}
                    {selectedAudio.duration && (
                      <span className={styles.metaItem}>
                        Duration: {selectedAudio.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.missingData}>
              <span className={styles.warningIcon}>⚠️</span>
              <p>
                No audio selected. Please go back to Step 1 and select an audio
                file.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Requester Information */}
        <div className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Your Information</h3>
            <span className={styles.sectionStatus}>
              {formData.requester_name && formData.requester_email
                ? '✓ Complete'
                : '⚠️ Incomplete'}
            </span>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name:</span>
              <span className={styles.infoValue}>
                {formData.requester_name || 'Not provided'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>
                {formData.requester_email || 'Not provided'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Relationship:</span>
              <span className={styles.infoValue}>
                {formData.requester_relationship
                  ? RELATIONSHIP_LABELS[formData.requester_relationship]
                  : 'Not specified'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Reason for Takedown */}
        <div className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Reason for Request</h3>
            <span className={styles.sectionStatus}>
              {formData.reason ? '✓ Provided' : '⚠️ Missing'}
            </span>
          </div>

          <div className={styles.reasonReview}>
            {formData.reason ? (
              <>
                <div className={styles.reasonPreview}>
                  <p>
                    {formData.reason.length > 300
                      ? formData.reason.substring(0, 300) + '...'
                      : formData.reason}
                  </p>
                </div>
                <div className={styles.reasonStats}>
                  <span>{formData.reason.length} characters</span>
                </div>
              </>
            ) : (
              <div className={styles.missingData}>
                <span className={styles.warningIcon}>⚠️</span>
                <p>
                  No reason provided. Please go back to Step 3 and explain why
                  you're requesting this takedown.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Evidence Files */}
        <div className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Evidence Files</h3>
            <span className={styles.sectionStatus}>
              {uploadedFiles.length > 0
                ? `${uploadedFiles.length} files`
                : 'Optional'}
            </span>
          </div>

          {uploadedFiles.length > 0 ? (
            <div className={styles.filesReview}>
              <div className={styles.filesList}>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className={styles.fileReviewItem}>
                    <div className={styles.fileReviewIcon}>
                      {getFileIcon(file.type)}
                    </div>
                    <div className={styles.fileReviewDetails}>
                      <span className={styles.fileReviewName}>{file.name}</span>
                      <span className={styles.fileReviewSize}>
                        {formatFileSize(file.size)}
                      </span>
                      <span
                        className={`${styles.fileReviewStatus} ${
                          file.status === 'completed'
                            ? styles.statusSuccess
                            : file.status === 'uploading'
                            ? styles.statusUploading
                            : styles.statusFailed
                        }`}
                      >
                        {file.status === 'completed'
                          ? '✓ Uploaded'
                          : file.status === 'uploading'
                          ? '⏳ Uploading...'
                          : '⚠️ Failed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.noFiles}>
              <p>No evidence files uploaded. (Optional)</p>
            </div>
          )}
        </div>

        {/* Section 5: Legal Agreement */}
        <div className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Legal Declaration</h3>
            <span className={styles.sectionStatus}>
              {formData.legal_agreed ? '✓ Agreed' : '⚠️ Not Agreed'}
            </span>
          </div>

          <div className={styles.legalReview}>
            {formData.legal_agreed ? (
              <div className={styles.legalAgreed}>
                <span className={styles.checkIcon}>✓</span>
                <p>You have agreed to the legal declaration statements.</p>
              </div>
            ) : (
              <div className={styles.legalNotAgreed}>
                <span className={styles.warningIcon}>⚠️</span>
                <p>
                  You must agree to the legal declaration statements in Step 3.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {submissionError && (
        <div className={styles.errorAlert}>
          <span className={styles.errorIcon}>⚠️</span>
          <span className={styles.errorMessage}>{submissionError}</span>
        </div>
      )}

      {/* Final Actions */}
      <div className={styles.finalActions}>
        <div className={styles.legalReminder}>
          <p>
            <strong>By submitting this request, you confirm:</strong>
          </p>
          <ul>
            <li>
              All information provided is accurate to the best of your knowledge
            </li>
            <li>
              You have a good faith belief the content infringes your rights
            </li>
            <li>You understand false claims may have legal consequences</li>
          </ul>
        </div>

        <div className={styles.submitActions}>
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.submitSpinner}></span>
                Submitting...
              </>
            ) : (
              'Submit Takedown Request'
            )}
          </button>

          <p className={styles.submitNote}>
            Once submitted, you cannot edit this request. You will receive a
            confirmation email.
          </p>
        </div>
      </div>
    </div>
  );
}
