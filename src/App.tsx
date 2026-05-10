import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AdminDashboard from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {isAdminView ? <AdminDashboard /> : <Home />}
      <Toaster position="top-center" richColors />
    </>
  );
}
