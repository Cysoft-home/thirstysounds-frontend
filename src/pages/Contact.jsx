import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/ui/Footer';
import styles from './Contact.module.css';

export default function Contact() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically make an API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitStatus({
        type: 'success',
        message:
          "Your message has been sent successfully! We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        newsletter: false,
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    
    {
      icon: '📞',
      title: 'Call Us',
      details: [+234 - 8058906394],
      action: 'Call Now',
      link: 'tel:+234-8058906394,',
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: [
        'thirstysounds1@gmail.com',
      ],
      action: 'Send Email',
      link: 'mailto:thirstysounds1@gmail.com',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: [
        'Available 24/7',
        'Average response: 2 min',
        'Technical support',
      ],
      action: 'Start Chat',
      link: '#chat',
      onClick: () => alert('Live chat would open here'),
    },
  ];

  const faqCategories = [
    { id: 'general', label: 'General Inquiry', icon: '❓' },
    { id: 'technical', label: 'Technical Support', icon: '🔧' },
    { id: 'billing', label: 'Billing & Payments', icon: '💳' },
    { id: 'content', label: 'Content & Creators', icon: '🎨' },
    { id: 'business', label: 'Business Inquiries', icon: '🤝' },
    { id: 'legal', label: 'Legal & DMCA', icon: '⚖️' },
  ];

  const socialLinks = [
    {
      platform: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/thirstysounds',
      handle: '@ThirstySounds',
    },
    {
      platform: 'Discord',
      icon: '🎮',
      url: 'https://discord.gg/thirstysounds',
      handle: 'Join our server',
    },
    {
      platform: 'Instagram',
      icon: '📸',
      url: 'https://instagram.com/thirstysounds',
      handle: '@ThirstySounds',
    },
    {
      platform: 'Reddit',
      icon: '👥',
      url: 'https://reddit.com/r/thirstysounds',
      handle: 'r/ThirstySounds',
    },
  ];

  return (
    <div
      className={`${styles.contactPage} ${
        darkMode ? styles.contactPageDark : ''
      }`}
    >
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={styles.contactContainer}>
        <div className={styles.contactContent}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Contact Us</span>
          </nav>

          {/* Header */}
          <header className={styles.contactHeader}>
            <h1 className={styles.contactTitle}>Get in Touch</h1>
            <p className={styles.contactSubtitle}>
              Have questions or feedback? We'd love to hear from you. Reach out
              through any channel below.
            </p>
          </header>

          {/* Contact Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span className={styles.statCounter}>24</span>/7
              </div>
              <div className={styles.statLabel}>Support</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span className={styles.statCounter}>2</span>h
              </div>
              <div className={styles.statLabel}>Avg Response Time</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span className={styles.statCounter}>98</span>%
              </div>
              <div className={styles.statLabel}>Satisfaction</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span className={styles.statCounter}>10k</span>+
              </div>
              <div className={styles.statLabel}>Users Helped</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={styles.mainGrid}>
            {/* Left Column: Contact Form */}
            <div className={styles.formColumn}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Send us a Message</h2>
                  <p className={styles.formDescription}>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                {submitStatus && (
                  <div
                    className={`${styles.submitStatus} ${
                      styles[`status${submitStatus.type}`]
                    }`}
                  >
                    <span className={styles.statusIcon}>
                      {submitStatus.type === 'success' ? '✅' : '⚠️'}
                    </span>
                    <span className={styles.statusMessage}>
                      {submitStatus.message}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        <span className={styles.labelText}>Full Name</span>
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        <span className={styles.labelText}>Email Address</span>
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="john@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      <span className={styles.labelText}>Subject</span>
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="How can we help you?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.formLabel}>
                      <span className={styles.labelText}>Category</span>
                    </label>
                    <div className={styles.categoryGrid}>
                      {faqCategories.map((cat) => (
                        <label key={cat.id} className={styles.categoryOption}>
                          <input
                            type="radio"
                            name="category"
                            value={cat.id}
                            checked={formData.category === cat.id}
                            onChange={handleInputChange}
                            className={styles.radioInput}
                            disabled={isSubmitting}
                          />
                          <span className={styles.radioCustom}></span>
                          <span className={styles.categoryIcon}>
                            {cat.icon}
                          </span>
                          <span className={styles.categoryLabel}>
                            {cat.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      <span className={styles.labelText}>Your Message</span>
                      <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.formTextarea}
                      placeholder="Please describe your inquiry in detail..."
                      rows="6"
                      required
                      disabled={isSubmitting}
                    />
                    <div className={styles.charCount}>
                      {formData.message.length}/2000 characters
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className={styles.checkboxInput}
                        disabled={isSubmitting}
                      />
                      <span className={styles.checkboxCustom}></span>
                      <span className={styles.checkboxText}>
                        Subscribe to our newsletter for updates and exclusive
                        content
                      </span>
                    </label>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className={styles.spinner}></span>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    <button
                      type="button"
                      className={styles.resetButton}
                      onClick={() =>
                        setFormData({
                          name: '',
                          email: '',
                          subject: '',
                          category: 'general',
                          message: '',
                          newsletter: false,
                        })
                      }
                      disabled={isSubmitting}
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>

              {/* Social Media Section */}
              <div className={styles.socialCard}>
                <h3 className={styles.socialTitle}>Follow & Connect</h3>
                <p className={styles.socialDescription}>
                  Join our community and stay updated with the latest news and
                  announcements.
                </p>
                <div className={styles.socialGrid}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.socialIcon}>{social.icon}</span>
                      <div className={styles.socialInfo}>
                        <span className={styles.socialPlatform}>
                          {social.platform}
                        </span>
                        <span className={styles.socialHandle}>
                          {social.handle}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Information */}
            <div className={styles.infoColumn}>
              {/* Contact Methods */}
              <div className={styles.contactMethods}>
                {contactInfo.map((info, index) => (
                  <div key={index} className={styles.contactCard}>
                    <div className={styles.contactCardHeader}>
                      <span className={styles.contactIcon}>{info.icon}</span>
                      <h3 className={styles.contactCardTitle}>{info.title}</h3>
                    </div>
                    <div className={styles.contactCardDetails}>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className={styles.contactDetail}>
                          {detail}
                        </p>
                      ))}
                    </div>
                    <a
                      href={info.link}
                      className={styles.contactCardAction}
                      onClick={info.onClick}
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel={
                        info.link.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {info.action}
                      <span className={styles.actionArrow}>→</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* FAQ Quick Links */}
              <div className={styles.faqCard}>
                <div className={styles.faqCardHeader}>
                  <h3 className={styles.faqCardTitle}>Quick Answers</h3>
                  <p className={styles.faqCardDescription}>
                    Common questions answered instantly
                  </p>
                </div>
                <div className={styles.faqLinks}>
                  <Link to="/faq#general" className={styles.faqLink}>
                    <span className={styles.faqLinkIcon}>❓</span>
                    <span className={styles.faqLinkText}>
                      What is ThirstySounds?
                    </span>
                  </Link>
                  <Link to="/faq#account" className={styles.faqLink}>
                    <span className={styles.faqLinkIcon}>👤</span>
                    <span className={styles.faqLinkText}>
                      How do I reset my password?
                    </span>
                  </Link>
                  <Link to="/faq#billing" className={styles.faqLink}>
                    <span className={styles.faqLinkIcon}>💳</span>
                    <span className={styles.faqLinkText}>
                      Can I cancel my subscription?
                    </span>
                  </Link>
                  <Link to="/faq#technical" className={styles.faqLink}>
                    <span className={styles.faqLinkIcon}>🔧</span>
                    <span className={styles.faqLinkText}>
                      Audio playback issues
                    </span>
                  </Link>
                </div>
                <Link to="/faq" className={styles.faqButton}>
                  View All FAQs
                  <span className={styles.buttonArrow}>→</span>
                </Link>
              </div>

              {/* Business Hours */}
              <div className={styles.hoursCard}>
                <h3 className={styles.hoursTitle}>Business Hours</h3>
                <div className={styles.hoursList}>
                  <div className={styles.hourItem}>
                    <span className={styles.day}>Monday - Friday</span>
                    <span className={styles.time}>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className={styles.hourItem}>
                    <span className={styles.day}>Saturday</span>
                    <span className={styles.time}>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className={styles.hourItem}>
                    <span className={styles.day}>Sunday</span>
                    <span className={styles.time}>Emergency Support Only</span>
                  </div>
                </div>
                <div className={styles.note}>
                  <span className={styles.noteIcon}>ℹ️</span>
                  <span className={styles.noteText}>
                    Emergency support available 24/7 for critical issues
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className={styles.mapSection}>
            <h3 className={styles.mapTitle}>Our Location</h3>
            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapOverlay}>
                  <div className={styles.mapInfo}>
                    <span className={styles.mapPin}>📍</span>
                    <div>
                      <h4 className={styles.mapAddressTitle}>
                        ThirstySounds HQ
                      </h4>
                      <p className={styles.mapAddress}>
                        123 Audio Avenue, Sound City, SC 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
