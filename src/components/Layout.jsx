import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    // Reset to home page styling when on home route
    if (location.pathname === '/') {
      document.body.style.backgroundColor = '';
      document.body.className = '';
      
      // Reset any modified background elements
      const bgElements = document.querySelectorAll('.bg-secondary-100');
      bgElements.forEach(el => {
        el.style.backgroundColor = '';
      });
    }
  }, [location.pathname]);

  return <>{children}</>;
}