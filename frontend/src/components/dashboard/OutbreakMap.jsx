import React, { useState } from 'react';
import DashboardCard from "../ui/DashboardCard";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';

// Icon fix (remains the same)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// LocationFinder helper component (remains the same)
const LocationFinder = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const OutbreakMap = () => {
    const startPoint = [23.185, 75.79];

    // 1. Initialize destination as null instead of with default coordinates
    const [destination, setDestination] = useState(null);

    const handleLocationSelect = (latlng) => {
      setDestination([latlng.lat, latlng.lng]);
    };

    return (
        <DashboardCard title="Outbreak Zone & Routing" className="h-full">
            <div className="h-full w-full rounded-md overflow-hidden min-h-[400px]">
                <MapContainer center={startPoint} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    <LocationFinder onLocationSelect={handleLocationSelect} />
                    
                    <Circle
                      center={startPoint}
                      pathOptions={{ color: 'red', fillColor: 'red' }}
                      radius={500}
                      fillOpacity={0.2}
                    />
                    
                    <Marker position={startPoint}>
                        <Popup>Outbreak Epicenter (Start)</Popup>
                    </Marker>
                    
                    {/* 2. Conditionally render the route only if 'destination' is not null */}
                    {destination && <RoutingMachine start={startPoint} end={destination} />}

                    {/* 3. Conditionally render the destination marker only if 'destination' is not null */}
                    {destination && (
                      <Marker position={destination}>
                          <Popup>Selected Destination</Popup>
                      </Marker>
                    )}
                </MapContainer>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">Click anywhere on the map to set a destination and see the route.</p>
        </DashboardCard>
    );
}

export default OutbreakMap;