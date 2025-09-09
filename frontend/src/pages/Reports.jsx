import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAlerts } from '../context/AlertContext'; // 👈 Use our new hook
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

// Hardcoded list of available teams (reuse from your bar chart)
const availableTeams = [
  'Team Alpha', 'Team Bravo', 'Team Charlie', 'Ghat 1 Unit', 'Sector 5 Crew', 'Mobile Unit 3'
];

const Reports = () => {
  const { alerts, addAlert, resolveAlert } = useAlerts();

  // State for the new alert form
  const [emergencyType, setEmergencyType] = useState('Medical');
  const [location, setLocation] = useState('');
  const [assignedTeam, setAssignedTeam] = useState(availableTeams[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert('Please enter a location for the emergency.');
      return;
    }
    addAlert({ type: emergencyType, location, team: assignedTeam });
    // Reset form
    setLocation('');
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Left Panel: Create Alert Form --- */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Emergency Alert</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="emergencyType" className="block text-sm font-medium text-gray-700">Emergency Type</label>
              <select id="emergencyType" value={emergencyType} onChange={(e) => setEmergencyType(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Medical</option>
                <option>Fire</option>
                <option>Security</option>
                <option>Sanitation</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Near Ghat 2" required />
            </div>
            <div>
              <label htmlFor="assignedTeam" className="block text-sm font-medium text-gray-700">Assign Team</label>
              <select id="assignedTeam" value={assignedTeam} onChange={(e) => setAssignedTeam(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {availableTeams.map(team => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
              Dispatch Alert
            </button>
          </form>
        </div>

        {/* --- Right Panel: Active Alerts List --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Active Alerts ({alerts.length})</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div key={alert.id} className="border border-yellow-300 bg-yellow-50 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FiAlertTriangle className="text-yellow-600 mr-4" size={20} />
                    <div>
                      <p className="font-bold text-yellow-800">{alert.type} Emergency</p>
                      <p className="text-sm text-gray-600">Location: {alert.location}</p>
                      <p className="text-sm text-gray-600">Assigned Team: <b>{alert.team}</b></p>
                    </div>
                  </div>
                  <button onClick={() => resolveAlert(alert.id)} className="flex items-center px-3 py-1 text-sm text-green-700 bg-green-200 rounded-full hover:bg-green-300" title="Mark as Resolved">
                    <FiCheckCircle className="mr-1" />
                    Resolve
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No active alerts.</p>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Reports;