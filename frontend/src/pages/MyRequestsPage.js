import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyRequestsPage.css';

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState('');

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('user')).id;
      
      // Get all requests and filter by customer
      const response = await axios.get('/api/requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter requests for current user
      const myRequests = response.data.filter(req => req.customerId?.id === userId || req.email === JSON.parse(localStorage.getItem('user')).email);
      setRequests(myRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Fallback: fetch from localStorage if backend fails
      const savedRequests = JSON.parse(localStorage.getItem('myRequests') || '[]');
      setRequests(savedRequests);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = filteredStatus
    ? requests.filter(req => req.status === filteredStatus)
    : requests;

  if (loading) return <div className="loading">Loading your requests...</div>;

  return (
    <div className="my-requests-page">
      <h1>My Loan Requests</h1>

      {requests.length === 0 ? (
        <div className="no-requests">
          <p>You haven't submitted any loan requests yet.</p>
          <a href="/loans">Browse available loans</a>
        </div>
      ) : (
        <>
          <div className="filter-section">
            <label>Filter by Status: </label>
            <select value={filteredStatus} onChange={(e) => setFilteredStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="requests-list">
            {filteredRequests.map(request => (
              <div key={request._id} className="request-card">
                <div className="request-header">
                  <h3>{request.loanId?.loanName || 'Loan Request'}</h3>
                  <span className={`status ${request.status}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>

                <div className="request-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Requested Amount:</span>
                      <span>€{request.requestedAmount.toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Duration:</span>
                      <span>{request.requestedDuration} months</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Submitted:</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Loan City:</span>
                      <span>{request.loanId?.city || 'N/A'}</span>
                    </div>
                  </div>

                  {request.status === 'scheduled' && request.scheduledDate && (
                    <div className="scheduled-info">
                      <h4>📅 Meeting Scheduled</h4>
                      <p><strong>Date:</strong> {new Date(request.scheduledDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {request.scheduledTime}</p>
                      {request.notes && <p><strong>Notes:</strong> {request.notes}</p>}
                    </div>
                  )}

                  {request.status === 'rejected' && request.notes && (
                    <div className="rejection-info">
                      <h4>❌ Rejection Reason</h4>
                      <p>{request.notes}</p>
                    </div>
                  )}

                  {request.status === 'approved' && (
                    <div className="approved-info">
                      <h4>✅ Approved</h4>
                      <p>Congratulations! Your loan request has been approved.</p>
                      {request.notes && <p><strong>Details:</strong> {request.notes}</p>}
                    </div>
                  )}
                </div>

                <div className="request-footer">
                  <small>Updated: {new Date(request.updatedAt).toLocaleString()}</small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
