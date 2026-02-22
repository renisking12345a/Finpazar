const express = require('express');
const { createRequest, getAllRequests, getRequestById, scheduleRequest, updateRequestStatus } = require('../controllers/requestController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', createRequest);
router.get('/', authMiddleware, adminMiddleware, getAllRequests);
router.get('/:id', authMiddleware, getRequestById);
router.put('/:id/schedule', authMiddleware, adminMiddleware, scheduleRequest);
router.put('/:id/status', authMiddleware, adminMiddleware, updateRequestStatus);

module.exports = router;
