// src/UserTest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const UserTest = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8090/api/test/hello', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header isLoggedIn={true} />
      <div className="col-md-6 offset-md-3">
        <h3 className="mb-4">User Data</h3>
        {userData && (
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default UserTest;
