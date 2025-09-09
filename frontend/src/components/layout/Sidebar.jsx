import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBarChart2, FiDroplet, FiMap, FiAlertTriangle, FiFileText, FiSettings, FiBriefcase } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation(); // Hook to get the current URL path

  // Add a 'path' property to each nav item
  const navItems = [
    { icon: <FiHome />, name: 'Dashboard Overview', path: '/' },
    { icon: <FiBriefcase />, name: 'Medical Operations', path: '/medical-operations' },
    { icon: <FiDroplet />, name: 'Sanitation Monitoring', path: '/sanitation-monitoring' },
    { icon: <FiMap />, name: 'Water Quality', path: '/water-quality' },
    { icon: <FiAlertTriangle />, name: 'Emergency Response', path: '/emergency-response' },
    { icon: <FiBarChart2 />, name: 'Analytics', path: '/analytics' },
    { icon: <FiFileText />, name: 'Emergency & Reports', path: '/reports' },
    { icon: <FiSettings />, name: 'System Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col flex-shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-800">Ujjain Mahakumbh</h1>
        <p className="text-sm text-gray-500">Healthcare Management 2025</p>
      </div>
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;