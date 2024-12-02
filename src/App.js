import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Billing from './Billing';
import Customers from './Customers';
import Reports from './Reports';
import NotFound from './NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isAuthenticated = true; // Mock authentication status, replace with real logic

  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Login />}
          />
          <Route
            path="/billing"
            element={isAuthenticated ? <Billing /> : <Login />}
          />
          <Route
            path="/customers"
            element={isAuthenticated ? <Customers /> : <Login />}
          />
          <Route
            path="/reports"
            element={isAuthenticated ? <Reports /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
