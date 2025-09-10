import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ViewProvider } from './context/ViewContext';

// Import all your pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MedicalOperations from './pages/MedicalOperations';
import SanitationMonitoring from './pages/SanitationMonitoring';
import WaterQuality from './pages/WaterQuality';
import EmergencyResponse from './pages/EmergencyResponse';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import LiveMap from './pages/LiveMap'; 
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
      <ViewProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Wrap all main pages in the ProtectedRoute */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/medical-operations" element={<ProtectedRoute><MedicalOperations /></ProtectedRoute>} />

            <Route path="/live-map" element={<ProtectedRoute><LiveMap /></ProtectedRoute>} />

            <Route path="/sanitation-monitoring" element={<ProtectedRoute><SanitationMonitoring /></ProtectedRoute>} />
            <Route path="/water-quality" element={<ProtectedRoute><WaterQuality /></ProtectedRoute>} />
            <Route path="/emergency-response" element={<ProtectedRoute><EmergencyResponse /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </ViewProvider>
      
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;