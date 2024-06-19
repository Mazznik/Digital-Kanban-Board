import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './login';
import Pregled from './Pregled';
import { auth } from './firebase';
import useAuth from './useAuth';

function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Možeš prikazati neki loader dok se provjerava autentikacija
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<ProtectedRoute element={<App />} />} />
      <Route path='/pregled' element={<Pregled />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;
