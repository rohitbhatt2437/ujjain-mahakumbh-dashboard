import React, { createContext, useState, useContext, useEffect } from 'react';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  // State for active alerts
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('alerts');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
}, [alerts]);

  // State for resolved alerts
  const [resolvedAlerts, setResolvedAlerts] = useState(() => {
    const saved = localStorage.getItem('resolvedAlerts');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('resolvedAlerts', JSON.stringify(resolvedAlerts));
  }, [resolvedAlerts]);

  const addAlert = (alertDetails) => {
    const newAlert = { id: Date.now(), ...alertDetails, timestamp: new Date().toISOString() };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const resolveAlert = (alertId) => {
    const alertToResolve = alerts.find(alert => alert.id === alertId);
    if (alertToResolve) {
      const resolved = { ...alertToResolve, resolvedAt: new Date().toISOString() };
      setResolvedAlerts(prev => [resolved, ...prev]);
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    }
  };

  return (
    // 👇 The closing tag is now corrected
    <AlertContext.Provider value={{ alerts, resolvedAlerts, addAlert, resolveAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  return useContext(AlertContext);
};