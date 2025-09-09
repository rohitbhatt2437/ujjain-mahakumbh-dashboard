import React from 'react';
import Layout from '../components/layout/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaTrash, FaRestroom, FaTint, FaHospital, FaUtensils } from 'react-icons/fa';

// --- Mock Data Simulation for DAILY usage ---
const mockDustbinData = Array.from({ length: 50 }, (_, i) => ({
  name: `Dustbin ${i + 1}`,
  usage: Math.floor(Math.random() * 8) + 1, // Simulates being filled 1 to 8 times today
})).sort((a, b) => b.usage - a.usage);

const mockToiletData = Array.from({ length: 30 }, (_, i) => ({
  name: `Toilet ${i + 1}`,
  usage: Math.floor(Math.random() * 40) + 5, // Simulates being used 5 to 45 times today
})).sort((a, b) => b.usage - a.usage);

const mockWaterData = Array.from({ length: 15 }, (_, i) => ({
  name: `Water Point ${i + 1}`,
  usage: Math.floor(Math.random() * 200) + 50, // 50–250 users
})).sort((a, b) => b.usage - a.usage);

const mockMedicalData = Array.from({ length: 10 }, (_, i) => ({
  name: `Camp ${i + 1}`,
  checkups: Math.floor(Math.random() * 100) + 20, // 20–120 checkups
})).sort((a, b) => b.checkups - a.checkups);

const mockFoodStallData = Array.from({ length: 20 }, (_, i) => ({
  name: `Stall ${i + 1}`,
  rating: Math.floor(Math.random() * 5) + 1, // Rating 1–5
  qualityChecks: Math.floor(Math.random() * 15) + 1, // 1–15 checks
}));

const highRatedStalls = mockFoodStallData.filter(stall => stall.rating >= 4);
const lowRatedStalls = mockFoodStallData.filter(stall => stall.rating <= 2);

const top20Dustbins = mockDustbinData.slice(0, 20);
const top10Toilets = mockToiletData.slice(0, 10);

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* --- High-Level Summary Cards (Added New) --- */}
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
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaTint className="text-4xl text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Water Points</p>
              <p className="text-2xl font-bold text-gray-800">{mockWaterData.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaHospital className="text-4xl text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Medical Camps</p>
              <p className="text-2xl font-bold text-gray-800">{mockMedicalData.length}</p>
            </div>
          </div>
        </div>

        {/* --- Top 20 Dustbins Chart (Existing) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top 20 Most Used Dustbins (Today)</h2>
          <div style={{ width: '100%', height: 600 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={top20Dustbins} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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

        {/* --- Top 10 Toilets Chart (Existing) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top 10 Most Used Toilets (Today)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={top10Toilets} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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

        {/* --- Water Monitoring Chart --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Water Points Usage (Today)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={mockWaterData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" name="Users Today" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Medical Camp Chart --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Medical Camps Checkups (Today)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={mockMedicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="checkups" name="Checkups Today" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Food Stalls High Rated --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">High Rated Food Stalls (4★ & above)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={highRatedStalls} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" name="Rating" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Food Stalls Low Rated --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Low Rated Food Stalls (2★ & below)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={lowRatedStalls} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" name="Rating" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Food Quality Checkups --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Food Quality Checkups (Today)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart layout="vertical" data={mockFoodStallData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="qualityChecks" name="Quality Checks" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
