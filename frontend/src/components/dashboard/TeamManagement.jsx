import DashboardCard from '../ui/DashboardCard';

const TeamManagement = () => {
  return (
    <DashboardCard title="Team Management Dashboard">
        <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Team Performance Chart Area</p>
        </div>
    </DashboardCard>
  )
}

export default TeamManagement;