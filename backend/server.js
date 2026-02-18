const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const { loadModel } = require('./utils/regressionModel');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Initialize Model and Start Server
loadModel().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to load regression model', err);
    // Continue running or exit? 
    // Requirement "server.js must ... load regression coefficients" implies successful load.
    // But we might want to start anyway.
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (Model failed)`);
    });
});
