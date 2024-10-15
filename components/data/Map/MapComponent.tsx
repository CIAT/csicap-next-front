import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import style from "./map.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapController from "@/helpers/Component/Controller/MapController";
import { MapComponentProps } from "@/interfaces";
import {colors} from "@/interfaces/Map/colors";

mapboxgl.accessToken = "pk.eyJ1IjoiZXNwZXJhbnphb3JvemNvIiwiYSI6ImNsYm5ya3ZzNzA3aG4zb3FzY3Z0NTVuMm0ifQ.zzzCxKwH2AuC9jI-EsAdng";

const MapComponent: React.FC<MapComponentProps> = ({ polygons, filterData, data, useQuintile = false}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [quintileSteps, setQuintileSteps] = useState<number[]>([]);

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

        // disable map rotation using right click + drag
        map.dragRotate.disable();
        // disable map rotation using touch rotation gesture
        map.touchZoomRotate.disableRotation();

        map.on("load", () => {
          MapController.highlightPolygons(map, polygons, data, useQuintile, filterData);
        });

        mapRef.current = map;
        setMapInitialized(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mapInitialized, polygons, data]);

  useEffect(() => {
    if(!mapInitialized) {
      return;
    }

    if(!mapRef.current) {
      return;
    }

    MapController.highlightPolygons(mapRef.current, polygons, data, useQuintile, filterData);

    if (useQuintile) {
      const quintiles = MapController.calculateQuintiles(data, "Asistentes");
      setQuintileSteps(quintiles);
      MapController.changeFillColor(mapRef.current, quintiles);
      console.log(quintiles, data)
    }
  }, [polygons, data]);

  return (
      <>
        <div ref={mapContainerRef} id="map" className={style["mapContainer"]}></div>
        {useQuintile && (
            <div className={style["legend"]}>
              <h4>Quintiles de Asistentes</h4>
              {quintileSteps.map((step, index) => (
                  <div key={index} className={style["legendItem"]}>
                    <span className={style["legendColor"]} style={{ backgroundColor: colors[index] }}></span>
                    <span>{`De ${step} a ${quintileSteps[index + 1] || "más"}`}</span>
                  </div>
              ))}
            </div>
        )}
      </>
  );
};

export default MapComponent;
