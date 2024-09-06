"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer to avoid SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

// Your GeoJSON data and type
import geoData from "./ColombiaDepartments.json";
import { GeoJsonObject } from "geojson";

// Define the type for the GeoJSON data
const geoJsonData: GeoJsonObject = geoData as GeoJsonObject;

const getColor = (rating: number) => {
  return rating > 4
    ? "#800026"
    : rating > 3
    ? "#BD0026"
    : rating > 2
    ? "#E31A1C"
    : rating > 1
    ? "#FC4E2A"
    : "#FFEDA0";
};

const style = (feature: any) => {
  return {
    fillColor: getColor(feature.properties.rating), // Assuming 'rating' exists in the GeoJSON properties
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const ColombiaMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={[4.5709, -74.2973]} // Center of Colombia
      zoom={6}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geoJsonData} style={style} />
    </MapContainer>
  );
};

export default ColombiaMap;
