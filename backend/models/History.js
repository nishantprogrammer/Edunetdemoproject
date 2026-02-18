const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true // Optional for now as authentication wasn't explicitly detailed in flow but implied by User model
    },
    dailyKm: {
        type: Number,
        required: true,
    },
    petrolCO2: {
        type: Number,
        required: true,
    },
    evCO2: {
        type: Number,
        required: true,
    },
    co2Saved: {
        type: Number,
        required: true,
    },
    treesEquivalent: {
        type: Number,
        required: true,
    },
    costSaved: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const History = mongoose.model('History', historySchema);
module.exports = History;
