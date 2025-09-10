import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import RealTimeAlerts from '../components/dashboard/RealTimeAlerts';
import FileUpload from '../components/dashboard/FileUpload';
import OutbreakMap from '../components/dashboard/OutbreakMap';
import SanitationOps from '../components/dashboard/SanitationOps';
import TeamManagement from '../components/dashboard/TeamManagement';
import WasteManagement from '../components/dashboard/WasteManagement';
import OutbreakDelineation from '../components/dashboard/OutbreakDelineation';
import EmergencyConsole from '../components/dashboard/EmergencyConsole';

import { FiUsers, FiMap, FiActivity, FiAlertTriangle, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <Layout>
          <div className="space-y-6">

            {/* Top Row Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard title="Active Medical Cases" value="1,250" icon={<FiActivity size={24} />} trend="up" />
              <StatCard title="Outbreak Risk Level" value="Moderate" icon={<FiAlertTriangle size={24} />} valueColor="text-yellow-500" />
              <StatCard title="Medical Team Availability" value="350/400" icon={<FiUsers size={24} />} />
              <StatCard title="Medical Team Availability" value="..." icon={<FiUsers size={24} />} />
              <StatCard title="Emergency Response Time" value="8.5 mins" icon={<FiClock size={24} />} />
            </div>

            {/* Middle Row with Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 flex flex-col gap-6">
                <RealTimeAlerts />
                <FileUpload />
              </div>
              <div className="lg:col-span-2">
                <OutbreakMap />
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <FiMap className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Live Operations Map</h2>
            <p className="text-gray-500 mt-2 mb-6">View all facilities, teams, and routes in real-time.</p>
            <Link 
              to="/live-map" 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Open Live Map
            </Link>
          </div>
        

            {/* Third Row with Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SanitationOps />
              <TeamManagement />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WasteManagement />
                <OutbreakDelineation />
                <EmergencyConsole />
            </div>

          </div>
    </Layout>
  );
};

export default Dashboard;