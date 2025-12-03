import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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
          <Route path="/takedown" element={<Takedown />} />{' '}
          {/* New Takedown page */}
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
