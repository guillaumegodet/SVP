import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AppRouterProps {
  setCurrentPage: (page: 'dashboard' | 'publications' | 'activities' | 'expertises' | 'publication-detail') => void;
}

export default function AppRouter({ setCurrentPage }: AppRouterProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Map URL paths to currentPage state
    if (location.pathname === '/dashboard') {
      setCurrentPage('dashboard');
    } else if (location.pathname === '/expertises') {
      setCurrentPage('expertises');
    } else if (location.pathname === '/publications') {
      setCurrentPage('publications');
    } else if (location.pathname === '/activities') {
      setCurrentPage('activities');
    } else if (location.pathname.startsWith('/publication/')) {
      setCurrentPage('publication-detail');
    } else if (location.pathname === '/') {
      // Redirect root to publications
      navigate('/publications', { replace: true });
    }
  }, [location.pathname, setCurrentPage, navigate]);

  return null;
}