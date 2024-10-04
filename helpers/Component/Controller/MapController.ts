import colombiaGeoJSONByCities from "@/components/maps/ColombiaDepartments.json";
import {sectionStateData} from "@/interfaces";
import style from "@/components/data/Map/map.module.css";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";

class MapController {
    static selectedCity: string | null = null;
    static selectedProvince: string | null = null;

    static removeAccents(input: string): string {
        return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    static extractProvinces(events: { province: string }[]): string[] {
        const provinces = events.map(event => event.province);
        return Array.from(new Set(provinces));
    }

    static highlightPolygons(map: mapboxgl.Map, polygons: string[][], counts: NestedDictionary, filterEvents?: (newState: sectionStateData) => void) {
        let hoveredStateId: number | string | null = null;
        let tooltip = document.getElementById('map-tooltip');

        if (!tooltip) {
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

        // Encontrar los polígonos para las provincias y ciudades dadas
        const provinceAndCityFeatures = polygons.map(polygon => {
            const [province, city] = polygon; // Desestructuramos para obtener provincia y ciudad

            return colombiaGeoJSONByCities.features.find((feature: any) =>
                MapController.removeAccents(feature.properties.dpto_cnmbr) === MapController.removeAccents(province) &&
                MapController.removeAccents(feature.properties.mpio_cnmbr) === MapController.removeAccents(city)
            );
        }).filter(feature => feature !== undefined);

        if (provinceAndCityFeatures.length > 0) {
            const provinceGeoJSON: any = {
                type: "FeatureCollection",
                features: provinceAndCityFeatures
            };

            if (map.getSource("highlightPolygons")) {
                (map.getSource("highlightPolygons") as any).setData(provinceGeoJSON);
            } else {
                map.addSource("highlightPolygons", {
                    type: "geojson",
                    data: provinceGeoJSON as any
                });

                // Capa para rellenar los polígonos
                map.addLayer({
                    id: "highlightPolygons-fill",
                    type: "fill",
                    source: "highlightPolygons",
                    paint: {
                        "fill-color": "#569aaf",
                        "fill-opacity": 0.7
                    }
                });

                // Evento de mousemove para el tooltip y hover
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

                        let left = e.point.x - tooltipWidth;
                        let top = e.point.y - tooltipHeight;

                        if (left < 0) {
                            left += tooltipWidth;
                        }

                        if(top < 0){
                            top += tooltipHeight;
                        }

                        tooltip.style.left = `${left}px`;
                        tooltip.style.top = `${top}px`;

                        let provinceName = String(e.features[0].properties.dpto_cnmbr);
                        let cityName = String(e.features[0].properties.mpio_cnmbr);

                        // Mostrar tanto la provincia como la ciudad en el tooltip
                        let tooltipHtmlContent = `<strong>${provinceName}: ${cityName}</strong>`;

                        provinceName = this.removeAccents(provinceName);
                        cityName = this.removeAccents(cityName);
                        if (counts && counts[provinceName][cityName]) {
                            tooltipHtmlContent += `<br><strong>${counts[provinceName][cityName]}</strong>`;
                        }

                        tooltip.innerHTML = tooltipHtmlContent;
                    }
                });

                // Evento para eliminar hover y esconder el tooltip al salir
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

                // Cambiar el cursor al pasar sobre los polígonos
                map.on('mouseenter', 'highlightPolygons-fill', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                // Añadir una capa de contorno alrededor de los polígonos
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

            // Evento de clic para filtrar y resaltar ciudad/provincia seleccionada
            // Evento de clic para filtrar y resaltar ciudad/provincia seleccionada
            map.on('click', 'highlightPolygons-fill', (e: any) => {
                if(!filterEvents){
                    return;
                }

                const clickedCity = e.features[0].properties.mpio_cnmbr;
                const clickedProvince = e.features[0].properties.dpto_cnmbr;
                const filterObject = {
                    axe: "",
                    crop: "",
                    city: "",
                    province: ""
                };

                if (MapController.selectedCity === clickedCity && MapController.selectedProvince === clickedProvince) {
                    filterEvents(filterObject);
                    MapController.resetSelectedProvinceAndCity();
                    MapController.cleanMap(map);
                    return;
                }

                MapController.cleanMap(map);
                filterObject.city = clickedCity;
                filterObject.province = clickedProvince;
                filterEvents(filterObject);
                MapController.selectedCity = clickedCity;
                MapController.selectedProvince = clickedProvince;
                MapController.highlightPolygons(map, [[clickedProvince, clickedCity]], counts, filterEvents);
            });
            return;
        }

        // Limpiar el mapa si no se encuentran provincias/ciudades
        if (provinceAndCityFeatures.length === 0) {
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

            console.log("No provinces/cities found to highlight.");
        }
    }

    static resetSelectedProvinceAndCity() {
        MapController.selectedCity = null;
        MapController.selectedProvince = null;
    }

    static cleanMap(map: mapboxgl.Map): void {
        if (map.getSource("highlightPolygons")) {
            map.removeLayer("highlightPolygons-fill");
            map.removeLayer("highlightPolygons-outline");
            map.removeSource("highlightPolygons");
        }
    }

    static updateCountEventsByCity(events: { province: string, city: string }[]): NestedDictionary {
        const cityEventCounts: NestedDictionary = {};

        events.forEach(event => {
            const province = this.removeAccents(event.province);
            const city = this.removeAccents(event.city);

            if (!cityEventCounts[province]) {
                cityEventCounts[province] = {};
            }

            if (cityEventCounts[province][city]) {
                const currentCount = parseInt(cityEventCounts[province][city].replace(/\D/g, ''), 10);
                cityEventCounts[province][city] = `Eventos: ${currentCount + 1}`;
                return;
            }

            cityEventCounts[province][city] = 'Eventos: 1';
        });
        return cityEventCounts;
    }

    static updateCountAssistantsByGender(events: {
        city: string;
        province: string;
        event_objective: string;
        female_participants: string;
        male_participants: string;
        other_participants: string;
    }[]): NestedDictionary {
        const genderCounts: NestedDictionary = {};

        events.forEach(event => {
            const province = this.removeAccents(event.province);
            const city = this.removeAccents(event.city);
            const maleCount = Number(event.male_participants) || 0;
            const femaleCount = Number(event.female_participants) || 0;
            const otherCount = Number(event.other_participants) || 0;

            if (!genderCounts[province]) {
                genderCounts[province] = {};
            }

            if (!genderCounts[province][city]) {
                genderCounts[province][city] = `Asistentes: 0<br>Mujeres: 0<br>Hombres: 0<br>Otros: 0`;
            }

            const existingCounts = genderCounts[province][city];
            const currentTotal = this.extractCount(existingCounts, 'Asistentes');
            const currentFemale = this.extractCount(existingCounts, 'Mujeres');
            const currentMale = this.extractCount(existingCounts, 'Hombres');
            const currentOther = this.extractCount(existingCounts, 'Otros');

            const newTotal = currentTotal + maleCount + femaleCount + otherCount;
            const newFemale = currentFemale + femaleCount;
            const newMale = currentMale + maleCount;
            const newOther = currentOther + otherCount;

            genderCounts[province][city] = `Asistentes: ${newTotal}<br>Mujeres: ${newFemale}<br>Hombres: ${newMale}<br>Otros: ${newOther}`;
        });

        return genderCounts;
    }

    static extractCount(text: string, label: string): number {
        const regex = new RegExp(`${label}: (\\d+)`);
        const match = text.match(regex);
        return match ? Number(match[1]) : 0;
    }

}

export default MapController;