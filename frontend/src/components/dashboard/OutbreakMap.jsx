import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import DashboardCard from "../ui/DashboardCard";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';
import { FaTrash } from 'react-icons/fa';

// Icon fix (remains the same)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// MapClickHandler helper component (remains the same)
const MapClickHandler = ({ onRouteSelect, onDustbinAdd }) => {
  useMapEvents({
    click(e) {
      onRouteSelect(e.latlng);
      onDustbinAdd(e.latlng);
    },
  });
  return null;
};

const OutbreakMap = () => {
    const [mode, setMode] = useState('routing');
    
    const [dustbins, setDustbins] = useState(() => {
        const savedDustbins = localStorage.getItem('dustbins');
        return savedDustbins ? JSON.parse(savedDustbins) : [];
    });

    const startPoint = [23.185, 75.79];
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        localStorage.setItem('dustbins', JSON.stringify(dustbins));
    }, [dustbins]);

    const dustbinIcon = L.divIcon({
      html: ReactDOMServer.renderToString(<FaTrash style={{ color: 'green', fontSize: '24px' }} />),
      className: 'bg-transparent border-0',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    const handleAddDustbin = (latlng) => {
      if (mode === 'dustbin') {
        const newDustbin = { lat: latlng.lat, lng: latlng.lng };
        setDustbins(prevDustbins => [...prevDustbins, newDustbin]);
      }
    };

    const handleDeleteDustbin = (indexToDelete) => {
      setDustbins(prevDustbins => prevDustbins.filter((_, index) => index !== indexToDelete));
    };

    const handleSetDestination = (latlng) => {
      if (mode === 'routing') {
        setDestination([latlng.lat, latlng.lng]);
      }
    };

    return (
        <DashboardCard title="Outbreak Zone & Operations" className="h-full">
            <div className="flex justify-center space-x-2 mb-2 p-1 bg-gray-200 rounded-lg">
                <button 
                    onClick={() => setMode('routing')}
                    className={`px-4 py-1 text-sm font-semibold rounded-md transition ${mode === 'routing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Routing Mode
                </button>
                <button 
                    onClick={() => setMode('dustbin')}
                    className={`px-4 py-1 text-sm font-semibold rounded-md transition ${mode === 'dustbin' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Dustbin Mode
                </button>
            </div>
            
            <div className="h-full w-full rounded-md overflow-hidden min-h-[400px]">
                <MapContainer center={startPoint} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    <MapClickHandler onRouteSelect={handleSetDestination} onDustbinAdd={handleAddDustbin} />
                    
                    {dustbins.map((position, index) => (
                        <Marker 
                            key={index} 
                            position={position} 
                            icon={dustbinIcon}
                            eventHandlers={{
                                click: (e) => {
                                    // THE FIX IS HERE 👇
                                    if (mode === 'dustbin') {
                                        L.DomEvent.stopPropagation(e); // Prevent map click event from firing
                                        handleDeleteDustbin(index);
                                    }
                                },
                            }}
                        />
                    ))}

                    <Circle center={startPoint} pathOptions={{ color: 'red', fillColor: 'red' }} radius={500} fillOpacity={0.2} />
                    <Marker position={startPoint}><Popup>Outbreak Epicenter (Start)</Popup></Marker>
                    
                    {destination && mode === 'routing' && <RoutingMachine start={startPoint} end={destination} />}
                    {destination && mode === 'routing' && <Marker position={destination}><Popup>Selected Destination</Popup></Marker>}
                </MapContainer>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
                {mode === 'routing' 
                    ? 'In Routing Mode: Click the map to set a destination.'
                    : 'In Dustbin Mode: Click the map to add a dustbin, or click an icon to remove it.'
                }
            </p>
        </DashboardCard>
    );
}

export default OutbreakMap;