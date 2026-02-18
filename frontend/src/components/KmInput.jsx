import React, { useState } from 'react';
import { FaRoad, FaCogs, FaGasPump } from 'react-icons/fa';

const KmInput = ({ onCalculate, isLoading }) => {
    const [km, setKm] = useState('');
    const [engineSize, setEngineSize] = useState('');
    const [fuelConsumption, setFuelConsumption] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!km) return;
        onCalculate({
            km: parseFloat(km),
            engineSize: engineSize ? parseFloat(engineSize) : null,
            fuelConsumption: fuelConsumption ? parseFloat(fuelConsumption) : null
        });
    };

    return (
        <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Calculate Your Impact</h2>
            <p>Enter your daily travel distance to see how much CO₂ you could save.</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        <FaRoad style={{ marginRight: '8px' }} /> Daily Distance (km)
                    </label>
                    <input
                        type="number"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        placeholder="e.g. 45"
                        required
                        step="0.1"
                    />
                </div>

                <div style={{ margin: '1rem 0' }}>
                    <button
                        type="button"
                        className="btn-secondary"
                        style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                        {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options (For Better Accuracy)'}
                    </button>
                </div>

                {showAdvanced && (
                    <div className="animate-fade-in" style={{ marginBottom: '1.5rem', padding: '1rem', background: '#F7FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                <FaCogs style={{ marginRight: '8px' }} /> Engine Size (L)
                            </label>
                            <input
                                type="number"
                                value={engineSize}
                                onChange={(e) => setEngineSize(e.target.value)}
                                placeholder="e.g. 1.5"
                                step="0.1"
                            />
                            <small style={{ display: 'block', marginTop: '0.3rem', color: '#888' }}>
                                Total cylinder volume.
                                <br />Examples: <strong>Small Car</strong> (1.0-1.2L), <strong>Sedan</strong> (1.5-1.8L), <strong>SUV</strong> (2.0-3.0L).
                            </small>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                <FaGasPump style={{ marginRight: '8px' }} /> Fuel Consumption (L/100km)
                            </label>
                            <input
                                type="number"
                                value={fuelConsumption}
                                onChange={(e) => setFuelConsumption(e.target.value)}
                                placeholder="e.g. 8.0"
                                step="0.1"
                            />
                            <small style={{ display: 'block', marginTop: '0.3rem', color: '#888' }}>
                                Liters of fuel used per 100km.
                                <br />Examples: <strong>Efficient</strong> (4-6), <strong>Average</strong> (7-9), <strong>High</strong> (10+).
                            </small>
                        </div>
                        <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(0, 173, 181, 0.1)', borderRadius: '6px', borderLeft: '3px solid #00ADB5' }}>
                            <p style={{ fontSize: '0.85rem', margin: 0, color: '#4A5568' }}>
                                Providing these details uses our <strong>Machine Learning Regression Model</strong> to predict your specific car's CO₂ emissions instead of using a generic average.
                            </p>
                        </div>
                    </div>
                )}

                <button type="submit" className="btn" disabled={isLoading} style={{ width: '100%' }}>
                    {isLoading ? 'Calculating...' : 'Calculate Savings'}
                </button>
            </form>
        </div>
    );
};

export default KmInput;
