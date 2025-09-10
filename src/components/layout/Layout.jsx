import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useView } from '../../context/ViewContext';
import { FiGrid } from 'react-icons/fi';

const Layout = ({ children }) => {
  const { isUserView, toggleView } = useView();

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Conditionally render the Sidebar only if not in User View */}
      {!isUserView && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Conditionally render the Header only if not in User View */}
        {!isUserView && <Header />}
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>

        {/* --- Back to Admin View Button --- */}
        {/* This button only appears when in User View */}
        {isUserView && (
          <Link
            to="/" // Navigates back to the main dashboard
            onClick={toggleView}
            className="absolute bottom-5 right-5 z-[1000] flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            <FiGrid className="mr-2" />
            Back to Admin View
          </Link>
        )}
      </div>
    </div>
  );
};

export default Layout;