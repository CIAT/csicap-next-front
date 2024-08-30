// MapComponent.js
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Add your Mapbox access token here
mapboxgl.accessToken = "pk.eyJ1IjoiZXNwZXJhbnphb3JvemNvIiwiYSI6ImNsYm5ya3ZzNzA3aG4zb3FzY3Z0NTVuMm0ifQ.zzzCxKwH2AuC9jI-EsAdng";

const MapComponent = () => {
    const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current!,
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [-74.5, 40], // Initial center [lng, lat]
      zoom: 9, // Initial zoom
    });

    // Add polygon data
    map.on("load", () => {
      map.addSource("polygon-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-74.5, 40],
                    [-75, 41],
                    [-73.5, 41],
                    [-74.5, 40],
                  ],
                ],
              },
              properties: {},
            },
          ],
        },
      });

      map.addLayer({
        id: "polygon-layer",
        type: "fill",
        source: "polygon-source",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8,
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapDiv} style={{ width: "100%", height: "500px"}} />;
};

export default MapComponent;