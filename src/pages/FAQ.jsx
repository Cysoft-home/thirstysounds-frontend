// pages/FAQ.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/ui/Footer';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [darkMode, setDarkMode] = useState(false);
  const [openCategory, setOpenCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const faqData = {
    general: {
      title: 'General Questions',
      icon: '❓',
      questions: [
        {
          id: 'general-1',
          question: 'What is ThirstySounds?',
          answer:
            'ThirstySounds is a premium audio content platform featuring high-quality recordings, professional narration, and immersive audio experiences. We specialize in adult-oriented audio content for discerning listeners.',
        },
        {
          id: 'general-2',
          question: 'Is ThirstySounds free to use?',
          answer:
            "ThirstySounds offers both free and premium content. Some audio files are available for free listening, while premium content requires a subscription or purchase. You can browse our catalog to see what's available.",
        },
        {
          id: 'general-3',
          question: 'What devices can I use to listen?',
          answer:
            'ThirstySounds is accessible on any device with a modern web browser, including desktop computers, laptops, tablets, and smartphones. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience.',
        },
        {
          id: 'general-4',
          question: 'Do I need to create an account?',
          answer:
            'While you can browse our catalog without an account, creating an account allows you to save favorites, create playlists, track your listening history, and access premium content if you subscribe.',
        },
      ],
    },
    account: {
      title: 'Account & Billing',
      icon: '👤',
      questions: [
        {
          id: 'account-1',
          question: 'How do I create an account?',
          answer:
            'Click the "Sign Up" button in the top navigation. You\'ll need to provide a valid email address, create a password, and verify that you are 18 years or older. Account creation is free and only takes a minute.',
        },
        {
          id: 'account-2',
          question: 'I forgot my password. What should I do?',
          answer:
            'Click "Forgot Password" on the login page. Enter your email address, and we\'ll send you instructions to reset your password. Make sure to check your spam folder if you don\'t see our email.',
        },
        {
          id: 'account-3',
          question: 'How do I cancel my subscription?',
          answer:
            'You can cancel your subscription at any time from your account settings. Go to "Subscription" in your account dashboard and click "Cancel Subscription." Your access will continue until the end of your current billing period.',
        },
        {
          id: 'account-4',
          question: 'What payment methods do you accept?',
          answer:
            'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency payments. All payments are processed securely through our payment partners.',
        },
        {
          id: 'account-5',
          question: 'Can I get a refund?',
          answer:
            "We offer refunds on a case-by-case basis. If you're not satisfied with a purchase, please contact our support team within 7 days of purchase. Subscription refunds are prorated based on unused time.",
        },
      ],
    },
    content: {
      title: 'Content & Listening',
      icon: '🎧',
      questions: [
        {
          id: 'content-1',
          question: 'What type of content is available?',
          answer:
            'ThirstySounds features a wide variety of audio content including ASMR, guided relaxation, immersive storytelling, soundscapes, and specialized audio experiences. All content is intended for adult audiences.',
        },
        {
          id: 'content-2',
          question: 'Can I download audio files?',
          answer:
            'Yes, many audio files are available for download. Look for the download button on audio detail pages. Note that some premium content may have download restrictions as specified in the content description.',
        },
        {
          id: 'content-3',
          question: 'Are there content warnings?',
          answer:
            'Yes, all content is clearly categorized and tagged. Audio files containing sensitive content have explicit warnings and age restrictions. Make sure to read content descriptions before listening.',
        },
        {
          id: 'content-4',
          question: 'Can I request specific content?',
          answer:
            'Yes! We welcome content suggestions. Use our content request form in the "Contact Us" section. While we can\'t guarantee all requests will be fulfilled, we consider all suggestions for our content library.',
        },
        {
          id: 'content-5',
          question: 'How is content quality maintained?',
          answer:
            'All audio content undergoes quality review before publication. We verify audio quality, content appropriateness, and metadata accuracy. Our team regularly reviews content to ensure it meets our standards.',
        },
      ],
    },
    technical: {
      title: 'Technical Support',
      icon: '🔧',
      questions: [
        {
          id: 'tech-1',
          question: "The audio isn't playing. What should I do?",
          answer:
            "First, check your internet connection. If you're online, try refreshing the page. Make sure your browser allows autoplay. If problems persist, clear your browser cache or try a different browser. You can also check our status page for service updates.",
        },
        {
          id: 'tech-2',
          question: 'What audio formats are supported?',
          answer:
            'We support MP3, AAC, OGG, and WAV formats. Most audio files are available in multiple quality levels (standard, high, lossless). The player automatically selects the best format for your device and connection.',
        },
        {
          id: 'tech-3',
          question: 'Can I use external speakers or headphones?',
          answer:
            'Yes! ThirstySounds works with any audio output device connected to your computer or mobile device. For the best experience, we recommend using quality headphones or speakers.',
        },
        {
          id: 'tech-4',
          question: 'Is there a mobile app?',
          answer:
            'Currently, ThirstySounds is web-based and works perfectly on mobile browsers. We are developing native mobile apps for iOS and Android, which will be released soon.',
        },
        {
          id: 'tech-5',
          question: 'How do I report a technical issue?',
          answer:
            'Use our technical support form in the "Contact Us" section. Please include details about your device, browser, and the issue you\'re experiencing. Screenshots or screen recordings are helpful for troubleshooting.',
        },
      ],
    },
    legal: {
      title: 'Legal & Privacy',
      icon: '⚖️',
      questions: [
        {
          id: 'legal-1',
          question: 'What is your age verification policy?',
          answer:
            'All users must be 18 years or older to access ThirstySounds. We use age verification gates and require confirmation of age during account creation. Access to adult content requires explicit age verification.',
        },
        {
          id: 'legal-2',
          question: 'How do you protect my privacy?',
          answer:
            'We take privacy seriously. All personal information is encrypted, and we never share your data without consent. For detailed information, please read our comprehensive <Link to="/privacy" className={styles.inlineLink}>Privacy Policy</Link>.',
        },
        {
          id: 'legal-3',
          question: 'What is your DMCA policy?',
          answer:
            'We respect intellectual property rights and comply with the DMCA. If you believe your copyright has been infringed, please review our <Link to="/dmca" className={styles.inlineLink}>DMCA Policy</Link> for instructions on submitting a takedown notice.',
        },
        {
          id: 'legal-4',
          question: 'Can I upload my own content?',
          answer:
            "Currently, we only accept content submissions from verified creators and partners. If you're interested in becoming a content creator, please contact us through our creator partnership program.",
        },
        {
          id: 'legal-5',
          question: 'What are the terms of service?',
          answer:
            'By using ThirstySounds, you agree to our <Link to="/terms" className={styles.inlineLink}>Terms of Service</Link>. These terms outline acceptable use, content guidelines, and user responsibilities.',
        },
      ],
    },
  };

  return (
    <div className={`${styles.faqPage} ${darkMode ? styles.faqPageDark : ''}`}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={styles.faqContainer}>
        <div className={styles.faqContent}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>FAQ</span>
          </nav>

          {/* Header */}
          <header className={styles.faqHeader}>
            <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
            <p className={styles.faqSubtitle}>
              Find answers to common questions about ThirstySounds
            </p>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search questions..."
                className={styles.searchInput}
                onChange={(e) => {
                  // Search functionality would be implemented here
                  console.log('Search:', e.target.value);
                }}
              />
              <button className={styles.searchButton}>🔍</button>
            </div>
          </header>

          {/* Quick Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Categories</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24</div>
              <div className={styles.statLabel}>Questions</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Satisfaction</div>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className={styles.categoryNav}>
            {Object.entries(faqData).map(([key, category]) => (
              <button
                key={key}
                className={`${styles.categoryButton} ${
                  openCategory === key ? styles.categoryButtonActive : ''
                }`}
                onClick={() => toggleCategory(key)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.title}</span>
                <span className={styles.questionCount}>
                  {category.questions.length} questions
                </span>
              </button>
            ))}
          </nav>

          {/* FAQ Content */}
          <div className={styles.faqSections}>
            {Object.entries(faqData).map(([key, category]) => (
              <section
                key={key}
                className={`${styles.faqCategory} ${
                  openCategory === key ? styles.categoryOpen : ''
                }`}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryTitleContainer}>
                    <span className={styles.categoryTitleIcon}>
                      {category.icon}
                    </span>
                    <h2 className={styles.categoryTitle}>{category.title}</h2>
                  </div>
                  <button
                    className={styles.toggleCategoryButton}
                    onClick={() => toggleCategory(key)}
                    aria-expanded={openCategory === key}
                  >
                    {openCategory === key ? '−' : '+'}
                  </button>
                </div>

                <div className={styles.questionsContainer}>
                  {category.questions.map((item) => (
                    <div key={item.id} className={styles.questionItem}>
                      <button
                        className={styles.questionButton}
                        onClick={() => toggleQuestion(item.id)}
                        aria-expanded={openQuestions[item.id]}
                      >
                        <span className={styles.questionText}>
                          {item.question}
                        </span>
                        <span className={styles.toggleIcon}>
                          {openQuestions[item.id] ? '−' : '+'}
                        </span>
                      </button>
                      <div
                        className={`${styles.answerContainer} ${
                          openQuestions[item.id] ? styles.answerOpen : ''
                        }`}
                        aria-hidden={!openQuestions[item.id]}
                      >
                        <div className={styles.answerContent}>
                          <p
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Didn't Find Your Answer? */}
          <div className={styles.helpSection}>
            <div className={styles.helpContainer}>
              <div className={styles.helpIcon}>❓</div>
              <div className={styles.helpContent}>
                <h3 className={styles.helpTitle}>Didn't find your answer?</h3>
                <p className={styles.helpText}>
                  Our support team is here to help. Contact us for personalized
                  assistance.
                </p>
                <div className={styles.helpButtons}>
                  <Link to="/contact" className={styles.contactButton}>
                    Contact Support
                  </Link>
                  <a
                    href="mailto:support@thirstysounds.com"
                    className={styles.emailButton}
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <h3 className={styles.quickLinksTitle}>Quick Links</h3>
            <div className={styles.linksGrid}>
              <Link to="/terms" className={styles.quickLink}>
                <span className={styles.linkIcon}>📄</span>
                <span className={styles.linkText}>Terms of Service</span>
              </Link>
              <Link to="/privacy" className={styles.quickLink}>
                <span className={styles.linkIcon}>🔒</span>
                <span className={styles.linkText}>Privacy Policy</span>
              </Link>
              <Link to="/dmca" className={styles.quickLink}>
                <span className={styles.linkIcon}>⚖️</span>
                <span className={styles.linkText}>DMCA Policy</span>
              </Link>
              <Link to="/contact" className={styles.quickLink}>
                <span className={styles.linkIcon}>📧</span>
                <span className={styles.linkText}>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
