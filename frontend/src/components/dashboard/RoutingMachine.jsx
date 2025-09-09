import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet-routing-machine";

const RoutingMachine = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // If a routing control already exists, remove it before adding a new one
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    // Create waypoints
    const waypoints = [
      L.latLng(start[0], start[1]),
      L.latLng(end[0], end[1])
    ];

    // Create the routing control
    const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: true,
      // Customizes the line color and weight
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      // Hides the default text-based turn-by-turn instructions
      show: true, // Make the panel visible
      collapsible: true, // MAKE THE PANEL COLLAPSIBLE
      // Prevents the map from zooming to fit the route automatically
      fitSelectedRoutes: true,
      // Prevents markers from being added for each waypoint
      addWaypoints: true,
      draggableWaypoints: true,
    }).addTo(map);

    // Store the control instance in the ref
    routingControlRef.current = routingControl;

    // Cleanup function to remove the control when the component unmounts
    return () => map.removeControl(routingControl);
  }, [map, start, end]); // Re-run this effect if the map, start, or end points change

  return null; // This component does not render any visible JSX
};

export default RoutingMachine;