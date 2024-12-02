import React from 'react';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-3 bg-light vh-100">
            <ul className="nav flex-column p-3">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Bookings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Invoices
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-9">
            <div className="container mt-3">
              <h3 className="text-center">Welcome to Pali's Nest Billing System</h3>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5>Total Revenue</h5>
                      <p>₹1,50,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5>Pending Payments</h5>
                      <p>₹50,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5>Recent Bookings</h5>
                      <p>5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
