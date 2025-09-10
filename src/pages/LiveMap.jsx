import React from 'react';
import Layout from '../components/layout/Layout';
import OutbreakMap from '../components/dashboard/OutbreakMap'; // We are reusing the entire map component

const LiveMap = () => {
  return (
    <Layout>
      {/* This page simply renders our existing OutbreakMap component inside the standard layout */}
      <div className="w-full h-[85vh]"> {/* Set a large height for the map container */}
        <OutbreakMap />
      </div>
    </Layout>
  );
};

export default LiveMap;