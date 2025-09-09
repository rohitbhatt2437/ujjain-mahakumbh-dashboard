import React, { createContext, useState, useContext, useEffect } from 'react';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  // Initialize alerts from localStorage to make them persistent
  const [alerts, setAlerts] = useState(() => {
    const savedAlerts = localStorage.getItem('alerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Function to add a new alert
  const addAlert = (alertDetails) => {
    const newAlert = {
      id: Date.now(), // Unique ID
      ...alertDetails,
      timestamp: new Date().toISOString(),
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  // Function to remove (resolve) an alert
  const resolveAlert = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, resolveAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useAlerts = () => {
  return useContext(AlertContext);
};