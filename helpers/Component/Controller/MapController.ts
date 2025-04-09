import colombiaGeoJSONByCities from "@/components/maps/ColombiaDepartments.json";
import {sectionStateData} from "@/interfaces";
import style from "@/components/data/Map/map.module.css";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";
import mapboxgl, {DataDrivenPropertyValueSpecification} from "mapbox-gl";
import {colors as staticColors} from "@/interfaces/Map/colors";
import {MappedTrained} from "@/interfaces/Components/AssistanceComponent";
import html2canvas from "html2canvas";

class MapController {
    static selectedCity: string | null = null;
    static selectedProvince: string | null = null;
    static mapReference: string;

    static setMapReference(mapReference: string) {
        this.mapReference = mapReference;
    }

    static async downloadMapAsImage(fileName?: string): Promise<void> {
        if (!this.mapReference) {
            console.error("No se encontró la referencia del mapa.");
            return;
        }

        // Crear imagen del mapa
        const mapImage = new Image();
        mapImage.src = this.mapReference;

        // Esperar a que la imagen cargue
        await new Promise((resolve) => (mapImage.onload = resolve));

        // Capturar la leyenda como imagen
        const legendElement = document.querySelector(`.${style["legend"]}`) as HTMLElement;
        if (!legendElement) {
            console.error("No se encontró la leyenda.");
            return;
        }

        const legendCanvas = await html2canvas(legendElement, { backgroundColor: null });
        const legendImage = new Image();
        legendImage.src = legendCanvas.toDataURL("image/png");

        // Esperar a que la imagen de la leyenda cargue
        await new Promise((resolve) => (legendImage.onload = resolve));

        // Crear el canvas donde combinaremos ambas imágenes
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("No se pudo obtener el contexto 2D del canvas.");
            return;
        }

        // Ajustar tamaño del canvas para incluir mapa + leyenda
        canvas.width = mapImage.width;
        canvas.height = mapImage.height + legendImage.height + 10; // Espacio para la leyenda

        // Dibujar el mapa en el canvas
        ctx.drawImage(mapImage, 0, 0);

        const legendX = canvas.width - legendImage.width - 10;
        const legendY = canvas.height - (legendImage.height * 2) - 20;

        ctx.drawImage(legendImage, legendX, legendY);

