// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { registerUser } from './api';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(user);
      if (response) {
        navigate('/login');
        navigate.push('/login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header isLoggedIn={false} />
      <div className="col-md-6 offset-md-3">
        <h3 className="mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={user.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
