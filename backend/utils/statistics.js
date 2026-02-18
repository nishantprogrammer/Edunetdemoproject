const calculateMean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const calculateMovingAverage = (data, period) => {
    const result = [];
    for (let i = 0; i < data.length - period + 1; i++) {
        const chunk = data.slice(i, i + period);
        const average = calculateMean(chunk);
        result.push(average);
    }
    return result;
};

const calculateStandardDeviation = (arr) => {
    const mean = calculateMean(arr);
    const squareDiffs = arr.map((value) => {
        const diff = value - mean;
        return diff * diff;
    });
    const avgSquareDiff = calculateMean(squareDiffs);
    return Math.sqrt(avgSquareDiff);
};

const calculateCorrelation = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) return 0;
    return numerator / denominator;
};

module.exports = {
    calculateMovingAverage,
    calculateStandardDeviation,
    calculateCorrelation,
};
