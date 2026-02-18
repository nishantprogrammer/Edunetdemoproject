const {
    PETROL_EMISSION_FACTOR,
    PETROL_MPG,
    EV_KWH_PER_KM,
    GRID_EMISSION_FACTOR,
    TREE_ABSORPTION_PER_YEAR,
    PETROL_PRICE,
    ELECTRICITY_PRICE
} = require('./constants');

const calculateEmissions = (km) => {
    // Petrol Calculation
    const litersConsumed = km / PETROL_MPG;
    const petrolCO2 = litersConsumed * PETROL_EMISSION_FACTOR; // kg
    const petrolCost = litersConsumed * PETROL_PRICE; // INR

    // EV Calculation
    const kwhConsumed = km * EV_KWH_PER_KM;
    const evCO2 = kwhConsumed * GRID_EMISSION_FACTOR; // kg
    const evCost = kwhConsumed * ELECTRICITY_PRICE; // INR

    const co2Saved = petrolCO2 - evCO2;
    const costSaved = petrolCost - evCost;

    // Trees needed to absorb the saved CO2 in a year
    // If co2Saved is for one day, we project it ? 
    // No, usually "trees equivalent" means "this saving is equivalent to X trees planting"
    // Let's assume the saving is daily, so yearly saving = co2Saved * 365
    // trees = (co2Saved * 365) / TREE_ABSORPTION_PER_YEAR
    const treesEquivalent = (co2Saved * 365) / TREE_ABSORPTION_PER_YEAR;

    // Projections
    const dailySaved = co2Saved;
    const monthlySaved = dailySaved * 30;
    const yearlySaved = dailySaved * 365;

    return {
        petrolCO2: parseFloat(petrolCO2.toFixed(3)),
        evCO2: parseFloat(evCO2.toFixed(3)),
        co2Saved: parseFloat(dailySaved.toFixed(3)),
        monthlySaved: parseFloat(monthlySaved.toFixed(3)),
        yearlySaved: parseFloat(yearlySaved.toFixed(3)),
        costSaved: parseFloat(costSaved.toFixed(2)),
        treesEquivalent: parseFloat(treesEquivalent.toFixed(2))
    };
};

module.exports = calculateEmissions;
