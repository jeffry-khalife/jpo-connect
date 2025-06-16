import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import JpoList from './components/JpoList';
import JpoDetail from './components/JpoDetail';
import JpoAdd from './components/JpoAdd'; 
import JpoEdit from './components/JpoEdit';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

export default function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("jwt"));
  // On ne peut pas utiliser useNavigate ici, donc on utilise window.location

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLogged(false);
    window.location.href = "/"; // Redirige vers l'accueil après logout
  };

  return (
    <BrowserRouter>
      <Navbar logged={logged} onLogout={handleLogout} />
      <div className="main-content pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setLogged(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/jpos" element={<JpoList />} />
          <Route path="/jpos/new" element={<JpoAdd />} /> 
          <Route path="/jpos/edit/:id" element={<JpoEdit />} />
          <Route path="/jpos/:id" element={<JpoDetail />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
