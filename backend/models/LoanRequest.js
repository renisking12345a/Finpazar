const mongoose = require('mongoose');

const LoanRequestSchema = new mongoose.Schema({
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedAmount: {
    type: Number,
    required: true
  },
  requestedDuration: {
    type: Number,
    required: true,
    description: 'Duration in months'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  income: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'scheduled'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date
  },
  scheduledTime: {
    type: String
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoanRequest', LoanRequestSchema);