        // Convertir el canvas en imagen y descargarla
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Error al generar la imagen.");
                return;
            }

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName ?? "map_with_legend.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, "image/png");
    }

    static removeAccents(input: string): string {
        if(!input){
            return input;
        }
        return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    static changeFillColor(map: mapboxgl.Map, steps: Number[]) {
        if (!map.isStyleLoaded()) {
            map.on('styledata', () => {
                this.applyFillColor(map, steps);
            });
            return;
        }
        this.applyFillColor(map, steps);
    }

    static applyFillColor(map: mapboxgl.Map, steps: Number[]) {
        const colors = staticColors;

        // Ajustar los extremos para evitar duplicados, manteniendo el valor más a la derecha
        const adjustedSteps = steps.map((step, index, arr) => {
            if (index < arr.length - 1 && step === arr[index + 1]) {
                // Ajustar el valor más a la derecha, es decir, el siguiente valor duplicado
                return Number(step) - 0.0001 * (arr.length - index); // Sumar un valor pequeño, con mayor ajuste para los índices más a la derecha
            }
            return step; // Mantener el valor original
        });

        // Crear la propiedad de color
        const fillColor: DataDrivenPropertyValueSpecification<string> = [
            'case',
            ['==', ['get', 'value'], null],
            'white',
            ['step', ['get', 'value'],
                colors[0], adjustedSteps[1],
                colors[1], adjustedSteps[3],
                colors[2], adjustedSteps[5],
                colors[3]
            ]
        ];

        // Aplicar los colores al mapa
        map.setPaintProperty('highlightPolygons-fill', 'fill-color', fillColor);
    }

    static updateMapValues(polygonsFeatures: any, counts: NestedDictionary | Record<string, string>, quintileType: string) {
        if(this.isNestedDictionary(counts)){
            this.updateMapValuesForNestedDictionary(polygonsFeatures, counts, quintileType);
            return;
        }

        this.updateMapValuesForDictionary(polygonsFeatures, counts, quintileType);
    }

    static updateMapValuesForNestedDictionary(polygonsFeatures: any, counts: NestedDictionary, quintileType: string){
        polygonsFeatures.forEach((feature: { properties: { value: any; dpto_cnmbr: string; mpio_cnmbr: string; }; }) => {
            const provinceName = this.removeAccents(feature.properties.dpto_cnmbr);
            const cityName = this.removeAccents(feature.properties.mpio_cnmbr);

            if (provinceName && cityName && counts[provinceName] && counts[provinceName][cityName]) {
                feature.properties.value = this.extractCount(counts[provinceName][cityName], quintileType);
                return;
            }

            feature.properties.value = 0;
        });
    }

    static updateMapValuesForDictionary(polygonsFeatures: any, counts: Record<string, string>, quintileType: string) {
        polygonsFeatures.forEach((feature: { properties: { value: any; dpto_cnmbr: string; }; }) => {
            const provinceName = this.removeAccents(feature.properties.dpto_cnmbr);

            if (provinceName && counts[provinceName]) {
                feature.properties.value = this.extractCount(counts[provinceName], quintileType);
                return;
            }

            feature.properties.value = 0;
        });
    }

    static isNestedDictionary(obj: unknown): obj is NestedDictionary {
        if (typeof obj !== 'object' || obj === null) return false;

        // Verificar que cada valor sea un objeto con claves string y valores string
        return Object.values(obj).every(value =>
            typeof value === 'object' &&
            value !== null &&
            Object.values(value).every(innerValue => typeof innerValue === 'string')
        );
    }

    static calculateQuartile(data: NestedDictionary | Record<string, string>, valueKey: string): number[] {
        if (valueKey === "Eventos") return [1, 2, 2, 3, 3, 10, 10, 33];
        if (valueKey === "Familias registradas") return [1, 2, 2, 3, 3, 10, 10, 320];

        const values: number[] = this.getValuesForQuartile(data, valueKey);

        // Si no hay valores, retornar extremos como ceros
        if (values.length === 0) {
            return Array(8).fill(0);
        }

        // Ordenar los valores
        values.sort((a, b) => a - b);

        // Calcular extremos de cada cuartil
        const quartileExtremes: number[] = [];
        const quartileSize = Math.ceil(values.length / 4);

        for (let i = 0; i < 4; i++) {
            const start = i * quartileSize;
            const end = i === 3 ? values.length : (i + 1) * quartileSize;
            quartileExtremes.push(values[start]);
            quartileExtremes.push(values[end - 1]);
        }

        return quartileExtremes;
    }

    static getValuesForQuartile(data: NestedDictionary | Record<string, string>, valueKey: string): number[] {
        const values: number[] = [];
        if (this.isNestedDictionary(data)) {
            for (const key in data) {
                if (data[key] && typeof data[key] === 'object') {
                    for (const subKey in data[key]) {
                        const valueString = data[key][subKey];
                        if (valueString.includes(valueKey)) {
                            const value = this.extractCount(valueString, valueKey);
                            if (!isNaN(value) && value > 0) {
                                values.push(value);
                            }
                        }
                    }
                }
            }
            return values;
        }

        for (const key in data) {
            const valueString = data[key];
            if (valueString.includes(valueKey)) {
                const value = this.extractCount(valueString, valueKey);
                if (!isNaN(value) && value > 0) {
                    values.push(value);
                }
            }
        }

        return values;
    }

    static highlightPolygons(
        map: mapboxgl.Map,
        polygons: string[][] | string[],
        counts: NestedDictionary | Record<string, string>,
        useQuintile?: boolean,
        quintileType?: string,
        filterEvents?: (newState: sectionStateData) => void,
    )  {
        let hoveredStateId: number | string | null = null;
        let tooltip = this.createOrGetTooltip(map);
        const polygonsFeatures = this.getPolygons(polygons);

        if(useQuintile && quintileType) {
            this.updateMapValues(polygonsFeatures, counts, quintileType);
        }

        if (polygonsFeatures.length > 0) {
            this.addPolygonsToMap(map, polygonsFeatures);
            this.setupPolygonInteractions(map, hoveredStateId, tooltip, counts, filterEvents);
            return;
        }

        this.clearMapIfNoPolygons(map, polygonsFeatures);
    }


    // Método para crear o obtener el tooltip
    static createOrGetTooltip(map: mapboxgl.Map): HTMLDivElement {
        let tooltip = document.getElementById('map-tooltip') as HTMLDivElement;

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

        return tooltip;
    }

    // Método para agregar los polígonos al mapa
    static addPolygonsToMap(map: mapboxgl.Map, polygonsFeatures: any) {
        const provinceGeoJSON = {
            type: "FeatureCollection",
            features: polygonsFeatures
        };

        if (map.getSource("highlightPolygons")) {
            (map.getSource("highlightPolygons") as any).setData(provinceGeoJSON);
        } else {
            map.addSource("highlightPolygons", {
                type: "geojson",
                data: provinceGeoJSON as any
            });

            // Capa de relleno
            map.addLayer({
                id: "highlightPolygons-fill",
                type: "fill",
                source: "highlightPolygons",
                paint: {
                    "fill-color": "#569aaf",
                    "fill-opacity": 0.7
                }
            });

            // Capa de contorno
            map.addLayer({
                id: "highlightPolygons-outline",
                type: "line",
                source: "highlightPolygons",
                layout: {},
                paint: {
                    "line-color": "#D2D8D8",
                    "line-width": 1
                }
            });
        }
    }

    // Método para configurar las interacciones con los polígonos (hover, tooltip, click)
    static setupPolygonInteractions(
        map: mapboxgl.Map,
        hoveredStateId: number | string | null,
        tooltip: HTMLDivElement,
        counts: NestedDictionary | Record<string, string>,
        filterEvents?: (newState: sectionStateData) => void
    ) {
        map.on('mousemove', 'highlightPolygons-fill', (e) => {
            this.handleMouseMove(e, map, tooltip, hoveredStateId, counts);
        });

        map.on('mouseleave', 'highlightPolygons-fill', () => {
            this.handleMouseLeave(map, hoveredStateId, tooltip);
        });

        map.on('mouseenter', 'highlightPolygons-fill', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('click', 'highlightPolygons-fill', (e: any) => {
            this.handlePolygonClick(e, map, counts, filterEvents);
        });
    }

    // Método para manejar el movimiento del ratón sobre el mapa
    static handleMouseMove(e: any, map: mapboxgl.Map, tooltip: HTMLDivElement, hoveredStateId: number | string | null, counts: NestedDictionary | Record<string, string>) {
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

            this.updateTooltipPosition(e, tooltip);
            this.updateTooltipContent(e, tooltip, counts);
        }
    }

    // Método para actualizar la posición del tooltip
    static updateTooltipPosition(e: any, tooltip: HTMLDivElement) {
        tooltip.style.display = 'block';
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        let left = e.point.x - tooltipWidth;
        let top = e.point.y - tooltipHeight;

        if (left < 0) {
            left += tooltipWidth;
        }

        if (top < 0) {
            top += tooltipHeight;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    // Método para actualizar el contenido del tooltip
    static updateTooltipContent(
        e: any,
        tooltip: HTMLDivElement,
        counts: NestedDictionary | Record<string, string>
    ) {
        let provinceName = String(e.features[0].properties.dpto_cnmbr);
        let cityName = String(e.features[0].properties.mpio_cnmbr);

        provinceName = this.removeAccents(provinceName);
        cityName = this.removeAccents(cityName);

        const isNestedDictionary = this.isNestedDictionary(counts);

        // Define tooltip content based on whether `counts` is a NestedDictionary
        let tooltipHtmlContent = isNestedDictionary
            ? `<strong>${provinceName}: ${cityName}</strong>`
            : `<strong>${provinceName}</strong>`;

        if (isNestedDictionary) {
            if (counts[provinceName] && counts[provinceName][cityName]) {
                const content = counts[provinceName][cityName];
                const currentTotal = this.extractCount(content, 'Capacitados');
                const hasAssistants = content.includes('Capacitados');

                if (!hasAssistants || (hasAssistants && currentTotal > 0)) {
                    tooltipHtmlContent += `<br><strong>${content}</strong>`;
                }
            }
        } else {
            if (counts[provinceName]) {
                const content = counts[provinceName] as string;
                const currentTotal = this.extractCount(content, 'Capacitados');
                const hasAssistants = content.includes('Capacitados');

                if (!hasAssistants || (hasAssistants && currentTotal > 0)) {
                    tooltipHtmlContent += `<br><strong>${content}</strong>`;
                }
            }
        }

        tooltip.innerHTML = tooltipHtmlContent;
    }

    // Método para manejar la salida del ratón del mapa
    static handleMouseLeave(map: mapboxgl.Map, hoveredStateId: number | string | null, tooltip: HTMLDivElement) {
        if (hoveredStateId !== null) {
            map.setFeatureState(
                { source: 'highlightPolygons', id: hoveredStateId },
                { hover: false }
            );
        }
        map.getCanvas().style.cursor = '';
        hoveredStateId = null;

        tooltip.style.display = 'none';
    }

    // Método para manejar el clic sobre los polígonos
    static handlePolygonClick(e: any, map: mapboxgl.Map, counts: NestedDictionary | Record<string, string>, filterEvents?: (newState: sectionStateData) => void) {
        if (!filterEvents) {
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
        MapController.highlightPolygons(map, [[clickedProvince, clickedCity]], counts, undefined, "", filterEvents);
    }

    // Método para limpiar el mapa si no hay polígonos encontrados
    static clearMapIfNoPolygons(map: mapboxgl.Map, polygonsFeatures: any) {
        if (polygonsFeatures.length === 0) {
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

    static getPolygons(polygons: string[][] | string[]) {
        const number = polygons[0] as string;
        const isNumber = !Number.isNaN(Number(number));

        if(isNumber){
            return this.getPolygonsByCode(polygons as string[]);
        }

        if (typeof polygons[0] === 'string'){
            return this.getPolygonsByDepartment(polygons as string[]);
        }

        return this.getPolygonsByName(polygons as string[][])
    }

    static getPolygonsByName(polygons: string[][]) {
        return polygons.map(polygon => {
            const [province, city] = polygon;

            return colombiaGeoJSONByCities.features.find((feature: any) =>
                MapController.removeAccents(feature.properties.dpto_cnmbr) === MapController.removeAccents(province) &&
                MapController.removeAccents(feature.properties.mpio_cnmbr) === MapController.removeAccents(city)
            );
        }).filter(feature => feature !== undefined);
    }

    static getPolygonsByDepartment(departments: string[]) {
        return departments.flatMap(department => {
            return colombiaGeoJSONByCities.features.filter((feature: any) =>
                MapController.removeAccents(feature.properties.dpto_cnmbr) === MapController.removeAccents(department)
            );
        });
    }

    static getPolygonsByCode(polygons: string[]) {
        return polygons.map(code => {
            return colombiaGeoJSONByCities.features.find((feature: any) =>
                feature.properties.mpio_cdpmp === code);
        }).filter(feature => feature !== undefined);
    }

    static getPolygonsByDepartmentCode(polygons: string[]) {
        return polygons.map(code => {
            return colombiaGeoJSONByCities.features.find((feature: any) =>
                feature.properties.dpto_ccdgo === code);
        }).filter(feature => feature !== undefined);
    }

    static getDepartmentNameByDepartmentCode(departmentCode: string) {
        const data = colombiaGeoJSONByCities.features.find((feature: any) =>
            feature.properties.dpto_ccdgo === departmentCode);

        if (!data) return;

        return data.properties.dpto_cnmbr;
    }

    static updateCountTrainedByCityCodes(trainedPeople: MappedTrained[]): NestedDictionary {
        const cityCodeTrainedCounts: NestedDictionary = {};

        // Verificar si events es un arreglo
        if (!Array.isArray(trainedPeople)) {
            throw new Error('El parámetro events debe ser un arreglo');
        }

        trainedPeople.forEach(trained => {
            // Verificar que event y municipalities_code no sean nulos o indefinidos
            // Aquí asumimos que cityCode es un string y no es necesario convertirlo
            const cityData = this.getPolygonsByCodeCityAndProvince(trained.muni_res_complete_code);

            if (cityData) {
                const provinceName = this.removeAccents(cityData.provinceName);
                const cityName = this.removeAccents(cityData.cityName);

                // Inicializar la provincia si no existe
                if (!cityCodeTrainedCounts[provinceName]) {
                    cityCodeTrainedCounts[provinceName] = {};
                }

                // Sumar el conteo de Profesionales para la ciudad
                if (cityCodeTrainedCounts[provinceName][cityName]) {
                    const currentCount = parseInt(cityCodeTrainedCounts[provinceName][cityName].replace(/\D/g, ''), 10);
                    cityCodeTrainedCounts[provinceName][cityName] = `Capacitados: ${currentCount + 1}`;
                } else {
                    cityCodeTrainedCounts[provinceName][cityName] = 'Capacitados: 1';
                }
            } else {
                console.warn('Los capacitados son nulos:', trained);
            }
        });

        return cityCodeTrainedCounts;
    }

    static getPolygonsByCodeCityAndProvince(code: string) {
        if (code === null) return;

        // Convertir el código del municipio en string para facilitar la manipulación
        let codeStr = code;

        if (codeStr.length === 4) {
            codeStr = `0${codeStr}`;
        }

        // Los primeros dos dígitos del código representan la provincia
        const provinceCode = codeStr.substring(0, 2);

        // Encontrar la provincia usando los primeros dos dígitos
        const provinceFeature = colombiaGeoJSONByCities.features.find((feature: any) =>
            feature.properties.dpto_ccdgo === provinceCode
        );

        // Encontrar el municipio usando el código completo
        const cityFeature = colombiaGeoJSONByCities.features.find((feature: any) =>
            feature.properties.mpio_cdpmp === codeStr
        );

        if (cityFeature && provinceFeature) {
            return {
                provinceName: provinceFeature.properties.dpto_cnmbr,
                cityName: cityFeature.properties.mpio_cnmbr,
                feature: cityFeature
            };
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

    static updateCountProfessionalsByProvince(events: { department_where_you_work: string[] }[]): Record<string, string> {
        const provinceProfessionalsCounts: Record<string, string> = {};

        events.forEach(event => {
            event.department_where_you_work.forEach(department => {
                const province: string = this.removeAccents(department);

                if (provinceProfessionalsCounts[province]) {
                    const currentCount = parseInt(provinceProfessionalsCounts[province].replace(/\D/g, ''), 10);
                    provinceProfessionalsCounts[province] = `Profesionales: ${currentCount + 1}`;
                    return;
                }

                provinceProfessionalsCounts[province] = 'Profesionales: 1';
            });
        });

        return provinceProfessionalsCounts;
    }

    static updateCountBeneficiariesByCity(events: {
        pr_dpto_farm: string;
        pr_muni_farm: string
    }[]): NestedDictionary {
        const cityBeneficiariesCounts: NestedDictionary = {};

        events.forEach(event => {
            const province = this.removeAccents(event.pr_dpto_farm);
            const city = this.removeAccents(event.pr_muni_farm);

            if (!cityBeneficiariesCounts[province]) {
                cityBeneficiariesCounts[province] = {};
            }

            if (cityBeneficiariesCounts[province][city]) {
                const currentCount = parseInt(cityBeneficiariesCounts[province][city].replace(/\D/g, ''), 10);
                cityBeneficiariesCounts[province][city] = `Familias registradas: ${currentCount + 1}`;
                return;
            }

            cityBeneficiariesCounts[province][city] = 'Familias registradas: 1';
        });
        return cityBeneficiariesCounts;
    }

    static extractCount(text: string, label: string): number {
        const regex = new RegExp(`${label}: (\\d+)`);
        const match = text.match(regex);
        return match ? Number(match[1]) : 0;
    }

    static getDepartmentCount(
        municipality_codes: string[]
    ): number {
        const departmentCodes: string[] = [];
        let departmentsCount = 0;

        municipality_codes.forEach((code) => {
            if(!code) return;
            const departmentCode = code.substring(0, 2);
            departmentCodes.push(departmentCode);
        })

        departmentsCount = Array.from(new Set(departmentCodes)).length;

        if (this.hasBogota(municipality_codes)) {
            departmentsCount--;
        }

        return departmentsCount;
    }

    static getMunicipalitiesCount(
        municipality_codes: string[]
    ): number {
        let municipalitiesCount = 0;
        municipalitiesCount = Array.from(new Set(municipality_codes)).length;
        return municipalitiesCount;
    }

    static hasBogota(municipality_codes: string[]): boolean {
        const BogotaCode = "11";
        return municipality_codes.some(element => {
            if (!element) return false;

            return element.substring(0, 2) === BogotaCode
        });
    }
}

export default MapController;