import DashboardCard from '../ui/DashboardCard';

const SanitationOps = () => {
  return (
    <DashboardCard title="Sanitation Operations & Coordination">
        <div className="flex items-center justify-around h-full">
            <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-700">
                    75
                </div>
                <p className="text-sm font-semibold mt-2">Outbreak Fide Dashboard</p>
            </div>
            <div className="w-2/3 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart Area</p>
            </div>
        </div>
    </DashboardCard>
  )
}
export default SanitationOps