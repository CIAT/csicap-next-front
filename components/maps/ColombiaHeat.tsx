"use client";

import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "./ColombiaDepartments.json";

const getColor = (rating) => {
  return rating > 4 ? '#800026' :
         rating > 3 ? '#BD0026' :
         rating > 2 ? '#E31A1C' :
         rating > 1 ? '#FC4E2A' :
                      '#FFEDA0';
}

const style = (feature) => {
  return {
      fillColor: getColor(feature.properties.rating), // Assuming 'rating' is a property
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

const ColombiaMap = () => {
  return (
      <MapContainer center={[4.5709, -74.2973]} zoom={6} style={{ height: "600px", width: "100%" }}>
          <GeoJSON data={geoData} style={style} />
      </MapContainer>
  );
}

export default ColombiaMap;
