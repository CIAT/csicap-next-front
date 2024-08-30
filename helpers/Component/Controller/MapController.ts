// src/utils/MapController.ts
import colombiaGeoJSON from "../../../components/data/Map/colombia.geo.json"; // Update with the correct path

class MapController {
    static removeAccents(input: string): string {
        return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    static extractProvinces(events: { province: string }[]): string[] {
        const provinces = events.map(event => event.province);
        return Array.from(new Set(provinces));
    }

    static highlightProvinces(map: mapboxgl.Map, provinces: string[]) {
        const provinceFeatures = provinces.map(provinceName => {
            return colombiaGeoJSON.features.find((feature: any) =>
                MapController.removeAccents(feature.properties.NOMBRE_DPT.toUpperCase()) === MapController.removeAccents(provinceName.toUpperCase())
            );
        }).filter(feature => feature !== undefined);

        if (provinceFeatures.length > 0) {
            const provinceGeoJSON: any = {
                type: "FeatureCollection",
                features: provinceFeatures
            };

            if (map.getSource("highlightedProvinces")) {
                (map.getSource("highlightedProvinces") as any).setData(provinceGeoJSON);
            } else {
                map.addSource("highlightedProvinces", {
                    type: "geojson",
                    data: provinceGeoJSON as any
                });

                map.addLayer({
                    id: "highlightedProvinces-fill",
                    type: "fill",
                    source: "highlightedProvinces",
                    layout: {},
                    paint: {
                        "fill-color": "#c8a041",
                        "fill-opacity": 0.5
                    }
                });

                map.addLayer({
                    id: "highlightedProvinces-outline",
                    type: "line",
                    source: "highlightedProvinces",
                    layout: {},
                    paint: {
                        "line-color": "#c8a041",
                        "line-width": 2
                    }
                });
            }
            return;
        }

        if(provinceFeatures.length === 0) {
            if (map.getLayer("highlightedProvinces-fill")) {
                map.removeLayer("highlightedProvinces-fill");
            }
            if (map.getLayer("highlightedProvinces-outline")) {
                map.removeLayer("highlightedProvinces-outline");
            }
            if (map.getSource("highlightedProvinces")) {
                map.removeSource("highlightedProvinces");
            }
            console.log("No provinces found to highlight.");
        }
    }
}

export default MapController;