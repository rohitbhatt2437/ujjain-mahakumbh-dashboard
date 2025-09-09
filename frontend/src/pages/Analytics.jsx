import React from 'react';
import Layout from '../components/layout/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaTrash, FaRestroom } from 'react-icons/fa';

// --- Mock Data Simulation for DAILY usage ---
const mockDustbinData = Array.from({ length: 50 }, (_, i) => ({
  name: `Dustbin ${i + 1}`,
  usage: Math.floor(Math.random() * 8) + 1, // Simulates being filled 1 to 8 times today
})).sort((a, b) => b.usage - a.usage);

const mockToiletData = Array.from({ length: 30 }, (_, i) => ({
  name: `Toilet ${i + 1}`,
  usage: Math.floor(Math.random() * 40) + 5, // Simulates being used 5 to 45 times today
})).sort((a, b) => b.usage - a.usage);

// Get the top items for our charts
const top20Dustbins = mockDustbinData.slice(0, 20);
const top10Toilets = mockToiletData.slice(0, 10);

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* --- High-Level Summary Cards (No Change) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaTrash className="text-4xl text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Deployed Dustbins</p>
              <p className="text-2xl font-bold text-gray-800">{mockDustbinData.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaRestroom className="text-4xl text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Deployed Toilets</p>
              <p className="text-2xl font-bold text-gray-800">{mockToiletData.length}</p>
            </div>
          </div>
        </div>

        {/* --- Top 20 Dustbins Chart (Updated Title) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top 20 Most Used Dustbins (Today)</h2>
          <div style={{ width: '100%', height: 600 }}>
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={top20Dustbins}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" name="Times Filled Today" fill="#16A34A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Top 10 Toilets Chart (Updated Title) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top 10 Most Used Toilets (Today)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={top10Toilets}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" name="Uses Today" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Analytics;