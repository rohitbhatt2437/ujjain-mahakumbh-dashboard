import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FileUpload from '../components/dashboard/FileUpload'; // 👈 Reusing the FileUpload component

const MedicalOperations = () => {
  // State for the form fields
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
    // Clear the form
    setPatientId('');
    setAidType('First Aid');
    setNotes('');
  };

  return (
    <Layout>
      {/* Main two-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        
        {/* --- LEFT HALF --- */}
        <div className="flex flex-col gap-6">
          
          {/* 1. Medical Aid Form (Top-Left) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log Medical Aid Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID / Name</label>
                <input
                  type="text"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., P12345 or John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="aidType" className="block text-sm font-medium text-gray-700">Type of Aid</label>
                <select
                  id="aidType"
                  value={aidType}
                  onChange={(e) => setAidType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>First Aid</option>
                  <option>Medication Dispensed</option>
                  <option>Ambulance Transport</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  id="notes"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter any relevant details..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Log Aid
              </button>
            </form>
          </div>

          {/* 2. File Upload Component (Bottom-Left) */}
          <div className="flex-grow">
            <FileUpload />
          </div>

        </div>

        {/* --- RIGHT HALF (Placeholder) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-400">Right Panel</h2>
            <p className="mt-2 text-gray-500">Content for this section will be added later.</p>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default MedicalOperations;