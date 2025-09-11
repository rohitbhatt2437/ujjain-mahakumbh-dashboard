import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import all your pages
import Dashboard from './pages/Dashboard';
import MedicalOperations from './pages/MedicalOperations';
import SanitationMonitoring from './pages/SanitationMonitoring';
import WaterQuality from './pages/WaterQuality';
import EmergencyResponse from './pages/EmergencyResponse';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
          <Routes>
            {/* Direct routes without authentication */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/medical-operations" element={<MedicalOperations />} />
            <Route path="/sanitation-monitoring" element={<SanitationMonitoring />} />
            <Route path="/water-quality" element={<WaterQuality />} />
            <Route path="/emergency-response" element={<EmergencyResponse />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
      
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;