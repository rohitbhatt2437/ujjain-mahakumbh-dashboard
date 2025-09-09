import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FileUpload from '../components/dashboard/FileUpload';
// --- 1. Import necessary components from recharts ---
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- 2. Create hardcoded data for the chart ---
const diseaseData = [
  { name: 'Common Cold', value: 450 },
  { name: 'Influenza (Flu)', value: 280 },
  { name: 'COVID-19', value: 120 },
  { name: 'Stomach Bug', value: 180 },
  { name: 'Other', value: 90 },
];

// --- Define custom colors for the chart slices ---
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF2'];

const MedicalOperations = () => {
  // State for the form fields (no change here)
  const [patientId, setPatientId] = useState('');
  const [aidType, setAidType] = useState('First Aid');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      Logging Medical Aid:
      Patient ID: ${patientId}
      Aid Type: ${aidType}
      Notes: ${notes}
    `);
    setPatientId('');
    setAidType('First Aid');
    setNotes('');
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        
        {/* --- LEFT HALF (No Change) --- */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log Medical Aid Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields remain the same */}
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID / Name</label>
                <input type="text" id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., P12345 or John Doe" required />
              </div>
              <div>
                <label htmlFor="aidType" className="block text-sm font-medium text-gray-700">Type of Aid</label>
                <select id="aidType" value={aidType} onChange={(e) => setAidType(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option>First Aid</option><option>Medication Dispensed</option><option>Ambulance Transport</option><option>Consultation</option></select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea id="notes" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter any relevant details..."></textarea>
              </div>
              <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Log Aid</button>
            </form>
          </div>
          <div className="flex-grow">
            <FileUpload />
          </div>
        </div>

        {/* --- 3. RIGHT HALF (Updated with Donut Chart) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Disease Breakdown</h2>
          <div className="w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80} // This creates the donut hole
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicalOperations;