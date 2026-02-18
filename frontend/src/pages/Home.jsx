
import React, { useState } from 'react';
import axios from 'axios';
import { FaBolt, FaLeaf, FaCar, FaSmog, FaTree, FaMoneyBillWave } from 'react-icons/fa';
import KmInput from '../components/KmInput';
import ResultCard from '../components/ResultCard';

const Home = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCalculate = async (data) => {
        setLoading(true);
        setError('');
        // Clear previous results while loading
        setResults(null);
        try {
            // Local dev URL, should be from env
            const response = await axios.post('http://localhost:5000/api/calculate', data);
            setResults(response.data);
            // Scroll to results
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (err) {
            console.error(err);
            setError('Failed to calculate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>

            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '3rem 1rem', background: 'linear-gradient(135deg, rgba(0, 173, 181, 0.1), rgba(0, 255, 245, 0.05))', borderRadius: '24px' }}>
                <FaLeaf size={50} color="#00ADB5" style={{ marginBottom: '1rem' }} />
                <h1 style={{ marginBottom: '1rem', fontSize: '3rem' }}>Drive Clean, Save Green</h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2rem auto', color: '#4A5568' }}>
                    Calculate accurately how much CO₂ and money you can save by switching your daily commute to an Electric Vehicle.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaCar color="#00ADB5" /> <span>Real-time ML Predictions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaTree color="#4CAF50" /> <span>Tree Equivalent Calc</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaMoneyBillWave color="#FFC107" /> <span>Cost Analysis</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

                {/* Calculator Section */}
                <div>
                    <KmInput onCalculate={handleCalculate} isLoading={loading} />
                    {error && <p style={{ color: '#FF5722', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
                </div>

                {/* Info Cards / Results */}
                <div>
                    {!results ? (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div className="card" style={{ borderLeft: '4px solid #FF5722' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <FaSmog size={24} color="#FF5722" />
                                    <h3>The Problem</h3>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    Standard petrol cars emit approx <strong>2.3kg of CO₂</strong> for every liter of fuel burned. This accounts for nearly 20% of global emissions.
                                </p>
                            </div>

                            <div className="card" style={{ borderLeft: '4px solid #00ADB5' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <FaBolt size={24} color="#00ADB5" />
                                    <h3>The EV Solution</h3>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    EVs have zero tailpipe emissions. Even with grid charging, they reduce carbon footprint by <strong>60-80%</strong> over their lifetime.
                                </p>
                            </div>

                            <div className="card" style={{ borderLeft: '4px solid #4CAF50' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <FaTree size={24} color="#4CAF50" />
                                    <h3>Impact</h3>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    Saving just 1 Ton of CO₂ is equivalent to the carbon absorbed by <strong>50 trees</strong> in a single year.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div id="results-section" className="animate-fade-in">
                            <ResultCard results={results} />

                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <p>Want to track this over time?</p>
                                <a href="/dashboard" className="btn-secondary" style={{ padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block' }}>
                                    View Dashboard
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Features */}
            <div style={{ marginTop: '5rem', marginBottom: '3rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why It Matters</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaSmog size={40} color="#718096" style={{ marginBottom: '1rem' }} />
                        <h3>Air Quality</h3>
                        <p>Reduce smog and particulate matter effectively in urban centers.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaMoneyBillWave size={40} color="#38B2AC" style={{ marginBottom: '1rem' }} />
                        <h3>Wallet Friendly</h3>
                        <p>Electricity costs a fraction of petrol/diesel per kilometer driven.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaCar size={40} color="#805AD5" style={{ marginBottom: '1rem' }} />
                        <h3>Future Ready</h3>
                        <p>Join the revolution of sustainable transport powered by renewables.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
