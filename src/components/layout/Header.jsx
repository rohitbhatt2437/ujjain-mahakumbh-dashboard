import { FiCheckCircle, FiRefreshCw, FiAlertCircle, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { useAlerts } from '../../context/AlertContext';

const Header = () => {
  const { logout } = useAuth(); // Get the logout function
  const { alerts } = useAlerts(); 

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center flex-shrink-0">
      
      {/* ... (the left side of the header remains the same) ... */}

       

       <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            <span>System Health: All Good</span>
          </div>
          <div className="flex items-center gap-2">
            <FiRefreshCw className="text-blue-500" />
            <span>Data Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <FiAlertCircle className="text-orange-500" />
            <span>F&AD 166</span>
          </div>
        </div>
      <div className="flex items-center gap-4">
        {/* ... (alert count and profile info remain the same) ... */}
        <div className={`relative font-bold text-sm px-3 py-1 rounded-full transition-colors ${
            alerts.length > 0
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}>
          Alert Count: {alerts.length}
        </div>  
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <FiUser className="text-gray-500 text-xl" />
            </div>
            <div>
                <p className="font-semibold text-gray-800">Robin Profile</p>
                <p className="text-xs text-gray-500">Site Administrator</p>
            </div>
        </div>
        {/* Add onClick handler to the button */}
        <button
          onClick={logout}
          className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;