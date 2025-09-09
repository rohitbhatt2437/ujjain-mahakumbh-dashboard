
import { Link } from 'react-router-dom'; // 👈 Import Link
import Layout from '../components/layout/Layout';
import { FaTrash, FaCheckCircle, FaExclamationTriangle, FaRestroom, FaMapMarkerAlt } from 'react-icons/fa'; // 👈 Import new icon
import { useState, useEffect } from 'react';

const SanitationMonitoring = () => {
  // State and useEffect hooks remain the same...
  const [dustbins, setDustbins] = useState(() => {
    const saved = localStorage.getItem('dustbins');
    return saved ? JSON.parse(saved) : [];
  });
  const [toilets, setToilets] = useState(() => {
    const saved = localStorage.getItem('toilets');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    const handleStorageChange = () => {
      const savedDustbins = localStorage.getItem('dustbins');
      setDustbins(savedDustbins ? JSON.parse(savedDustbins) : []);
      const savedToilets = localStorage.getItem('toilets');
      setToilets(savedToilets ? JSON.parse(savedToilets) : []);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fullDustbins = dustbins.filter(d => d.status === 'Full');
  const dirtyToilets = toilets.filter(t => t.status === 'Needs Cleaning');

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* --- DUSTBIN SECTION --- */}
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dustbin Status</h2>
            {/* Summary cards remain the same... */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">All Dustbins</h3>
                {dustbins.length > 0 ? (<ul className="divide-y divide-gray-200">{dustbins.map(item => (
                    <li key={item.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <FaTrash className={`mr-4 ${item.status === 'Full' ? 'text-red-500' : 'text-green-500'}`} />
                            <span className="font-medium text-gray-700">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.status === 'Full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{item.status}</span>
                            {/* --- NEW LOCATE BUTTON --- */}
                            <Link to={`/?highlight=dustbin&id=${item.id}`} className="p-2 rounded-full hover:bg-gray-200" title="Locate on Map">
                                <FaMapMarkerAlt className="text-gray-500" />
                            </Link>
                        </div>
                    </li>
                ))}</ul>) : (<p className="text-gray-500">No dustbins placed.</p>)}
            </div>
        </div>

        {/* --- TOILET SECTION --- */}
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Toilet Status</h2>
            {/* Summary cards remain the same... */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">All Toilets</h3>
                {toilets.length > 0 ? (<ul className="divide-y divide-gray-200">{toilets.map(item => (
                    <li key={item.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <FaRestroom className={`mr-4 ${item.status === 'Needs Cleaning' ? 'text-red-500' : 'text-green-500'}`} />
                            <span className="font-medium text-gray-700">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.status === 'Needs Cleaning' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{item.status}</span>
                            {/* --- NEW LOCATE BUTTON --- */}
                            <Link to={`/?highlight=toilet&id=${item.id}`} className="p-2 rounded-full hover:bg-gray-200" title="Locate on Map">
                                <FaMapMarkerAlt className="text-gray-500" />
                            </Link>
                        </div>
                    </li>
                ))}</ul>) : (<p className="text-gray-500">No toilets placed.</p>)}
            </div>
        </div>

      </div>
    </Layout>
  );
};

export default SanitationMonitoring;