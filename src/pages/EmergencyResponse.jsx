import React from 'react';
import Layout from '../components/layout/Layout';
import { useAlerts } from '../context/AlertContext';
import { FiAlertTriangle, FiCheckCircle, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

const EmergencyResponse = () => {
  // Get both active and resolved alerts from the context
  const { alerts, resolvedAlerts, resolveAlert } = useAlerts();

  // Helper function to get a color based on the alert type
  const getAlertColor = (type) => {
    switch (type.toLowerCase()) {
      case 'medical':
        return 'border-red-500 bg-red-50';
      case 'fire':
        return 'border-orange-500 bg-orange-50';
      case 'security':
        return 'border-blue-500 bg-blue-50';
      case 'sanitation':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* --- Active Alerts Section --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Active Emergency Alerts</h1>
          {alerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.map(alert => (
                <div key={alert.id} className={`rounded-lg shadow-md border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <FiAlertTriangle className={`mr-3 text-2xl ${getAlertColor(alert.type).replace('bg-', 'text-').replace('-50', '-600')}`} />
                      <h2 className="text-xl font-bold text-gray-800">{alert.type} Emergency</h2>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center">
                        <FiMapPin className="mr-2" />
                        <span>Location: <strong>{alert.location}</strong></span>
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="mr-2" />
                        <span>Assigned Team: <strong>{alert.team}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 mt-4">
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                    >
                      <FiCheckCircle className="mr-2" />
                      Mark as Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">All Clear!</h3>
              <p className="mt-2 text-gray-500">There are currently no active emergency alerts.</p>
            </div>
          )}
        </div>

        {/* --- Resolved Emergencies Section --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Previously Resolved Emergencies</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {resolvedAlerts.length > 0 ? (
              resolvedAlerts.map(alert => (
                <div key={alert.id} className="flex-shrink-0 w-80 bg-gray-100 p-4 rounded-lg border">
                  <div className="flex items-center mb-2">
                    <FiCheckCircle className="text-green-600 mr-2" />
                    <h3 className="font-bold text-gray-700">{alert.type} Emergency</h3>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiMapPin size={14} className="mr-2" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers size={14} className="mr-2" />
                      <span>Team: {alert.team}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock size={14} className="mr-2" />
                      <span>Resolved: {new Date(alert.resolvedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No emergencies have been resolved yet.</p>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default EmergencyResponse;