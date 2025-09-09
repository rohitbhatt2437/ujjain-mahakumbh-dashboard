import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSearchParams } from 'react-router-dom';
import DashboardCard from "../ui/DashboardCard";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';
import { FaTrash, FaRestroom } from 'react-icons/fa';

// HELPER COMPONENT #1: This handles focusing the map from a URL
const MapFocusController = ({ dustbins, toilets }) => {
    const map = useMap();
    const [searchParams] = useSearchParams();
  
    useEffect(() => {
      const highlightType = searchParams.get('highlight');
      const highlightId = searchParams.get('id');
  
      if (highlightType && highlightId) {
        let itemToFocus;
        if (highlightType === 'dustbin') {
          itemToFocus = dustbins.find(d => d.id.toString() === highlightId);
        } else if (highlightType === 'toilet') {
          itemToFocus = toilets.find(t => t.id.toString() === highlightId);
        }
  
        if (itemToFocus) {
          map.flyTo([itemToFocus.lat, itemToFocus.lng], 17, {
            animate: true,
            duration: 1.5
          });
        }
      }
    }, [searchParams, map, dustbins, toilets]);
  
    return null;
};

// HELPER COMPONENT #2: The missing click handler
const MapClickHandler = ({ onRouteSelect, onDustbinAdd, onToiletAdd }) => {
  useMapEvents({
    click(e) {
      onRouteSelect(e.latlng);
      onDustbinAdd(e.latlng);
      onToiletAdd(e.latlng);
    },
  });
  return null;
};

// Icon fix (remains the same)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const OutbreakMap = () => {
    const [mode, setMode] = useState('routing');
    
    // State for Dustbins
    const [dustbins, setDustbins] = useState(() => {
        const saved = localStorage.getItem('dustbins');
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem('dustbins', JSON.stringify(dustbins));
    }, [dustbins]);

    // State for Toilets
    const [toilets, setToilets] = useState(() => {
        const saved = localStorage.getItem('toilets');
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem('toilets', JSON.stringify(toilets));
    }, [toilets]);

    const startPoint = [23.185, 75.79];
    const [destination, setDestination] = useState(null);

    // Icon Creation Function
    const createIcon = (iconComponent, status) => {
      const isFullOrDirty = status === 'Full' || status === 'Needs Cleaning';
      const iconColor = isFullOrDirty ? '#DC2626' : '#16A34A';
      return L.divIcon({
        html: ReactDOMServer.renderToString(React.cloneElement(iconComponent, { style: { color: iconColor, fontSize: '24px' } })),
        className: 'bg-transparent border-0',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });
    };
    
    // Handlers for Dustbins
    const handleAddDustbin = (latlng) => {
      if (mode === 'dustbin') {
        const newItem = { id: Date.now(), name: `Dustbin ${dustbins.length + 1}`, lat: latlng.lat, lng: latlng.lng, status: 'Clean' };
        setDustbins(prev => [...prev, newItem]);
      }
    };
    const handleToggleDustbinStatus = (id) => setDustbins(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Clean' ? 'Full' : 'Clean' } : d));
    const handleDeleteDustbin = (id) => setDustbins(prev => prev.filter(d => d.id !== id));
    
    // Handlers for Toilets
    const handleAddToilet = (latlng) => {
        if (mode === 'toilet') {
            const newItem = { id: Date.now(), name: `Toilet ${toilets.length + 1}`, lat: latlng.lat, lng: latlng.lng, status: 'Clean' };
            setToilets(prev => [...prev, newItem]);
        }
    };
    const handleToggleToiletStatus = (id) => setToilets(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Clean' ? 'Needs Cleaning' : 'Clean' } : t));
    const handleDeleteToilet = (id) => setToilets(prev => prev.filter(t => t.id !== id));
    
    const handleSetDestination = (latlng) => {
      if (mode === 'routing') setDestination([latlng.lat, latlng.lng]);
    };

    return (
        <DashboardCard title="Outbreak Zone & Operations" className="h-full">
            <div className="flex justify-center space-x-2 mb-2 p-1 bg-gray-200 rounded-lg">
                <button onClick={() => setMode('routing')} className={`px-4 py-1 text-sm font-semibold rounded-md transition ${mode === 'routing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Routing</button>
                <button onClick={() => setMode('dustbin')} className={`px-4 py-1 text-sm font-semibold rounded-md transition ${mode === 'dustbin' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Dustbins</button>
                <button onClick={() => setMode('toilet')} className={`px-4 py-1 text-sm font-semibold rounded-md transition ${mode === 'toilet' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Toilets</button>
            </div>
            
            <div className="h-full w-full rounded-md overflow-hidden min-h-[400px]">
                <MapContainer center={startPoint} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    
                    <MapFocusController dustbins={dustbins} toilets={toilets} />
                    <MapClickHandler onRouteSelect={handleSetDestination} onDustbinAdd={handleAddDustbin} onToiletAdd={handleAddToilet} />
                    
                    {/* Render all dustbins */}
                    {dustbins.map((item) => (
                        <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createIcon(<FaTrash />, item.status)}>
                          <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><p>Status: <span className={`font-semibold ${item.status === 'Full' ? 'text-red-600' : 'text-green-600'}`}>{` ${item.status}`}</span></p><button onClick={(e) => { e.stopPropagation(); handleToggleDustbinStatus(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-blue-500 hover:bg-blue-600">Mark as {item.status === 'Clean' ? 'Full' : 'Clean'}</button><button onClick={(e) => { e.stopPropagation(); handleDeleteDustbin(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                        </Marker>
                    ))}

                    {/* Render all toilets */}
                    {toilets.map((item) => (
                        <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createIcon(<FaRestroom />, item.status)}>
                            <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><p>Status: <span className={`font-semibold ${item.status === 'Needs Cleaning' ? 'text-red-600' : 'text-green-600'}`}>{` ${item.status}`}</span></p><button onClick={(e) => { e.stopPropagation(); handleToggleToiletStatus(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-blue-500 hover:bg-blue-600">Mark as {item.status === 'Clean' ? 'Needs Cleaning' : 'Clean'}</button><button onClick={(e) => { e.stopPropagation(); handleDeleteToilet(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                        </Marker>
                    ))}

                    {/* Existing map features */}
                    <Circle center={startPoint} pathOptions={{ color: 'red', fillColor: 'red' }} radius={500} fillOpacity={0.2} />
                    <Marker position={startPoint}><Popup>Outbreak Epicenter (Start)</Popup></Marker>
                    {destination && mode === 'routing' && <RoutingMachine start={startPoint} end={destination} />}
                    {destination && mode === 'routing' && <Marker position={destination}><Popup>Selected Destination</Popup></Marker>}
                </MapContainer>
            </div>
             <p className="text-xs text-center text-gray-500 mt-2">
                {mode === 'routing' && 'In Routing Mode: Click map to set a destination.'}
                {mode === 'dustbin' && 'In Dustbin Mode: Click map to add a dustbin, or click an icon to manage it.'}
                {mode === 'toilet' && 'In Toilet Mode: Click map to add a toilet, or click an icon to manage it.'}
            </p>
        </DashboardCard>
    );
}

export default OutbreakMap;