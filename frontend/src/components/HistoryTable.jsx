import React from 'react';

const HistoryTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No history available.</p>;
    }

    return (
        <div className="card" style={{ marginTop: '2rem', overflowX: 'auto' }}>
            <h3 style={{ marginBottom: '1rem' }}>Recent Calculations</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>Distance (km)</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>Petrol CO₂ (kg)</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>EV CO₂ (kg)</th>
                        <th style={{ padding: '10px', textAlign: 'right', color: '#00C896' }}>Saved (kg)</th>
                        <th style={{ padding: '10px', textAlign: 'right', color: '#4CAF50' }}>Trees</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id || index} style={{ borderBottom: '1px solid #EDF2F7' }}>
                            <td style={{ padding: '10px' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td style={{ padding: '10px', textAlign: 'right' }}>{item.dailyKm}</td>
                            <td style={{ padding: '10px', textAlign: 'right' }}>{item.petrolCO2?.toFixed(2)}</td>
                            <td style={{ padding: '10px', textAlign: 'right' }}>{item.evCO2?.toFixed(2)}</td>
                            <td style={{ padding: '10px', textAlign: 'right', color: '#00C896', fontWeight: 'bold' }}>{item.co2Saved?.toFixed(2)}</td>
                            <td style={{ padding: '10px', textAlign: 'right', color: '#4CAF50' }}>{item.treesEquivalent?.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;
