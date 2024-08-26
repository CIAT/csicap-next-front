// ColombiaMap.js
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const colombiaGeoJson = {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [-79.0, 12.5], [-75.5, 12.5], [-74.0, 11.5],
        [-71.0, 12.0], [-66.0, 12.0], [-70.0, 5.0],
        [-67.0, 1.0], [-74.0, 1.5], [-79.0, 4.0],
        [-79.0, 12.5]
      ]
    ]
  },
  "properties": {
    "name": "Colombia"
  }
};

const ColombiaMap = () => {
  return (
    <MapContainer center={[4.5709, -74.2973]} zoom={6} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={colombiaGeoJson}
        style={{
          color: "#ff7800",
          weight: 2,
          opacity: 0.65,
        }}
      />
    </MapContainer>
  );
};

export default ColombiaMap;
