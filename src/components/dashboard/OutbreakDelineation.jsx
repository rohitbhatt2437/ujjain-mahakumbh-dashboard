import DashboardCard from '../ui/DashboardCard';

const StatusItem = ({ label, color }) => (
    <div className="flex items-center justify-between text-sm py-1">
        <span>{label}</span>
        <span className={`w-3 h-3 rounded-full ${color}`}></span>
    </div>
);

const OutbreakDelineation = () => {
  return (
    <DashboardCard title="Outbreak Delineation Dashboard">
        <div className="space-y-2">
            <StatusItem label="Confirmed Cases" color="bg-red-500" />
            <StatusItem label="Suspected Cases" color="bg-yellow-500" />
            <StatusItem label="Safe Zones" color="bg-green-500" />
            <StatusItem label="High-Risk Contact" color="bg-orange-500" />
            <StatusItem label="Team Deployment" color="bg-blue-500" />
        </div>
    </DashboardCard>
  )
}

export default OutbreakDelineation;