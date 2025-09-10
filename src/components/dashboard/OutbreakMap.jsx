import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSearchParams } from 'react-router-dom';
import DashboardCard from "../ui/DashboardCard";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';
import { FaTrash, FaRestroom, FaStore, FaPlusSquare } from 'react-icons/fa';
import { IoWater } from "react-icons/io5";
import { FiGrid } from 'react-icons/fi';

// HELPER COMPONENT #1: This handles focusing the map from a URL
const MapFocusController = ({ dustbins, toilets }) => {
    const map = useMap();
    const [searchParams] = useSearchParams();
  
    useEffect(() => {
      const highlightType = searchParams.get('highlight');
      const highlightId = searchParams.get('id');
  
      if (highlightType && highlightId) {
        const allItems = [
            ...(dustbins || []), 
            ...(toilets || [])
        ];
        const itemToFocus = allItems.find(item => item && item.id.toString() === highlightId);
  
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

// HELPER COMPONENT #2: This handles all map clicks
const MapClickHandler = ({ onRouteSelect, onDustbinAdd, onToiletAdd, onFoodStallAdd, onMedicalCampAdd, onWaterPointAdd }) => {
  useMapEvents({
    click(e) {
      onRouteSelect(e.latlng);
      onDustbinAdd(e.latlng);
      onToiletAdd(e.latlng);
      onFoodStallAdd(e.latlng);
      onMedicalCampAdd(e.latlng);
      onWaterPointAdd(e.latlng);
    },
  });
  return null;
};

// Icon fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const OutbreakMap = () => {
    const [mode, setMode] = useState('all'); // Default to showing all items
    
    // State for all placeable items
    const [dustbins, setDustbins] = useState(() => { const saved = localStorage.getItem('dustbins'); return saved ? JSON.parse(saved) : []; });
    useEffect(() => { localStorage.setItem('dustbins', JSON.stringify(dustbins)); }, [dustbins]);
    
    const [toilets, setToilets] = useState(() => { const saved = localStorage.getItem('toilets'); return saved ? JSON.parse(saved) : []; });
    useEffect(() => { localStorage.setItem('toilets', JSON.stringify(toilets)); }, [toilets]);
    
    const [foodStalls, setFoodStalls] = useState(() => { const saved = localStorage.getItem('foodStalls'); return saved ? JSON.parse(saved) : []; });
    useEffect(() => { localStorage.setItem('foodStalls', JSON.stringify(foodStalls)); }, [foodStalls]);

    const [medicalCamps, setMedicalCamps] = useState(() => { const saved = localStorage.getItem('medicalCamps'); return saved ? JSON.parse(saved) : []; });
    useEffect(() => { localStorage.setItem('medicalCamps', JSON.stringify(medicalCamps)); }, [medicalCamps]);

    const [waterPoints, setWaterPoints] = useState(() => { const saved = localStorage.getItem('waterPoints'); return saved ? JSON.parse(saved) : []; });
    useEffect(() => { localStorage.setItem('waterPoints', JSON.stringify(waterPoints)); }, [waterPoints]);
    
    const [filteredItems, setFilteredItems] = useState([]);
    
    // Local banner state for transient notifications
    const [showFullBanner, setShowFullBanner] = useState(false);
    const [fullBannerText, setFullBannerText] = useState('');
    
    // Ujjain, Madhya Pradesh approximate coordinates
    const startPoint = [23.176, 75.788];
    const [destination, setDestination] = useState(null);

    // This effect filters the items to be displayed based on the selected mode
    useEffect(() => {
        const allItems = [
            ...dustbins.map(item => ({ ...item, itemType: 'dustbin' })),
            ...toilets.map(item => ({ ...item, itemType: 'toilet' })),
            ...foodStalls.map(item => ({ ...item, itemType: 'foodStall' })),
            ...medicalCamps.map(item => ({ ...item, itemType: 'medicalCamp' })),
            ...waterPoints.map(item => ({ ...item, itemType: 'waterPoint' })),
        ];

        if (mode === 'all' || mode === 'routing') {
            setFilteredItems(allItems);
        } else {
            setFilteredItems(allItems.filter(item => item.itemType === mode));
        }
    }, [mode, dustbins, toilets, foodStalls, medicalCamps, waterPoints]);


    // --- Icon Creation Functions ---
    const createIcon = (iconComponent, color = '#3B82F6') => {
      return L.divIcon({
        html: ReactDOMServer.renderToString(React.cloneElement(iconComponent, { style: { color, fontSize: '24px' } })),
        className: 'bg-transparent border-0', iconSize: [24, 24], iconAnchor: [12, 24],
      });
    };
    const createStatusIcon = (iconComponent, status) => {
      const isFullOrDirty = status === 'Full' || status === 'Needs Cleaning';
      const iconColor = isFullOrDirty ? '#DC2626' : '#16A34A';
      return createIcon(iconComponent, iconColor);
    };
    
    // --- Handlers for all actions ---
    const handleSetDestination = (latlng) => { if (mode === 'routing') setDestination([latlng.lat, latlng.lng]); };
    
    // Helper to show a 3-second banner when a dustbin becomes full
    const showDustbinFullBanner = () => {
      setFullBannerText('Dustbin in Ujjain is full');
      setShowFullBanner(true);
      setTimeout(() => setShowFullBanner(false), 3000);
    };

    const handleAddDustbin = (latlng) => {
      if (mode === 'dustbin') {
        const newItem = {
          id: Date.now(),
          name: `Dustbin ${dustbins.length + 1}`,
          lat: latlng.lat,
          lng: latlng.lng,
          status: 'Clean',
        };
        // Add the new dustbin immediately
        setDustbins((prev) => [...prev, newItem]);
      }
    };
    const handleToggleDustbinStatus = (id) => {
      setDustbins(prev => prev.map(d => {
        if (d.id !== id) return d;
        const nextStatus = d.status === 'Clean' ? 'Full' : 'Clean';
        // Trigger banner only when switching to Full
        if (nextStatus === 'Full') {
          showDustbinFullBanner();
        }
        return { ...d, status: nextStatus };
      }));
    };
    const handleDeleteDustbin = (id) => {
      setDustbins(prev => prev.filter(d => d.id !== id));
      setFullBannerText('Dustbin deleted');
      setShowFullBanner(true);
      setTimeout(() => setShowFullBanner(false), 2000);
    };
    
    const handleAddToilet = (latlng) => { if (mode === 'toilet') { const newItem = { id: Date.now(), name: `Toilet ${toilets.length + 1}`, lat: latlng.lat, lng: latlng.lng, status: 'Clean' }; setToilets(prev => [...prev, newItem]); } };
    const handleToggleToiletStatus = (id) => setToilets(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Clean' ? 'Needs Cleaning' : 'Clean' } : t));
    const handleDeleteToilet = (id) => setToilets(prev => prev.filter(t => t.id !== id));
    
    const handleAddFoodStall = (latlng) => { if (mode === 'foodStall') { const newItem = { id: Date.now(), name: `Food Stall ${foodStalls.length + 1}`, lat: latlng.lat, lng: latlng.lng }; setFoodStalls(prev => [...prev, newItem]); } };
    const handleDeleteFoodStall = (id) => setFoodStalls(prev => prev.filter(item => item.id !== id));
    
    const handleAddMedicalCamp = (latlng) => { if (mode === 'medicalCamp') { const newItem = { id: Date.now(), name: `Medical Camp ${medicalCamps.length + 1}`, lat: latlng.lat, lng: latlng.lng }; setMedicalCamps(prev => [...prev, newItem]); } };
    const handleDeleteMedicalCamp = (id) => setMedicalCamps(prev => prev.filter(item => item.id !== id));

    const handleAddWaterPoint = (latlng) => { if (mode === 'waterPoint') { const newItem = { id: Date.now(), name: `Water Point ${waterPoints.length + 1}`, lat: latlng.lat, lng: latlng.lng }; setWaterPoints(prev => [...prev, newItem]); } };
    const handleDeleteWaterPoint = (id) => setWaterPoints(prev => prev.filter(item => item.id !== id));

    return (
        <DashboardCard title="Outbreak Zone & Operations" className="h-full">
            <div className="flex flex-wrap justify-center gap-2 mb-2 p-1 bg-gray-200 rounded-lg">
                <button onClick={() => setMode('all')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${mode === 'all' || mode === 'routing' ? 'bg-gray-600 text-white' : 'text-gray-700'}`}><FiGrid className="inline-block mr-1"/>Show All</button>
                <button onClick={() => setMode('dustbin')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${mode === 'dustbin' ? 'bg-green-500 text-white' : 'text-gray-700'}`}>Dustbins</button>
                <button onClick={() => setMode('toilet')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${mode === 'toilet' ? 'bg-yellow-500 text-white' : 'text-gray-700'}`}>Toilets</button>
                <button onClick={() => setMode('foodStall')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${mode === 'foodStall' ? 'bg-purple-500 text-white' : 'text-gray-700'}`}>Food Stalls</button>
                <button onClick={() => setMode('medicalCamp')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${mode === 'medicalCamp' ? 'bg-red-500 text-white' : 'text-gray-700'}`}>Medical Camps</button>
                <button onClick={() => setMode('waterPoint')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${mode === 'waterPoint' ? 'bg-sky-500 text-white' : 'text-gray-700'}`}>Water Points</button>
            </div>
            {showFullBanner && (
              <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm font-semibold">
                {fullBannerText}
              </div>
            )}
            
            <div className="h-full w-full rounded-md overflow-hidden min-h-[400px]">
                <MapContainer center={startPoint} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    
                    <MapFocusController dustbins={dustbins} toilets={toilets} />
                    <MapClickHandler onRouteSelect={handleSetDestination} onDustbinAdd={handleAddDustbin} onToiletAdd={handleAddToilet} onFoodStallAdd={handleAddFoodStall} onMedicalCampAdd={handleAddMedicalCamp} onWaterPointAdd={handleAddWaterPoint} />
                    
                    {/* Render from the single filteredItems array */}
                    {filteredItems.map((item) => {
                        switch (item.itemType) {
                            case 'dustbin':
                                return <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createStatusIcon(<FaTrash />, item.status)}>
                                    <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><p>Status: <span className={`font-semibold ${item.status === 'Full' ? 'text-red-600' : 'text-green-600'}`}>{` ${item.status}`}</span></p><button onClick={(e) => { e.stopPropagation(); handleToggleDustbinStatus(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-blue-500 hover:bg-blue-600">Mark as {item.status === 'Clean' ? 'Full' : 'Clean'}</button><button onClick={(e) => { e.stopPropagation(); handleDeleteDustbin(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                                </Marker>;
                            case 'toilet':
                                return <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createStatusIcon(<FaRestroom />, item.status)}>
                                    <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><p>Status: <span className={`font-semibold ${item.status === 'Needs Cleaning' ? 'text-red-600' : 'text-green-600'}`}>{` ${item.status}`}</span></p><button onClick={(e) => { e.stopPropagation(); handleToggleToiletStatus(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-blue-500 hover:bg-blue-600">Mark as {item.status === 'Clean' ? 'Needs Cleaning' : 'Clean'}</button><button onClick={(e) => { e.stopPropagation(); handleDeleteToilet(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                                </Marker>;
                            case 'foodStall':
                                return <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createIcon(<FaStore />, '#8B5CF6')}>
                                    <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><button onClick={(e) => { e.stopPropagation(); handleDeleteFoodStall(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                                </Marker>;
                            case 'medicalCamp':
                                return <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createIcon(<FaPlusSquare />, '#EF4444')}>
                                    <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><button onClick={(e) => { e.stopPropagation(); handleDeleteMedicalCamp(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                                </Marker>;
                            case 'waterPoint':
                                return <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} icon={createIcon(<IoWater />, '#0EA5E9')}>
                                    <Popup><div className="space-y-2 font-sans text-sm"><p className="font-bold text-base">{item.name}</p><button onClick={(e) => { e.stopPropagation(); handleDeleteWaterPoint(item.id); }} className="w-full px-3 py-1 text-white text-xs font-semibold rounded bg-red-500 hover:bg-red-600">Delete</button></div></Popup>
                                </Marker>;
                            default:
                                return null;
                        }
                    })}
                    
                    {/* Existing map features */}
                    <Circle center={startPoint} pathOptions={{ color: 'red', fillColor: 'red' }} radius={500} fillOpacity={0.2} />
                    <Marker position={startPoint}><Popup>Outbreak Epicenter (Start)</Popup></Marker>
                    {destination && mode === 'routing' && <RoutingMachine start={startPoint} end={destination} />}
                    {destination && mode === 'routing' && <Marker position={destination}><Popup>Selected Destination</Popup></Marker>}
                </MapContainer>
            </div>
             <p className="text-xs text-center text-gray-500 mt-2">
                Select a mode from the top to add items or filter the map.
            </p>
        </DashboardCard>
    );
}

export default OutbreakMap;