import DashboardCard from '../ui/DashboardCard';

const EmergencyConsole = () => {
  return (
    <DashboardCard title="Emergency Response Console">
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Triage Capacity:</span> 85%</p>
        <p><span className="font-semibold">Ambulance Status:</span> 12/15 Available</p>
        <p><span className="font-semibold">ER Bed Occupancy:</span> 70%</p>
        <p><span className="font-semibold">Ventilators:</span> 3 Available</p>
      </div>
      <button className="mt-4 w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700">
        Connect to Emergency Services
      </button>
    </DashboardCard>
  )
}

export default EmergencyConsole;