import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>FinPazar - Loan Solutions for Macedonia</h1>
          <p>Find the perfect loan that suits your needs</p>
          {!user ? (
            <div className="hero-buttons">
              <Link to="/loans" className="btn btn-primary">Browse Loans</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/loans" className="btn btn-primary">View Available Loans</Link>
              {user.role === 'customer' && (
                <Link to="/my-requests" className="btn btn-secondary">My Requests</Link>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>1. Browse Loans</h3>
            <p>Explore various loan products available across locations in Macedonia</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>2. Submit Request</h3>
            <p>Fill in your information and select the loan amount and duration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>3. Get Scheduled</h3>
            <p>Admin will contact you to schedule a meeting and finalize details</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>4. Approval</h3>
            <p>Complete the process and receive your approved loan</p>
          </div>
        </div>
      </section>

      <section className="loan-types">
        <h2>Available Loan Types</h2>
        <div className="loan-types-grid">
          <div className="loan-type">
            <h4>Personal Loans</h4>
            <p>For personal expenses and projects</p>
          </div>
          <div className="loan-type">
            <h4>Business Loans</h4>
            <p>For business growth and operations</p>
          </div>
          <div className="loan-type">
            <h4>Home Loans</h4>
            <p>For property purchase and renovation</p>
          </div>
          <div className="loan-type">
            <h4>Auto Loans</h4>
            <p>For vehicle purchase and financing</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers who have secured their loans through FinPazar</p>
        <Link to="/loans" className="btn btn-large">Browse Loans Now</Link>
      </section>
    </div>
  );
};

export default HomePage;
