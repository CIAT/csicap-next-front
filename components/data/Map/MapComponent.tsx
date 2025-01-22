import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import style from "./map.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapController from "@/helpers/Component/Controller/MapController";
import { MapComponentProps } from "@/interfaces";
import { colors } from "@/interfaces/Map/colors";

const MapComponent: React.FC<MapComponentProps> = ({ id, polygons, filterData, data, useQuintile = false, quintileType = "" }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [quintileSteps, setQuintileSteps] = useState<number[]>([]);

  useEffect(() => {
    if (mapLoaded) return;

    const interval = setInterval(() => {
      if (mapContainerRef.current) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
          style: "mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91",
          center: [-74.297333, 4.570868],
          zoom: 5,
        });

        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();

        map.on("load", () => {
          setMapLoaded(true);
          MapController.highlightPolygons(map, polygons, data, useQuintile, quintileType, filterData);
        });

        mapRef.current = map;
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mapLoaded, polygons, data]);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      MapController.cleanMap(mapRef.current);
      MapController.highlightPolygons(mapRef.current, polygons, data, useQuintile, quintileType, filterData);

      if (useQuintile) {
        const quintiles = MapController.calculateQuartile(data, quintileType);
        setQuintileSteps(quintiles);
        MapController.changeFillColor(mapRef.current, quintiles);
      }

      mapRef.current.on("idle", () => {
        if (!mapRef.current) return;

        const content = mapRef.current.getCanvas().toDataURL();
        MapController.setMapReference(content);
      });
    }
  }, [mapLoaded, polygons, data]);

  return (
      <>
        <div id={id || "map"} ref={mapContainerRef} className={style["mapContainer"]}></div>
        {useQuintile && (
            <div className={style["legend"]}>
              {quintileType === "Profesionales" ? (<h4>{quintileType} por departamento</h4>) : (
                  <h4>{quintileType} por municipio</h4>)}
              {(quintileType === "Eventos" || quintileType === "Familias registradas") ? (
                  <>
                    <div className={style["legendItem"]}>
                      <span className={style["legendColor"]} style={{ backgroundColor: colors[0] }}></span>
                      <span>1</span>
                    </div>
                    <div className={style["legendItem"]}>
                      <span className={style["legendColor"]} style={{ backgroundColor: colors[1] }}></span>
                      <span>2</span>
                    </div>
                    <div className={style["legendItem"]}>
                      <span className={style["legendColor"]} style={{ backgroundColor: colors[2] }}></span>
                      <span>De 3 a 10</span>
                    </div>
                    <div className={style["legendItem"]}>
                      <span className={style["legendColor"]} style={{ backgroundColor: colors[3] }}></span>
                      <span>Más de 10</span>
                    </div>
                  </>
              ) : (
                  quintileSteps.map((_, index) => {
                    if (index % 2 !== 0) return null;

                    const start = quintileSteps[index];
                    const end = quintileSteps[index + 1];

                    return (
                        <div key={index} className={style["legendItem"]}>
                  <span
                      className={style["legendColor"]}
                      style={{ backgroundColor: colors[index / 2] }}
                  ></span>
                          <span>{`De ${start} a ${end}`}</span>
                        </div>
                    );
                  })
              )}
            </div>
        )}
      </>
  );
};

export default MapComponent;