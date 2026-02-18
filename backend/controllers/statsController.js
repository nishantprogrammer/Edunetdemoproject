const History = require('../models/History');
const { calculateMovingAverage, calculateStandardDeviation, calculateCorrelation } = require('../utils/statistics');
const ML = require('ml-regression');
const SLR = ML.SimpleLinearRegression;

// @desc    Get aggregated stats
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
    try {
        const history = await History.find({}).sort({ createdAt: 1 });

        if (history.length === 0) {
            return res.json({
                count: 0,
                movingAverageKm: [],
                stdDevCO2: 0,
                correlation: 0,
                projectedSavings: []
            });
        }

        const dailyKms = history.map(h => h.dailyKm);
        const co2Saved = history.map(h => h.co2Saved);

        // Moving Average (7 days)
        const movingAverageKm = calculateMovingAverage(dailyKms, 7);

        // Standard Deviation of CO2 Saved
        const stdDevCO2 = calculateStandardDeviation(co2Saved);

        // Correlation between Km and CO2 Saved
        const correlation = calculateCorrelation(dailyKms, co2Saved);

        // Trendline Prediction for next month
        // We use day index (0, 1, 2...) as X and co2Saved as Y
        const projectedSavings = [];

        if (history.length >= 2) {
            const x = history.map((_, i) => i);
            const y = co2Saved;
            let regression = new SLR(x, y);

            // Predict next 30 days
            const lastDayIndex = x.length - 1;
            for (let i = 1; i <= 30; i++) {
                projectedSavings.push({
                    day: lastDayIndex + i,
                    predictedCO2Saved: regression.predict(lastDayIndex + i)
                });
            }
        }

        res.json({
            count: history.length,
            movingAverageKm,
            stdDevCO2,
            correlation,
            projectedSavings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getStats };
