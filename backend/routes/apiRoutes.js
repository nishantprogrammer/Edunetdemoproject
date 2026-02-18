const express = require('express');
const router = express.Router();
const { calculate } = require('../controllers/calculationController');
const { getHistory, clearHistory } = require('../controllers/historyController');
const { getStats } = require('../controllers/statsController');

router.post('/calculate', calculate);
router.get('/history', getHistory);
router.delete('/history', clearHistory);
router.get('/stats', getStats);

module.exports = router;
