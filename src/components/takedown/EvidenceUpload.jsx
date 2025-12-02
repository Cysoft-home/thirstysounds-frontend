import { useState, useCallback } from 'react';
import styles from './EvidenceUpload.module.css';

// Valid file types based on your serializer
const VALID_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'text/plain',
];

const MAX_FILE_SIZE = 10485760; // 10MB in bytes

export default function EvidenceUpload({
  uploadedFiles,
  onFilesChange,
  disabled = false,
}) {
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  // Validate file before upload
  const validateFile = (file) => {
    const errors = [];

    // Check file type
    if (!VALID_FILE_TYPES.includes(file.type)) {
      const allowedExtensions = [
        '.pdf',
        '.doc',
        '.docx',
        '.jpg',
        '.jpeg',
        '.png',
        '.txt',
      ];
      errors.push(
        `Invalid file type. Allowed: ${allowedExtensions.join(', ')}`
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File too large. Maximum size is 10MB.`);
    }

    return errors;
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'takedown_evidence'
      );
      formData.append('folder', 'takedown_evidence');
      formData.append('resource_type', 'auto');

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            name: file.name,
            type: file.type,
            size: file.size,
            public_id: response.public_id,
            url: response.secure_url,
            format: response.format,
            uploaded_at: new Date().toISOString(),
          });
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
        // Clean up progress tracking
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
      });

      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${
          process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'
        }/upload`
      );
      xhr.send(formData);
    });
  };

  // Handle file selection
  const handleFileSelect = async (files) => {
    const newFiles = Array.from(files);
    const newUploadedFiles = [...uploadedFiles];
    const newErrors = { ...uploadErrors };

    for (const file of newFiles) {
      // Validate file
      const validationErrors = validateFile(file);

      if (validationErrors.length > 0) {
        newErrors[file.name] = validationErrors;
        setUploadErrors(newErrors);
        continue;
      }

      // Check for duplicate files
      if (uploadedFiles.some((f) => f.name === file.name)) {
        newErrors[file.name] = ['File already uploaded.'];
        setUploadErrors(newErrors);
        continue;
      }

      try {
        // Add temporary placeholder
        const tempFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          public_id: null,
          url: null,
          status: 'uploading',
        };

        newUploadedFiles.push(tempFile);
        onFilesChange(newUploadedFiles);

        // Upload to Cloudinary
        const uploadedFile = await uploadToCloudinary(file);

        // Update with Cloudinary response
        const updatedFiles = newUploadedFiles.map((f) =>
          f.name === file.name ? { ...uploadedFile, status: 'completed' } : f
        );

        onFilesChange(updatedFiles);

        // Clear any previous errors for this file
        if (newErrors[file.name]) {
          delete newErrors[file.name];
          setUploadErrors(newErrors);
        }
      } catch (error) {
        console.error('Upload failed:', error);

        // Update file status to failed
        const updatedFiles = newUploadedFiles.map((f) =>
          f.name === file.name
            ? { ...f, status: 'failed', error: error.message }
            : f
        );

        onFilesChange(updatedFiles);
        newErrors[file.name] = [error.message];
        setUploadErrors(newErrors);
      }
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files);
    e.target.value = ''; // Reset input
  };

  // Handle drag and drop
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, []);

  // Remove file
  const handleRemoveFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);

    // Clear errors for removed file
    const fileName = uploadedFiles[index].name;
    if (uploadErrors[fileName]) {
      const newErrors = { ...uploadErrors };
      delete newErrors[fileName];
      setUploadErrors(newErrors);
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📋';
    return '📎';
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.evidenceUpload}>
      {/* Upload Area */}
      <div className={styles.uploadSection}>
        <div className={styles.uploadHeader}>
          <h3 className={styles.uploadTitle}>Upload Evidence (Optional)</h3>
          <p className={styles.uploadDescription}>
            Upload supporting documents that prove your claim. Max 10MB per
            file.
          </p>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`${styles.dropZone} ${
            isDragging ? styles.dropZoneDragging : ''
          } ${disabled ? styles.dropZoneDisabled : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() =>
            !disabled && document.getElementById('file-input')?.click()
          }
          role="button"
          tabIndex={0}
          aria-label="Click or drag and drop files to upload evidence"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.getElementById('file-input')?.click();
            }
          }}
        >
          <div className={styles.dropZoneContent}>
            <div className={styles.dropZoneIcon}>📎</div>
            <div className={styles.dropZoneText}>
              <p className={styles.dropZoneTitle}>
                {isDragging
                  ? 'Drop files here'
                  : 'Click or drag files to upload'}
              </p>
              <p className={styles.dropZoneSubtitle}>
                PDF, Word, Images, Text files up to 10MB each
              </p>
            </div>
            <button
              type="button"
              className={styles.browseButton}
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('file-input')?.click();
              }}
              disabled={disabled}
            >
              Browse Files
            </button>
          </div>

          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            onChange={handleFileInputChange}
            className={styles.fileInput}
            disabled={disabled}
            aria-label="Select evidence files"
          />
        </div>

        {/* File Requirements */}
        <div className={styles.requirements}>
          <h4 className={styles.requirementsTitle}>Accepted Files:</h4>
          <ul className={styles.requirementsList}>
            <li>PDF documents (.pdf)</li>
            <li>Word documents (.doc, .docx)</li>
            <li>Images (.jpg, .jpeg, .png)</li>
            <li>Text files (.txt)</li>
          </ul>
          <p className={styles.sizeLimit}>Maximum size: 10MB per file</p>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className={styles.filesSection}>
          <div className={styles.filesHeader}>
            <h3 className={styles.filesTitle}>
              Uploaded Files ({uploadedFiles.length})
            </h3>
            {uploadedFiles.length > 0 && (
              <button
                type="button"
                className={styles.clearAllButton}
                onClick={() => onFilesChange([])}
                disabled={disabled}
              >
                Clear All
              </button>
            )}
          </div>

          <div className={styles.filesList}>
            {uploadedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className={`${styles.fileItem} ${
                  file.status === 'failed' ? styles.fileItemError : ''
                }`}
              >
                <div className={styles.fileInfo}>
                  <div className={styles.fileIcon}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className={styles.fileDetails}>
                    <div className={styles.fileHeader}>
                      <span className={styles.fileName}>{file.name}</span>
                      <span className={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </span>
                    </div>

                    <div className={styles.fileStatus}>
                      {file.status === 'uploading' ? (
                        <div className={styles.uploadProgress}>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{
                                width: `${uploadProgress[file.name] || 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className={styles.progressText}>
                            {uploadProgress[file.name] || 0}%
                          </span>
                        </div>
                      ) : file.status === 'completed' ? (
                        <div className={styles.uploadSuccess}>
                          <span className={styles.successIcon}>✓</span>
                          <span className={styles.successText}>
                            Uploaded to Cloudinary
                          </span>
                        </div>
                      ) : file.status === 'failed' ? (
                        <div className={styles.uploadFailed}>
                          <span className={styles.errorIcon}>⚠️</span>
                          <span className={styles.errorText}>
                            {file.error || 'Upload failed'}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {uploadErrors[file.name] && (
                      <div className={styles.fileErrors}>
                        {uploadErrors[file.name].map((error, i) => (
                          <p key={i} className={styles.fileError}>
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveFile(index)}
                  disabled={disabled || file.status === 'uploading'}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Tips */}
      <div className={styles.tipsSection}>
        <div className={styles.tipsIcon}>💡</div>
        <div className={styles.tipsContent}>
          <h4 className={styles.tipsTitle}>What to Upload:</h4>
          <ul className={styles.tipsList}>
            <li>Copyright registration certificates</li>
            <li>Proof of ownership or authorization</li>
            <li>Screenshots of infringing content</li>
            <li>Legal documentation supporting your claim</li>
            <li>Comparison showing original vs. infringing content</li>
          </ul>
        </div>
      </div>

      {/* Privacy Note */}
      <div className={styles.privacyNote}>
        <div className={styles.privacyIcon}>🔒</div>
        <div className={styles.privacyContent}>
          <p>
            <strong>Privacy:</strong> Uploaded files are stored securely on
            Cloudinary and are only accessible to our legal review team. Files
            are automatically deleted after 90 days unless required for legal
            proceedings.
          </p>
        </div>
      </div>
    </div>
  );
}
