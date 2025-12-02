import { useState } from 'react';
import styles from './TakedownForm.module.css';

const RELATIONSHIP_OPTIONS = [
  {
    id: 'copyright_holder',
    label: 'Copyright Holder',
    description: 'I own the copyright to the content',
  },
  {
    id: 'authorized_agent',
    label: 'Authorized Agent',
    description: 'I represent the copyright holder',
  },
  {
    id: 'rights_owner',
    label: 'Rights Owner',
    description: 'I own other intellectual property rights',
  },
  {
    id: 'trademark_owner',
    label: 'Trademark Owner',
    description: 'I own trademark rights',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'I have another legitimate claim',
  },
];

export default function TakedownForm({
  formData,
  onChange,
  errors = {},
  disabled = false,
}) {
  const [charCount, setCharCount] = useState(formData.reason.length || 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'reason') {
      setCharCount(value.length);
    }

    onChange(name, value);
  };

  const handleRelationshipChange = (relationshipId) => {
    onChange('requester_relationship', relationshipId);
  };

  const handleLegalAgreeChange = (e) => {
    onChange('legal_agreed', e.target.checked);
  };

  return (
    <div className={styles.takedownForm}>
      <form className={styles.form}>
        {/* Section 1: Personal Information */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Your Information</h3>
            <p className={styles.sectionDescription}>
              Please provide your contact information. This is required for us
              to process your request.
            </p>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="requester_name" className={styles.formLabel}>
                Full Name
                <span className={styles.required}> *</span>
              </label>
              <input
                type="text"
                id="requester_name"
                name="requester_name"
                value={formData.requester_name || ''}
                onChange={handleInputChange}
                className={`${styles.formInput} ${
                  errors.requester_name ? styles.inputError : ''
                }`}
                placeholder="John Doe"
                required
                disabled={disabled}
                aria-describedby={
                  errors.requester_name ? 'name-error' : undefined
                } // ← LOOK FOR THIS LINE
              />
              {errors.requester_name && (
                <p id="name-error" className={styles.errorMessage}>
                  {errors.requester_name}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="requester_email" className={styles.formLabel}>
                Email Address
                <span className={styles.required}> *</span>
              </label>
              <input
                type="email"
                id="requester_email"
                name="requester_email"
                value={formData.requester_email || ''}
                onChange={handleInputChange}
                className={`${styles.formInput} ${
                  errors.requester_email ? styles.inputError : ''
                }`}
                placeholder="john@example.com"
                required
                disabled={disabled}
                aria-describedby={
                  errors.requester_email ? 'email-error' : undefined
                } // ← LOOK FOR THIS LINE
              />
              {errors.requester_email && (
                <p id="email-error" className={styles.errorMessage}>
                  {errors.requester_email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Relationship to Content */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              Your Relationship to the Content
            </h3>
            <p className={styles.sectionDescription}>
              Please select your relationship to the content you're reporting.
            </p>
          </div>

          <div className={styles.relationshipOptions}>
            {RELATIONSHIP_OPTIONS.map((option) => (
              <div key={option.id} className={styles.relationshipOption}>
                <input
                  type="radio"
                  id={`relationship-${option.id}`}
                  name="requester_relationship"
                  checked={formData.requester_relationship === option.id}
                  onChange={() => handleRelationshipChange(option.id)}
                  className={styles.radioInput}
                  disabled={disabled}
                  aria-describedby={
                    errors.requester_relationship
                      ? 'relationship-error'
                      : undefined
                  } // ← LOOK FOR THIS LINE
                />
                <label
                  htmlFor={`relationship-${option.id}`}
                  className={styles.relationshipLabel}
                >
                  <span className={styles.relationshipRadio}></span>
                  <div className={styles.relationshipContent}>
                    <span className={styles.relationshipTitle}>
                      {option.label}
                    </span>
                    <span className={styles.relationshipDescription}>
                      {option.description}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {errors.requester_relationship && (
            <p id="relationship-error" className={styles.errorMessage}>
              {errors.requester_relationship}
            </p>
          )}
        </div>

        {/* Section 3: Reason for Takedown */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Reason for Takedown Request</h3>
            <p className={styles.sectionDescription}>
              Please provide a detailed explanation of why you believe this
              content should be removed.
            </p>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.textareaHeader}>
              <label htmlFor="reason" className={styles.formLabel}>
                Detailed Explanation
                <span className={styles.required}> *</span>
              </label>
              <span className={styles.charCount}>
                {charCount} / 5000 characters
              </span>
            </div>

            <textarea
              id="reason"
              name="reason"
              value={formData.reason || ''}
              onChange={handleInputChange}
              className={`${styles.formTextarea} ${
                errors.reason ? styles.inputError : ''
              }`}
              placeholder="Please describe in detail why you believe this content infringes your rights..."
              rows="8"
              maxLength="5000"
              required
              disabled={disabled}
              aria-describedby={errors.reason ? 'reason-error' : undefined} // ← LOOK FOR THIS LINE
            />

            {errors.reason && (
              <p id="reason-error" className={styles.errorMessage}>
                {errors.reason}
              </p>
            )}

            <div className={styles.textareaTips}>
              <strong>Include specific details such as:</strong>
              <ul>
                <li>Why you believe the content infringes your rights</li>
                <li>Specific copyrights or trademarks involved</li>
                <li>URLs or references to the infringing material</li>
                <li>Any relevant registration numbers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Legal Agreement */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Legal Declaration</h3>
            <p className={styles.sectionDescription}>
              Please read and agree to the following statements.
            </p>
          </div>

          <div className={styles.legalAgreement}>
            <div className={styles.legalText}>
              <p>
                <strong>Good Faith Belief:</strong> I have a good faith belief
                that the use of the material in the manner complained of is not
                authorized by the copyright owner, its agent, or the law.
              </p>

              <p>
                <strong>Accuracy:</strong> The information in this notification
                is accurate, and under penalty of perjury, I am authorized to
                act on behalf of the owner of an exclusive right that is
                allegedly infringed.
              </p>

              <p>
                <strong>Legal Consequences:</strong> I understand that making a
                false claim may result in legal liability for damages, including
                costs and attorney's fees.
              </p>
            </div>

            <div className={styles.legalCheckbox}>
              <input
                type="checkbox"
                id="legal_agreed"
                name="legal_agreed"
                checked={formData.legal_agreed || false}
                onChange={handleLegalAgreeChange}
                className={styles.checkboxInput}
                disabled={disabled}
                aria-describedby={
                  errors.legal_agreed ? 'legal-error' : undefined
                } // ← LOOK FOR THIS LINE
              />{' '}
              <label htmlFor="legal_agreed" className={styles.checkboxLabel}>
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>
                  I have read and agree to the above statements. I understand
                  that making a false claim may have legal consequences.
                  <span className={styles.required}> *</span>
                </span>
              </label>
            </div>

            {errors.legal_agreed && (
              <p id="legal-error" className={styles.errorMessage}>
                {errors.legal_agreed}
              </p>
            )}
          </div>
        </div>

        {/* Form Notes */}
        <div className={styles.formNotes}>
          <div className={styles.noteIcon}>ℹ️</div>
          <div className={styles.noteContent}>
            <p>
              <strong>Important:</strong> All fields marked with{' '}
              <span className={styles.required}>*</span> are required. We will
              review your request and respond via email. This process may take
              up to 7 business days.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
