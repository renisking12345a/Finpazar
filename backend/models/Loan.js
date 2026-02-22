const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  loanName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  minAmount: {
    type: Number,
    required: true
  },
  maxAmount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  minDuration: {
    type: Number,
    required: true,
    description: 'Minimum months'
  },
  maxDuration: {
    type: Number,
    required: true,
    description: 'Maximum months'
  },
  repaymentFrequency: {
    type: String,
    enum: ['monthly', 'quarterly', 'semi-annual', 'annual'],
    default: 'monthly'
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Loan', LoanSchema);
