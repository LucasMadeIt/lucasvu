import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';
import Layout from './components/Layout';
import LoadingScreen from "./components/LoadingScreen";
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [isCheckingFirstVisit, setIsCheckingFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    
    if (!hasVisited) {
      // First time visitor - show loading screen
      setShowLoading(true);
      // Mark as visited
      localStorage.setItem('hasVisitedPortfolio', 'true');
    } else {
      // Returning visitor - skip loading screen
      setStartHeroAnimation(true);
    }
    
    setIsCheckingFirstVisit(false);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setStartHeroAnimation(true);
  };

  // Don't render anything until we've checked localStorage
  if (isCheckingFirstVisit) {
    return <div className="bg-secondary-100 min-h-screen"></div>;
  }

  return (
    <div className="bg-secondary-100">
      {showLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      {!showLoading && (
        <Router>
          <Layout>
            <Routes>
              <Route 
                path="/" 
                element={<HomePage startHeroAnimation={startHeroAnimation} />} 
              />
              <Route path="/project/:projectSlug" element={<ProjectDetail />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </div>
  );
};

export default App;