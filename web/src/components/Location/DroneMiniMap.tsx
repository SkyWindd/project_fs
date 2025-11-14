"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ----- Lucide SVG to Leaflet icon -----
const droneSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
     viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 5V19M5 12H19M7 7L5.5 5.5M18.5 5.5L17 7M7 17L5.5 18.5M18.5 18.5L17 17"/>
</svg>`;

const droneIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(droneSvg),
  iconSize: [40, 40],
  iconAnchor: [20, 30],
});

const userSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
     viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 21s8-4.5 8-10A8 8 0 0 0 4 11c0 5.5 8 10 8 10z"/>
  <circle cx="12" cy="11" r="3"/>
</svg>`;

const userIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(userSvg),
  iconSize: [40, 40],
  iconAnchor: [20, 35],
});

// Auto-fit
function AutoFit({ dronePos, userPos }: any) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([
      [dronePos.lat, dronePos.lon],
      [userPos.lat, userPos.lon],
    ]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [dronePos, userPos]);

  return null;
}

export default function DroneMiniMap({ dronePos, userPos }: any) {
  return (
    <div className="h-[200px] w-full rounded-xl overflow-hidden border shadow-md mt-2">
      <MapContainer
        center={[dronePos.lat, dronePos.lon]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[dronePos.lat, dronePos.lon]} icon={droneIcon} />
        <Marker position={[userPos.lat, userPos.lon]} icon={userIcon} />

        <Polyline
          positions={[
            [dronePos.lat, dronePos.lon],
            [userPos.lat, userPos.lon],
          ]}
          color="red"
          weight={3}
          opacity={0.8}
        />

        <AutoFit dronePos={dronePos} userPos={userPos} />
      </MapContainer>
    </div>
  );
}
