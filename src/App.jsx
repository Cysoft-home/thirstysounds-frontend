// Override console methods in production - MUST be at the very top
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.info = () => {};
  console.debug = () => {};
}

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Audio from './pages/Audio';
import AudioDetail from './pages/AudioDetail';
import Search from './pages/Search';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DMCA from './pages/DMCA';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Takedown from './components/takedown/Takedown';
import AgeVerificationGate from './components/AgeVerificationGate';

import './App.css';

import ReactGA from 'react-ga4';

// Initialize GA4
ReactGA.initialize('G-0R82Z3BV9N');

// Export analytics tracking functions for use in components
export const trackAudioPlay = (audioId, audioTitle = '') => {
  ReactGA.event({
    category: 'Audio',
    action: 'play',
    label: audioId,
    value: audioTitle,
  });
  console.log(`Audio played: ${audioTitle || audioId}`);
};

export const trackAudioPause = (audioId, audioTitle = '') => {
  ReactGA.event({
    category: 'Audio',
    action: 'pause',
    label: audioId,
    value: audioTitle,
  });
  console.log(`Audio paused: ${audioTitle || audioId}`);
};

export const trackSearch = (searchTerm, resultCount = 0) => {
  ReactGA.event({
    category: 'Search',
    action: 'search',
    label: searchTerm,
    value: resultCount,
  });
  console.log(`Search performed: "${searchTerm}" - ${resultCount} results`);
};

export const trackDownload = (audioId, audioTitle = '') => {
  ReactGA.event({
    category: 'Audio',
    action: 'download',
    label: audioId,
    value: audioTitle,
  });
  console.log(`Audio downloaded: ${audioTitle || audioId}`);
};

export const trackError = (errorType, errorMessage) => {
  ReactGA.event({
    category: 'Error',
    action: errorType,
    label: errorMessage,
  });
  console.log(`Error tracked: ${errorType} - ${errorMessage}`);
};

export const trackShare = (audioId, audioTitle = '', platform = '') => {
  ReactGA.event({
    category: 'Audio',
    action: 'share',
    label: audioId,
    value: audioTitle,
    custom_data: { platform },
  });
  console.log(
    `Audio shared: ${audioTitle || audioId} on ${platform || 'unknown'}`
  );
};

export const trackPageView = (path, title) => {
  ReactGA.send('pageview', {
    page_path: path,
    page_title: title,
  });
};

// Create a component to handle automatic page tracking
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Send pageview on route change
    ReactGA.send('pageview', {
      page_path: location.pathname + location.search,
      page_title: document.title || 'Audio Site',
    });

    // Log to console for debugging (will be disabled in production)
    console.log(`Page viewed: ${location.pathname}${location.search}`);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <AgeVerificationGate>
        <Routes>
          {/* Home & Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/audio/:id" element={<AudioDetail />} />
          <Route path="/search" element={<Search />} />
          {/* Legal Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/dmca" element={<DMCA />} />
          {/* Support Pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/takedown" element={<Takedown />} />
          {/* Redirects for old URLs or alternative paths */}
          <Route path="/copyright" element={<DMCA />} />
          <Route path="/report" element={<Takedown />} />
          <Route path="/report-content" element={<Takedown />} />
          <Route path="/copyright-infringement" element={<Takedown />} />
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AgeVerificationGate>
    </Router>
  );
}

// Updated NotFound component with better styling
function NotFound() {
  useEffect(() => {
    // Track 404 page views
    ReactGA.send('pageview', {
      page_path: window.location.pathname,
      page_title: '404 - Page Not Found',
    });
    console.log(`404 Page viewed: ${window.location.pathname}`);
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Page not found</p>
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-links">
          <a href="/" className="not-found-button primary">
            Go Home
          </a>
          <a href="/contact" className="not-found-button secondary">
            Contact Support
          </a>
        </div>
        <div className="not-found-suggestions">
          <h3>Popular Pages:</h3>
          <ul>
            <li>
              <a href="/audio">Browse Audio</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/takedown">Report Content</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
