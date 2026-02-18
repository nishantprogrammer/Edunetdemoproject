import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

const Graph = ({ data, type = 'line', dataKey1, dataKey2, xKey = 'name', title }) => {
    return (
        <div className="card" style={{ height: '400px', width: '100%', padding: '1rem', marginTop: '2rem' }}>
            {title && <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h3>}
            <ResponsiveContainer width="100%" height="100%">
                {type === 'line' ? (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey={xKey} stroke="#718096" />
                        <YAxis stroke="#718096" />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#2D3748' }} />
                        <Legend />
                        <Line type="monotone" dataKey={dataKey1} stroke="#00ADB5" strokeWidth={2} activeDot={{ r: 8 }} />
                        {dataKey2 && <Line type="monotone" dataKey={dataKey2} stroke="#FF5722" strokeWidth={2} />}
                    </LineChart>
                ) : (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey={xKey} stroke="#718096" />
                        <YAxis stroke="#718096" />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#2D3748' }} />
                        <Legend />
                        <Bar dataKey={dataKey1} fill="#00ADB5" />
                        {dataKey2 && <Bar dataKey={dataKey2} fill="#FF5722" />}
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
