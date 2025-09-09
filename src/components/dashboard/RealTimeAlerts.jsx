import DashboardCard from "../ui/DashboardCard";

const RealTimeAlerts = () => {
    return (
        <DashboardCard title="Real-Time Alerts">
            <div className="space-y-2">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-3 rounded-r-md">
                    <p className="font-bold text-sm">Critical Health Alert</p>
                    <p className="text-xs">Suspected Cholera Outbreak near Sector 5</p>
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded-r-md">
                    <p className="font-bold text-sm">Water Quality Warning</p>
                    <p className="text-xs">Bires High Turbidity in Sanyogk S</p>
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded-r-md">
                    <p className="font-bold text-sm">Water Quality Warning</p>
                    <p className="text-xs">in Sanyog Ghat Sample</p>
                </div>
            </div>
        </DashboardCard>
    )
}

export default RealTimeAlerts;