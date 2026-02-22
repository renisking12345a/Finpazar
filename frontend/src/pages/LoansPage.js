import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './LoansPage.css';

const LoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/loans');
      setLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    if (selectedCity) {
      setFilteredLoans(loans.filter(loan => loan.city === selectedCity));
    } else {
      setFilteredLoans(loans);
    }
  };

  const cities = [...new Set(loans.map(loan => loan.city))].filter(Boolean);

  if (loading) return <div className="loading">Loading loans...</div>;

  return (
    <div className="loans-page">
      <h1>Available Loans Across Macedonia</h1>
      
      <div className="filter-section">
        <label>Filter by City: </label>
        <select value={city} onChange={handleFilter}>
          <option value="">All Cities</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="loans-grid">
        {filteredLoans.map(loan => (
          <div key={loan._id} className="loan-card">
            <h2>{loan.loanName}</h2>
            <p className="description">{loan.description}</p>
            <div className="loan-details">
              <div className="detail-item">
                <span className="label">Amount Range:</span>
                <span className="value">€{loan.minAmount.toLocaleString()} - €{loan.maxAmount.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Interest Rate:</span>
                <span className="value">{loan.interestRate}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">{loan.minDuration} - {loan.maxDuration} months</span>
              </div>
              <div className="detail-item">
                <span className="label">Repayment Frequency:</span>
                <span className="value">{loan.repaymentFrequency}</span>
              </div>
              {loan.city && (
                <div className="detail-item">
                  <span className="label">City:</span>
                  <span className="value">{loan.city}</span>
                </div>
              )}
            </div>
            <button 
              className="apply-btn"
              onClick={() => setSelectedLoan(loan)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {selectedLoan && (
        <LoanRequestForm loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
      )}
    </div>
  );
};

const LoanRequestForm = ({ loan, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    requestedAmount: loan.minAmount,
    requestedDuration: loan.minDuration,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    income: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/requests', {
        customerId: user.id,
        loanId: loan._id,
        ...formData,
        requestedAmount: parseInt(formData.requestedAmount),
        requestedDuration: parseInt(formData.requestedDuration),
        income: formData.income ? parseInt(formData.income) : undefined
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting request');
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2>Success!</h2>
          <p>Your loan request has been submitted successfully.</p>
          <p>The admin will contact you shortly to schedule a meeting.</p>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Apply for {loan.loanName}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Requested Amount (€):</label>
              <input
                type="number"
                name="requestedAmount"
                min={loan.minAmount}
                max={loan.maxAmount}
                value={formData.requestedAmount}
                onChange={handleChange}
                required
              />
              <small>€{loan.minAmount.toLocaleString()} - €{loan.maxAmount.toLocaleString()}</small>
            </div>

            <div className="form-group">
              <label>Duration (months):</label>
              <input
                type="number"
                name="requestedDuration"
                min={loan.minDuration}
                max={loan.maxDuration}
                value={formData.requestedDuration}
                onChange={handleChange}
                required
              />
              <small>{loan.minDuration} - {loan.maxDuration} months</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Annual Income (optional):</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit Request</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoansPage;
