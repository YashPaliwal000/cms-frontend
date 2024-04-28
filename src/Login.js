import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from './api'; // Import loginUser function from api.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await loginUser(user); // Call the loginUser function from api.js
      if (response && response.token) {
        console.log('Login successful');
        // Redirect the user to another page or update the UI as needed
        // For now, let's redirect the user to the home page
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Sign in</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
