import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from '../components/Graph';

const Compare = () => {
    // For comparison, we will fetch history and show aggregated Petrol vs EV CO2
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get history to aggregate
                const res = await axios.get('http://localhost:5000/api/history');
                const history = res.data;
                // Backend returns sorted by Newest First (desc)
                // We want the top 10 recent ones, but displayed Chronologically (Left=Oldest of batch, Right=Newest)

                const latestTen = history.slice(0, 10).reverse();

                // Calculate the starting calculation number for accurate labels
                // If we have 50 total items, and we take the last 10, the first one shown (oldest of batch) is #41
                // The last one shown (newest) is #50
                const totalCount = history.length;
                const startingIndex = totalCount - latestTen.length + 1;

                const recent = latestTen.map((h, i) => ({
                    name: `Trip ${startingIndex + i}`, // e.g., Trip 41, Trip 42...
                    date: new Date(h.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                    Petrol: h.petrolCO2,
                    EV: h.evCO2
                }));
                setData(recent);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container animate-fade-in">
            <h1>Petrol vs EV Comparison</h1>
            <p>Visualizing the difference in CO₂ emissions for recent calculations.</p>

            <div style={{ marginTop: '3rem' }}>
                <Graph
                    title="Emission Comparison (Recents)"
                    data={data}
                    type="bar"
                    dataKey1="Petrol"
                    dataKey2="EV"
                />
            </div>

            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ background: 'rgba(255, 87, 34, 0.1)', border: '1px solid #FF5722' }}>
                    <h2 style={{ color: '#FF5722' }}>Petrol Vehicle</h2>
                    <ul style={{ lineHeight: '2' }}>
                        <li>High CO₂ Emissions (~2.3kg / liter)</li>
                        <li>Expensive Fuel Costs</li>
                        <li>High Maintenance (Engine, Oil, etc.)</li>
                        <li>Noise Pollution</li>
                    </ul>
                </div>
                <div className="card" style={{ background: 'rgba(0, 173, 181, 0.1)', border: '1px solid #00ADB5' }}>
                    <h2 style={{ color: '#00ADB5' }}>Electric Vehicle</h2>
                    <ul style={{ lineHeight: '2' }}>
                        <li>Zero Tailpipe Emissions</li>
                        <li>Low Electricity Costs (~₹1 per km)</li>
                        <li>Low Maintenance (Fewer moving parts)</li>
                        <li>Silent Operation</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Compare;
