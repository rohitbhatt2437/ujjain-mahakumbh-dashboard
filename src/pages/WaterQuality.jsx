import React from 'react';
import Layout from '../components/layout/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

// --- UPDATED: 24-Hour Sample Data ---
// Data now covers a full day, with time in 24-hour format.
// The data simulates lower turbidity (cleaner water) in the early morning hours.
const waterQualityData = [
  { time: '00:00', 'Turbidity (NTU)': 7.8 }, { time: '01:00', 'Turbidity (NTU)': 7.2 },
  { time: '02:00', 'Turbidity (NTU)': 6.5 }, { time: '03:00', 'Turbidity (NTU)': 5.1 },
  { time: '04:00', 'Turbidity (NTU)': 4.5 }, { time: '05:00', 'Turbidity (NTU)': 3.9 }, // Cleanest time
  { time: '06:00', 'Turbidity (NTU)': 4.2 }, { time: '07:00', 'Turbidity (NTU)': 4.9 },
  { time: '08:00', 'Turbidity (NTU)': 5.6 }, { time: '09:00', 'Turbidity (NTU)': 6.4 },
  { time: '10:00', 'Turbidity (NTU)': 7.0 }, { time: '11:00', 'Turbidity (NTU)': 7.5 },
  { time: '12:00', 'Turbidity (NTU)': 8.1 }, { time: '13:00', 'Turbidity (NTU)': 8.5 }, // Peaking
  { time: '14:00', 'Turbidity (NTU)': 8.8 }, { time: '15:00', 'Turbidity (NTU)': 8.4 },
  { time: '16:00', 'Turbidity (NTU)': 8.2 }, { time: '17:00', 'Turbidity (NTU)': 8.6 },
  { time: '18:00', 'Turbidity (NTU)': 8.3 }, { time: '19:00', 'Turbidity (NTU)': 8.0 },
  { time: '20:00', 'Turbidity (NTU)': 7.6 }, { time: '21:00', 'Turbidity (NTU)': 7.9 },
  { time: '22:00', 'Turbidity (NTU)': 8.2 }, { time: '23:00', 'Turbidity (NTU)': 8.0 },
];

// The safe threshold remains the same
const SAFE_THRESHOLD = 5.0;

const WaterQuality = () => {
  // --- UPDATED: Get the actual current hour (0-23) ---
  const currentHour = new Date().getHours();
  // Find the data point in our array that matches the current hour
  const currentReading = waterQualityData[currentHour];

  const currentTurbidity = currentReading ? currentReading['Turbidity (NTU)'] : 'N/A';
  const isSafeForSnan = currentTurbidity <= SAFE_THRESHOLD;

  // Determine water quality category
  let qualityCategory = 'Unknown';
  if (currentTurbidity !== 'N/A') {
    if (currentTurbidity <= SAFE_THRESHOLD) {
      qualityCategory = 'Good';
    } else if (currentTurbidity <= 9.0) {
      qualityCategory = 'Moderate';
    } else {
      qualityCategory = 'Poor';
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* --- Top Status Indicators (now dynamically based on real time) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center ${isSafeForSnan ? 'bg-green-100' : 'bg-red-100'}`}>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Snan Recommendation (Right Now)</h2>
            {isSafeForSnan ? (
              <div className="flex items-center space-x-3">
                <FiCheckCircle className="text-5xl text-green-600" />
                <span className="text-2xl font-bold text-green-800">Safe for Snan</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <FiXCircle className="text-5xl text-red-600" />
                <span className="text-2xl font-bold text-red-800">Not Recommended</span>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Current Water Quality</h2>
            <p className="text-4xl font-bold text-blue-600">
              {typeof currentTurbidity === 'number' ? currentTurbidity.toFixed(1) : currentTurbidity}{' '}
              <span className="text-2xl text-gray-500">NTU</span>
            </p>
            <p className={`mt-1 px-3 py-1 text-sm font-semibold rounded-full ${
                qualityCategory === 'Good' ? 'bg-green-100 text-green-800' : 
                qualityCategory === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
              {qualityCategory}
            </p>
          </div>
        </div>

        {/* --- 24-Hour Water Quality Graph --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Water Quality Trend (24 Hours)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={waterQualityData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" interval={2} /> {/* Show label every 3 hours */}
                <YAxis label={{ value: 'Turbidity (NTU)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <ReferenceArea y1={0} y2={SAFE_THRESHOLD} label="Safe Zone" fill="#16A34A" fillOpacity={0.1} />
                {/* --- NEW: Add a line to show the current time on the graph --- */}
                <ReferenceLine x={waterQualityData[currentHour].time} stroke="red" strokeWidth={2} label={{ value: 'Now', fill: 'red', position: 'insideTop' }} />
                <Line type="monotone" dataKey="Turbidity (NTU)" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WaterQuality;