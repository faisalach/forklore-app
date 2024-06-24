import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/homePage';
import ImagePage from './pages/imagePage';
import VideoPage from './pages/videoPage';

function App() {
  return (
    <div className="text-white bg-[#0e1117] w-full min-h-screen h-auto">
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/video" element={<VideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
