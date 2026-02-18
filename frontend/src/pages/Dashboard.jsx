import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from '../components/Graph';
import HistoryTable from '../components/HistoryTable';
import { FaChartLine, FaChartBar, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, historyRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/stats'),
                    axios.get('http://localhost:5000/api/history')
                ]);
                setStats(statsRes.data);
                setHistory(historyRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="container">Loading Dashboard...</div>;
    if (!stats) return <div className="container">No data available</div>;

    // Prepare data for graphs
    // Moving Average Data
    const maData = stats.movingAverageKm?.map((val, i) => ({
        name: `Day ${i + 1}`,
        avgKm: parseFloat(val.toFixed(2))
    })) || [];

    // Projection Data
    const projectionData = stats.projectedSavings?.map(item => ({
        name: `Day ${item.day}`,
        predictedCO2: parseFloat(item.predictedCO2Saved.toFixed(2))
    })) || [];

    const handleClearHistory = async () => {
        if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            try {
                await axios.delete('http://localhost:5000/api/history');
                setHistory([]);
                // Reload stats after clear to get clean structure
                const res = await axios.get('http://localhost:5000/api/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to clear history', err);
            }
        }
    };

    return (
        <div className="container animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1><FaChartLine /> Global Impact Dashboard</h1>
                <button onClick={handleClearHistory} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', color: '#FF5722', borderColor: '#FF5722' }}>
                    Reset History
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3>Total Calculations</h3>
                    <p style={{ fontSize: '3rem', color: '#00ADB5', fontWeight: 'bold' }}>{stats.count}</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3>CO₂ Savings Std Dev</h3>
                    <p style={{ fontSize: '2rem', color: '#FF5722' }}>{stats.stdDevCO2?.toFixed(2)}</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3>Km/CO₂ Correlation</h3>
                    <p style={{ fontSize: '2rem', color: '#4CAF50' }}>{stats.correlation?.toFixed(2)}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '4rem' }}>
                <Graph
                    title="User Activity: 7-Day Moving Average (Km)"
                    data={maData}
                    dataKey1="avgKm"
                    type="line"
                />

                <Graph
                    title="Future Prediction: CO₂ Savings Projection (Next 30 Days)"
                    data={projectionData}
                    dataKey1="predictedCO2"
                    type="line"
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2><FaHistory /> Calculation History</h2>
                <HistoryTable data={history} />
            </div>
        </div>
    );
};

export default Dashboard;
