import DashboardCard from '../ui/DashboardCard';
import { FiTrash2 } from 'react-icons/fi';

const WasteBin = ({ color }) => (
    <div className={`p-3 rounded-lg ${color}`}>
        <FiTrash2 size={24} className="text-white" />
    </div>
);

const WasteManagement = () => {
  return (
    <DashboardCard title="Waste Management Dashboard">
        <div className="grid grid-cols-4 gap-4 text-center">
            <WasteBin color="bg-green-500" />
            <WasteBin color="bg-yellow-500" />
            <WasteBin color="bg-red-500" />
            <WasteBin color="bg-gray-500" />
            <WasteBin color="bg-green-500" />
            <WasteBin color="bg-yellow-500" />
            <WasteBin color="bg-red-500" />
            <WasteBin color="bg-gray-500" />
        </div>
    </DashboardCard>
  )
}

export default WasteManagement;