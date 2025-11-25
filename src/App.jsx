import { Routes, Route } from 'react-router-dom';
import AgeVerificationGate from './components/AgeVerificationGate';
import Home from './pages/Home';
import Audio from './pages/Audio';
import AudioDetail from './pages/AudioDetail';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <AgeVerificationGate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/audio/:id" element={<AudioDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </AgeVerificationGate>
  );
}

export default App;
