import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import all your pages
import Dashboard from './pages/Dashboard';
import MedicalOperations from './pages/MedicalOperations';
import SanitationMonitoring from './pages/SanitationMonitoring';
import WaterQuality from './pages/WaterQuality';
import EmergencyResponse from './pages/EmergencyResponse';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import { AlertProvider } from './context/AlertContext';
import Login from './pages/Login';

function App() {
  const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <AuthProvider>
      <AlertProvider>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/medical-operations" element={<PrivateRoute><MedicalOperations /></PrivateRoute>} />
            <Route path="/sanitation-monitoring" element={<PrivateRoute><SanitationMonitoring /></PrivateRoute>} />
            <Route path="/water-quality" element={<PrivateRoute><WaterQuality /></PrivateRoute>} />
            <Route path="/emergency-response" element={<PrivateRoute><EmergencyResponse /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          </Routes>
      
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;