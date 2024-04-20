import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './login';
import { auth } from './firebase'; // Importamo auth iz firebase

function ProtectedRoute({ element, ...rest }) {
  // Provjeravamo autentikaciju korisnika
  const isAuthenticated = auth.currentUser !== null;

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
    </Routes>
  );
}

export default AppRouter;
