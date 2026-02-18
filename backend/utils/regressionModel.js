const fs = require('fs');
const csv = require('csv-parser');
const ML = require('ml-regression');
const MVLR = ML.MultivariateLinearRegression;

let regressionModel = null;

const loadModel = () => {
    return new Promise((resolve, reject) => {
        const x = [];
        const y = [];
        fs.createReadStream('./data/vehicle_emissions.csv') // Assuming path relative to execution root
            .pipe(csv())
            .on('data', (row) => {
                // Parse features: Engine Size, Fuel Consumption Comb
                const engineSize = parseFloat(row['Engine Size(L)']);
                const fuelCons = parseFloat(row['Fuel Consumption Comb (L/100 km)']);
                const co2 = parseFloat(row['CO2 Emissions(g/km)']);

                if (!isNaN(engineSize) && !isNaN(fuelCons) && !isNaN(co2)) {
                    x.push([engineSize, fuelCons]);
                    y.push([co2]); // MVLR expects Y as array of arrays (one output per sample)
                }
            })
            .on('end', () => {
                if (x.length > 0) {
                    regressionModel = new MVLR(x, y);
                    console.log('Multivariate Regression Model Trained via Javascript');
                    resolve(regressionModel);
                } else {
                    console.warn('No data for regression model');
                    resolve(null);
                }
            })
            .on('error', (err) => {
                console.error('Error loading CSV for regression:', err);
                reject(err);
            });
    });
};

const predictCO2 = (engineSize, fuelConsumption) => {
    if (regressionModel) {
        // Prepare input as a matrix (array of arrays)
        const prediction = regressionModel.predict([[engineSize, fuelConsumption]]);
        // Result is matrix [[y1], [y2]...]. Here just [[y1]]
        return prediction[0][0];
    }
    return 0;
};

module.exports = { loadModel, predictCO2 };
