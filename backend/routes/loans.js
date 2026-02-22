const express = require('express');
const { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan } = require('../controllers/loanController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllLoans);
router.get('/:id', getLoanById);
router.post('/', authMiddleware, adminMiddleware, createLoan);
router.put('/:id', authMiddleware, adminMiddleware, updateLoan);
router.delete('/:id', authMiddleware, adminMiddleware, deleteLoan);

module.exports = router;
