import colombiaGeoJSONByCities from "@/components/maps/ColombiaDepartments.json";
import {sectionStateData} from "@/interfaces";
import style from "@/components/data/Map/map.module.css";
import filter from "@/components/reports/Filter";
import mapboxgl from "mapbox-gl";

class MapController {
    static selectedCity: string | null = null;

    static removeAccents(input: string): string {
        return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    static extractProvinces(events: { province: string }[]): string[] {
        const provinces = events.map(event => event.province);
        return Array.from(new Set(provinces));
    }

    static highlightPolygons(map: mapboxgl.Map, polygons: string[], filterEvents: (newState: sectionStateData) => void, counts: Record<string, string>) {
        let hoveredStateId: number | string | null = null;
        let tooltip = document.getElementById('map-tooltip');

        if(!tooltip){
            tooltip = document.createElement('div');
            tooltip.classList.add(style.tooltip);
            tooltip.id = 'map-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = '#fff';
            tooltip.style.padding = '5px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.display = 'none';
            tooltip.style.pointerEvents = 'none';
            map.getContainer().appendChild(tooltip);
        }

        const provinceFeatures = polygons.map(polygonName => {
            return colombiaGeoJSONByCities.features.find((feature: any) =>
                MapController.removeAccents(feature.properties.mpio_cnmbr) === MapController.removeAccents(polygonName)
            );
        }).filter(feature => feature !== undefined);

        if (provinceFeatures.length > 0) {
            const provinceGeoJSON: any = {
                type: "FeatureCollection",
                features: provinceFeatures
            };

            if (map.getSource("highlightPolygons")) {
                (map.getSource("highlightPolygons") as any).setData(provinceGeoJSON);
            } else {
                map.addSource("highlightPolygons", {
                    type: "geojson",
                    data: provinceGeoJSON as any
                });

                map.addLayer({
                    id: "highlightPolygons-fill",
                    type: "fill",
                    source: "highlightPolygons",
                    paint: {
                        "fill-color": "#569aaf",
                        "fill-opacity": 0.7
                    }
                });

                map.on('mousemove', 'highlightPolygons-fill', (e) => {
                    tooltip.style.display = 'none';

                    if (e.features && e.features[0].properties && e.features.length > 0) {
                        const feature = e.features[0];

                        if (hoveredStateId !== null) {
                            map.setFeatureState(
                                { source: 'highlightPolygons', id: hoveredStateId },
                                { hover: false }
                            );
                        }

                        hoveredStateId = feature.id ?? null;

                        if (hoveredStateId !== null) {
                            map.setFeatureState(
                                { source: 'highlightPolygons', id: hoveredStateId },
                                { hover: true }
                            );
                        }

                        tooltip.style.display = 'block';

                        const mapWidth = map.getCanvas().clientWidth;
                        const mapHeight = map.getCanvas().clientHeight;
                        const tooltipWidth = tooltip.offsetWidth;
                        const tooltipHeight = tooltip.offsetHeight;

                        let left = e.point.x - 30;
                        let top = e.point.y - 45;

                        if (left + tooltipWidth > mapWidth) {
                            left = mapWidth - tooltipWidth - 30;
                        }

                        if (top + tooltipHeight > mapHeight) {
                            top = mapHeight - tooltipHeight - 45;
                        }

                        tooltip.style.left = `${left}px`;
                        tooltip.style.top = `${top}px`;

                        let tooltipHtmlContent = `<strong>${e.features[0].properties.mpio_cnmbr}</strong>`;

                        const cityName = String(e.features[0].properties.mpio_cnmbr).toLowerCase();

                        if (counts && counts[cityName]) {
                            tooltipHtmlContent += `<br><strong>${counts[cityName]}</strong>`;
                        }

                        tooltip.innerHTML = tooltipHtmlContent;
                    }
                });

                map.on('mouseleave', 'highlightPolygons-fill', () => {
                    if (hoveredStateId !== null) {
                        map.setFeatureState(
                            { source: 'highlightPolygons', id: hoveredStateId},
                            { hover: false }
                        );
                    }
                    map.getCanvas().style.cursor = '';
                    hoveredStateId = null;

                    tooltip.style.display = 'none';
                });

                map.on('mouseenter', 'highlightPolygons-fill', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.addLayer({
                    id: "highlightPolygons-outline",
                    type: "line",
                    source: "highlightPolygons",
                    layout: {},
                    paint: {
                        "line-color": "#0E6E8C",
                        "line-width": 2
                    }
                });
            }

            map.on('click', 'highlightPolygons-fill', (e: any) => {
                const clickedCity = e.features[0].properties.mpio_cnmbr;
                const filterObject = {
                    axe: "",
                    crop: "",
                    city: ""
                };

                if(MapController.selectedCity === clickedCity){
                    filterEvents(filterObject);
                    MapController.resetSelectedCity();
                    MapController.cleanMap(map);
                    return;
                }

                MapController.cleanMap(map);
                filterObject.city = clickedCity;
                filterEvents(filterObject);
                MapController.selectedCity = clickedCity;
                MapController.highlightPolygons(map, [clickedCity], filterEvents, counts);
            });
            return;
        }

        if (provinceFeatures.length === 0) {
            const layersToRemove = [
                "highlightPolygons-fill",
                "highlightPolygons-fill-alter",
                "highlightPolygons-outline"
            ];

            layersToRemove.forEach(layerId => {
                if (map.getLayer(layerId)) {
                    map.removeLayer(layerId);
                }
            });

            if (map.getSource("highlightPolygons")) {
                map.removeSource("highlightPolygons");
            }

            console.log("No provinces found to highlight.");
        }
    }

    static resetSelectedCity() {
        MapController.selectedCity = null;
    }

    static cleanMap(map: mapboxgl.Map): void {
        if (map.getSource("highlightPolygons")) {
            map.removeLayer("highlightPolygons-fill");
            map.removeLayer("highlightPolygons-outline");
            map.removeSource("highlightPolygons");
        }
    }

    static updateCountEventsByCity(events: { city: string }[]): Record<string, string> {
        const cityEventCounts: Record<string, string> = {};

        events.forEach(event => {
            const city = event.city;

            if (cityEventCounts[city]) {
                const currentCount = parseInt(cityEventCounts[city].replace(/\D/g, ''), 10);
                cityEventCounts[city] = `Eventos: ${currentCount + 1}`;
                return;
            }

            cityEventCounts[city] = 'Eventos: 1';
        });

        return cityEventCounts;
    }
}

export default MapController;