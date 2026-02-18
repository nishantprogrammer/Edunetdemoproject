const History = require('../models/History');
const User = require('../models/User'); // Required if we link to user
const calculateEmissions = require('../utils/emissionCalculator');
const { predictCO2 } = require('../utils/regressionModel');

// @desc    Calculate CO2 savings
// @route   POST /api/calculate
// @access  Public (or Private)
const calculate = async (req, res) => {
    try {
        const { km, engineSize, fuelConsumption, userId } = req.body;

        if (!km) {
            return res.status(400).json({ message: 'Please provide kilometers traveled' });
        }

        let calculation = calculateEmissions(km);

        // Optional: usage of ML model to refine petrolCO2 if specific vehicle data provided
        if (engineSize && fuelConsumption) {
            const predictedCO2PerKm = predictCO2(engineSize, fuelConsumption);
            if (predictedCO2PerKm > 0) {
                // Recalculate based on predicted CO2
                // Original calc uses constant factor.
                // Let's adjust petrolCO2 = predictedCO2PerKm * km / 1000 (g to kg)
                calculation.petrolCO2 = parseFloat((predictedCO2PerKm * km / 1000).toFixed(3));
                calculation.co2Saved = parseFloat((calculation.petrolCO2 - calculation.evCO2).toFixed(3));
                // Recalculate trees
                const { TREE_ABSORPTION_PER_YEAR } = require('../utils/constants');
                calculation.treesEquivalent = parseFloat(((calculation.co2Saved * 365) / TREE_ABSORPTION_PER_YEAR).toFixed(2));
            }
        }

        // Save history if user provided (or default user)
        // For simplicity, we just save if userId is present
        // Always save history to track global impact measurements
        // user field is optional
        const history = new History({
            user: userId || null, // Can be null for anonymous
            dailyKm: km,
            petrolCO2: calculation.petrolCO2,
            evCO2: calculation.evCO2,
            co2Saved: calculation.co2Saved,
            treesEquivalent: calculation.treesEquivalent,
            costSaved: calculation.costSaved
        });

        await history.save();

        res.json(calculation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { calculate };
