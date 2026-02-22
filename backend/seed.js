const mongoose = require('mongoose');
const Loan = require('./models/Loan');
require('dotenv').config();

const seedLoans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finpazar');
    
    // Clear existing loans
    await Loan.deleteMany({});

    const loansData = [
      {
        loanName: 'Quick Personal Loan',
        description: 'Fast approval personal loan for immediate needs',
        minAmount: 1000,
        maxAmount: 10000,
        interestRate: 8.5,
        minDuration: 6,
        maxDuration: 36,
        repaymentFrequency: 'monthly',
        city: 'Skopje',
        region: 'Skopje'
      },
      {
        loanName: 'Business Expansion Loan',
        description: 'Ideal for business growth and expansion projects',
        minAmount: 5000,
        maxAmount: 50000,
        interestRate: 6.5,
        minDuration: 12,
        maxDuration: 60,
        repaymentFrequency: 'monthly',
        city: 'Skopje',
        region: 'Skopje'
      },
      {
        loanName: 'Home Renovation Loan',
        description: 'Perfect for renovating and improving your home',
        minAmount: 10000,
        maxAmount: 100000,
        interestRate: 5.5,
        minDuration: 24,
        maxDuration: 120,
        repaymentFrequency: 'monthly',
        city: 'Bitola',
        region: 'Pelagonia'
      },
      {
        loanName: 'Auto Finance Loan',
        description: 'Financing for vehicle purchase',
        minAmount: 5000,
        maxAmount: 80000,
        interestRate: 7.5,
        minDuration: 12,
        maxDuration: 72,
        repaymentFrequency: 'monthly',
        city: 'Kumanovo',
        region: 'Northeastern'
      },
      {
        loanName: 'Student Loan',
        description: 'Educational financing for students',
        minAmount: 2000,
        maxAmount: 20000,
        interestRate: 3.5,
        minDuration: 6,
        maxDuration: 84,
        repaymentFrequency: 'monthly',
        city: 'Skopje',
        region: 'Skopje'
      },
      {
        loanName: 'Wedding Loan',
        description: 'Make your special day perfect with our wedding loans',
        minAmount: 3000,
        maxAmount: 25000,
        interestRate: 6.5,
        minDuration: 12,
        maxDuration: 48,
        repaymentFrequency: 'monthly',
        city: 'Prishtina-nearby',
        region: 'Eastern'
      },
      {
        loanName: 'Agriculture Loan',
        description: 'Financing for agricultural projects and equipment',
        minAmount: 10000,
        maxAmount: 75000,
        interestRate: 4.5,
        minDuration: 12,
        maxDuration: 84,
        repaymentFrequency: 'quarterly',
        city: 'Veles',
        region: 'Pelagonia'
      },
      {
        loanName: 'Emergency Fund Loan',
        description: 'Quick funds for unexpected emergencies',
        minAmount: 500,
        maxAmount: 5000,
        interestRate: 12.5,
        minDuration: 3,
        maxDuration: 24,
        repaymentFrequency: 'monthly',
        city: 'Ohrid',
        region: 'Southwest'
      }
    ];

    await Loan.insertMany(loansData);
    console.log(`✓ Successfully seeded ${loansData.length} loans`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding loans:', error);
    process.exit(1);
  }
};

seedLoans();
