const LoanRequest = require('../models/LoanRequest');
const Loan = require('../models/Loan');

const createRequest = async (req, res) => {
  try {
    const { customerId, loanId, requestedAmount, requestedDuration, firstName, lastName, email, phone, city, address, income } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (requestedAmount < loan.minAmount || requestedAmount > loan.maxAmount) {
      return res.status(400).json({ error: `Amount must be between ${loan.minAmount} and ${loan.maxAmount}` });
    }

    if (requestedDuration < loan.minDuration || requestedDuration > loan.maxDuration) {
      return res.status(400).json({ error: `Duration must be between ${loan.minDuration} and ${loan.maxDuration} months` });
    }

    const loanRequest = new LoanRequest({
      loanId,
      customerId,
      requestedAmount,
      requestedDuration,
      firstName,
      lastName,
      email,
      phone,
      city,
      address,
      income
    });

    await loanRequest.save();

    res.status(201).json({
      message: 'Loan request submitted successfully',
      request: loanRequest
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await LoanRequest.find()
      .populate('loanId', 'loanName')
      .populate('customerId', 'firstName lastName email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await LoanRequest.findById(req.params.id)
      .populate('loanId')
      .populate('customerId');
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const scheduleRequest = async (req, res) => {
  try {
    const { scheduledDate, scheduledTime, notes } = req.body;
    const request = await LoanRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: 'scheduled',
        scheduledDate,
        scheduledTime,
        notes,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({
      message: 'Meeting scheduled successfully',
      request
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const request = await LoanRequest.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({
      message: 'Request status updated',
      request
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRequest, getAllRequests, getRequestById, scheduleRequest, updateRequestStatus };
