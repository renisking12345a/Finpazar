import React, { useState, useEffect } from 'react';
import api from '../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('pending');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = filterStatus 
    ? requests.filter(req => req.status === filterStatus)
    : requests;

  if (loading) return <div className="loading">Loading requests...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-label">Total Requests</span>
          <span className="stat-value">{requests.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{requests.filter(r => r.status === 'pending').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Scheduled</span>
          <span className="stat-value">{requests.filter(r => r.status === 'scheduled').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Approved</span>
          <span className="stat-value">{requests.filter(r => r.status === 'approved').length}</span>
        </div>
      </div>

      <div className="filter-section">
        <label>Filter by Status: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="requests-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Duration</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request._id}>
                <td>{request.firstName} {request.lastName}</td>
                <td>{request.loanId?.loanName || 'N/A'}</td>
                <td>€{request.requestedAmount.toLocaleString()}</td>
                <td>{request.requestedDuration} mo.</td>
                <td>{request.phone}</td>
                <td>
                  <span className={`status ${request.status}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <RequestDetailModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequest(null)}
          onRefresh={fetchRequests}
        />
      )}
    </div>
  );
};

const RequestDetailModal = ({ request, onClose, onRefresh }) => {
  const [status, setStatus] = useState(request.status);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [notes, setNotes] = useState(request.notes || '');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSchedule = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!scheduledDate || !scheduledTime) {
      setError('Please select date and time');
      return;
    }

    try {
      await api.put(
        `/requests/${request._id}/schedule`,
        {
          scheduledDate,
          scheduledTime,
          notes
        }
      );
      setSuccessMessage('Meeting scheduled successfully!');
      setTimeout(() => {
        onRefresh();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error scheduling meeting');
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await api.put(
        `/requests/${request._id}/status`,
        {
          status,
          notes
        }
      );
      setSuccessMessage('Status updated successfully!');
      setTimeout(() => {
        onRefresh();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating status');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Loan Request Details</h2>

        <div className="request-details">
          <h3>Customer Information</h3>
          <div className="detail-grid">
            <div className="detail">
              <span className="label">Name:</span>
              <span>{request.firstName} {request.lastName}</span>
            </div>
            <div className="detail">
              <span className="label">Email:</span>
              <span>{request.email}</span>
            </div>
            <div className="detail">
              <span className="label">Phone:</span>
              <span>{request.phone}</span>
            </div>
            <div className="detail">
              <span className="label">City:</span>
              <span>{request.city}</span>
            </div>
            <div className="detail">
              <span className="label">Address:</span>
              <span>{request.address || 'N/A'}</span>
            </div>
            <div className="detail">
              <span className="label">Income:</span>
              <span>{request.income ? `€${request.income.toLocaleString()}` : 'Not provided'}</span>
            </div>
          </div>

          <h3>Loan Information</h3>
          <div className="detail-grid">
            <div className="detail">
              <span className="label">Loan Product:</span>
              <span>{request.loanId?.loanName || 'N/A'}</span>
            </div>
            <div className="detail">
              <span className="label">Requested Amount:</span>
              <span>€{request.requestedAmount.toLocaleString()}</span>
            </div>
            <div className="detail">
              <span className="label">Duration:</span>
              <span>{request.requestedDuration} months</span>
            </div>
            <div className="detail">
              <span className="label">Status:</span>
              <span className={`status ${request.status}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </div>

          {request.scheduledDate && (
            <>
              <h3>Scheduled Meeting</h3>
              <div className="detail-grid">
                <div className="detail">
                  <span className="label">Date:</span>
                  <span>{new Date(request.scheduledDate).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <span className="label">Time:</span>
                  <span>{request.scheduledTime}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {request.status === 'pending' && (
          <form onSubmit={handleSchedule} className="action-form">
            <h3>Schedule Meeting</h3>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Time:</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Notes:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
              />
            </div>

            <button type="submit" className="schedule-btn">Schedule Meeting</button>
          </form>
        )}

        {request.status === 'pending' && (
          <form onSubmit={handleStatusUpdate} className="action-form">
            <h3>Update Status</h3>
            <div className="form-group">
              <label>Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notes:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
              />
            </div>

            <button type="submit" className="update-btn">Update Status</button>
          </form>
        )}

        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
