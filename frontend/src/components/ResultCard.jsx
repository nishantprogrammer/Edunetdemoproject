import React from 'react';
import { FaLeaf, FaMoneyBillWave, FaTree } from 'react-icons/fa';

const ResultCard = ({ results }) => {
    if (!results) return null;

    const { petrolCO2, evCO2, co2Saved, costSaved, treesEquivalent } = results;

    return (
        <div className="card animate-fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h2>Your Savings Report</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>

                <div style={{ padding: '1.5rem', background: 'rgba(0, 200, 150, 0.1)', borderRadius: '12px', border: '1px solid #00C896' }}>
                    <FaLeaf size={40} color="#00C896" />
                    <h3 style={{ margin: '1rem 0' }}>CO₂ Saved</h3>
                    <div style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                        <p style={{ margin: '0.5rem 0', color: '#00C896' }}><strong>Daily:</strong> {co2Saved} kg</p>
                        <p style={{ margin: '0.5rem 0', color: '#00ADB5' }}><strong>Monthly:</strong> {results.monthlySaved} kg</p>
                        <p style={{ margin: '0.5rem 0', color: '#00C896' }}><strong>Yearly:</strong> {results.yearlySaved} kg</p>
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#888' }}>Prev: {petrolCO2}kg | New: {evCO2}kg (Daily)</p>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(0, 180, 216, 0.1)', borderRadius: '12px', border: '1px solid #00B4D8' }}>
                    <FaMoneyBillWave size={40} color="#00B4D8" />
                    <h3 style={{ margin: '1rem 0' }}>Money Saved</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00B4D8' }}>₹{costSaved}</p>
                    <p style={{ fontSize: '0.9rem' }}>Per day estimate</p>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '12px', border: '1px solid #4CAF50' }}>
                    <FaTree size={40} color="#4CAF50" />
                    <h3 style={{ margin: '1rem 0' }}>Trees Helper</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{treesEquivalent}</p>
                    <p style={{ fontSize: '0.9rem' }}>Trees needed to absorb this yearly</p>
                </div>

            </div>
        </div>
    );
};

export default ResultCard;
