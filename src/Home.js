// src/Home.js
import React from 'react';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Welcome to your CMS</h3>
              </div>
              <div className="card-body">
                <p className="text-center">Start managing your content with ease!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
