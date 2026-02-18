const History = require('../models/History');

// @desc    Get user history
// @route   GET /api/history
// @access  Public (should be Private)
const getHistory = async (req, res) => {
    try {
        const history = await History.find({}).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Clear all history
// @route   DELETE /api/history
// @access  Public
const clearHistory = async (req, res) => {
    try {
        await History.deleteMany({});
        res.json({ message: 'History cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { getHistory, clearHistory };
