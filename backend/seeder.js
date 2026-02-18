const mongoose = require('mongoose');
const dotenv = require('dotenv');
// No change needed, just verify output
const History = require('./models/History');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    await connectDB();

    try {
        await History.deleteMany(); // Clear existing data
        console.log('Data Cleared...');

        const sampleData = [];
        const baseKm = 40;

        // Generate 30 days of data with some variance to make graphs interesting
        for (let i = 0; i < 30; i++) {
            const variance = (Math.random() * 20) - 10; // +/- 10km
            const km = Math.max(10, baseKm + variance);

            // Basic calculation logic mimicked from emissionCalculator
            const PETROL_EMISSION_FACTOR = 2.392;
            const PETROL_MPG = 15;
            const EV_KWH_PER_KM = 0.15;
            const GRID_EMISSION_FACTOR = 0.70;
            const TREE_ABSORPTION_PER_YEAR = 25;
            const PETROL_PRICE = 100;
            const ELECTRICITY_PRICE = 8;

            const litersConsumed = km / PETROL_MPG;
            const petrolCO2 = litersConsumed * PETROL_EMISSION_FACTOR;
            const petrolCost = litersConsumed * PETROL_PRICE;

            const kwhConsumed = km * EV_KWH_PER_KM;
            const evCO2 = kwhConsumed * GRID_EMISSION_FACTOR;
            const evCost = kwhConsumed * ELECTRICITY_PRICE;

            const co2Saved = petrolCO2 - evCO2;
            const costSaved = petrolCost - evCost;
            const trees = (co2Saved * 365) / TREE_ABSORPTION_PER_YEAR;

            const date = new Date();
            date.setDate(date.getDate() - (29 - i)); // Past 30 days

            sampleData.push({
                dailyKm: parseFloat(km.toFixed(1)),
                petrolCO2: parseFloat(petrolCO2.toFixed(3)),
                evCO2: parseFloat(evCO2.toFixed(3)),
                co2Saved: parseFloat(co2Saved.toFixed(3)),
                treesEquivalent: parseFloat(trees.toFixed(2)),
                costSaved: parseFloat(costSaved.toFixed(2)),
                createdAt: date // Set past date for history graph
            });
        }

        await History.insertMany(sampleData);
        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
