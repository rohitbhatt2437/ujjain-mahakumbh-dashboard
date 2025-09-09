import { FiHome, FiBarChart2, FiDroplet, FiMap, FiAlertTriangle, FiFileText, FiSettings, FiBriefcase } from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { icon: <FiHome />, name: 'Dashboard Overview', active: true },
    { icon: <FiBriefcase />, name: 'Medical Operations' },
    { icon: <FiDroplet />, name: 'Sanitation Monitoring' },
    { icon: <FiMap />, name: 'Water Quality' },
    { icon: <FiAlertTriangle />, name: 'Emergency Response' },
    { icon: <FiBarChart2 />, name: 'Analytics' },
    { icon: <FiFileText />, name: 'Emergency & Reports' },
    { icon: <FiSettings />, name: 'System Settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col flex-shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-800">Ujjain Mahakumbh</h1>
        <p className="text-sm text-gray-500">Healthcare Management 2025</p>
      </div>
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href="#" className={`flex items-center p-3 my-1 rounded-lg transition-colors ${item.active ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;