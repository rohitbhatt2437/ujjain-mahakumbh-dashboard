import DashboardCard from '../ui/DashboardCard';
import { FiArrowUp } from 'react-icons/fi';

const StatCard = ({ title, value, icon, trend, valueColor = 'text-gray-800' }) => {
  return (
    <DashboardCard>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-xs mt-2 text-green-600">
          <FiArrowUp />
          <span className="ml-1">System Better Uptake</span>
        </div>
      )}
    </DashboardCard>
  );
};

export default StatCard;