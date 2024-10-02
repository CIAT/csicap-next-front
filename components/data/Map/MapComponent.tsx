import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import style from "./map.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapController from "@/helpers/Component/Controller/MapController";
import { MapComponentProps } from "@/interfaces";

mapboxgl.accessToken = "pk.eyJ1IjoiZXNwZXJhbnphb3JvemNvIiwiYSI6ImNsYm5ya3ZzNzA3aG4zb3FzY3Z0NTVuMm0ifQ.zzzCxKwH2AuC9jI-EsAdng";

const MapComponent: React.FC<MapComponentProps> = ({ polygons, filterData, data}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (mapInitialized) return;

    const interval = setInterval(() => {
      if (mapContainerRef.current) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-74.297333, 4.570868],
          zoom: 5
        });

        map.on("load", () => {
          MapController.highlightPolygons(map, polygons, filterData, data);
        });

        mapRef.current = map;
        setMapInitialized(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mapInitialized, polygons, data]);

  useEffect(() => {
    if (mapInitialized && mapRef.current) {
      MapController.highlightPolygons(mapRef.current, polygons, filterData, data);
    }
  }, [polygons, data]);

  return <div ref={mapContainerRef} id="map" className={style["mapContainer"]} />;
};

export default MapComponent;
