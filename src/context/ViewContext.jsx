import React, { createContext, useState, useContext } from 'react';

const ViewContext = createContext(null);

export const ViewProvider = ({ children }) => {
  const [isUserView, setIsUserView] = useState(false);

  const toggleView = () => {
    setIsUserView(prev => !prev);
  };

  return (
    <ViewContext.Provider value={{ isUserView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  return useContext(ViewContext);
};