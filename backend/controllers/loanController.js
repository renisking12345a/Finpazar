const Loan = require('../models/Loan');

const getAllLoans = async (req, res) => {
  try {
    const { city, region } = req.query;
    let filter = { isActive: true };

    if (city) filter.city = city;
    if (region) filter.region = region;

    const loans = await Loan.find(filter);
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLoan = async (req, res) => {
  try {
    const { loanName, description, minAmount, maxAmount, interestRate, minDuration, maxDuration, repaymentFrequency, city, region } = req.body;

    const loan = new Loan({
      loanName,
      description,
      minAmount,
      maxAmount,
      interestRate,
      minDuration,
      maxDuration,
      repaymentFrequency,
      city,
      region
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan };
