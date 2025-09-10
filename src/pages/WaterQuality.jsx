import React from 'react';
import Layout from '../components/layout/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

// --- UPDATED: Data now varies between 200 and 400 ---
const waterQualityData = [
  { time: '00:00', 'Turbidity (NTU)': 380 }, { time: '01:00', 'Turbidity (NTU)': 350 },
  { time: '02:00', 'Turbidity (NTU)': 310 }, { time: '03:00', 'Turbidity (NTU)': 260 },
  { time: '04:00', 'Turbidity (NTU)': 220 }, { time: '05:00', 'Turbidity (NTU)': 210 }, // Cleanest time
  { time: '06:00', 'Turbidity (NTU)': 230 }, { time: '07:00', 'Turbidity (NTU)': 245 },
  { time: '08:00', 'Turbidity (NTU)': 280 }, { time: '09:00', 'Turbidity (NTU)': 320 },
  { time: '10:00', 'Turbidity (NTU)': 350 }, { time: '11:00', 'Turbidity (NTU)': 370 },
  { time: '12:00', 'Turbidity (NTU)': 390 }, { time: '13:00', 'Turbidity (NTU)': 395 }, // Peaking
  { time: '14:00', 'Turbidity (NTU)': 400 }, { time: '15:00', 'Turbidity (NTU)': 390 },
  { time: '16:00', 'Turbidity (NTU)': 385 }, { time: '17:00', 'Turbidity (NTU)': 390 },
  { time: '18:00', 'Turbidity (NTU)': 375 }, { time: '19:00', 'Turbidity (NTU)': 360 },
  { time: '20:00', 'Turbidity (NTU)': 350 }, { time: '21:00', 'Turbidity (NTU)': 355 },
  { time: '22:00', 'Turbidity (NTU)': 365 }, { time: '23:00', 'Turbidity (NTU)': 370 },
];

// --- UPDATED: New safe threshold for the higher range ---
const SAFE_THRESHOLD = 250.0;

const WaterQuality = () => {
  const currentHour = new Date().getHours();
  const currentReading = waterQualityData[currentHour];

  const currentTurbidity = currentReading ? currentReading['Turbidity (NTU)'] : 'N/A';
  const isSafeForSnan = currentTurbidity <= SAFE_THRESHOLD;

  // --- UPDATED: New thresholds for quality categories ---
  let qualityCategory = 'Unknown';
  if (currentTurbidity !== 'N/A') {
    if (currentTurbidity <= SAFE_THRESHOLD) {
      qualityCategory = 'Good';
    } else if (currentTurbidity <= 350) {
      qualityCategory = 'Moderate';
    } else {
      qualityCategory = 'Poor';
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* --- Top Status Indicators (will update automatically) --- */}
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
              {typeof currentTurbidity === 'number' ? currentTurbidity.toFixed(0) : currentTurbidity}{' '}
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

        {/* --- 24-Hour Water Quality Graph (will update automatically) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Water Quality Trend (24 Hours)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={waterQualityData}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" interval={2} />
                <YAxis domain={[200, 400]} label={{ value: 'Turbidity (NTU)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <ReferenceArea y1={200} y2={SAFE_THRESHOLD} label="Safe Zone" fill="#16A34A" fillOpacity={0.1} />
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