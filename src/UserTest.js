// src/UserTest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTest = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/users/2');
        setUserData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="col-md-6 offset-md-3">
      <h3 className="mb-4">User Data</h3>
      {userData && (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      )}
    </div>
  );
};

export default UserTest;
