// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import { UserProvider } from './context/userContext.jsx';

import Layout from './Layout.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="community" element={<Community />} />
              <Route path="login" element={<Login />} />
              
            </Route>
        </Routes>

        </UserProvider>
   
      </ThemeProvider>
    </Router>
  );
}

export default App;