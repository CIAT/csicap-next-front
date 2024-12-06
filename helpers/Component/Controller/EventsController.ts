import {CustomTooltipData} from "@/interfaces/Components/CustomTooltip";

class EventController {
    /**
     * Obtiene valores únicos de una propiedad de un conjunto de eventos.
     */
    static getUniqueValues<T, K extends keyof T>(
        events: T[],
        key: K,
        isArray: boolean = false
    ): CustomTooltipData[] {
        const uniqueValues = new Set<string>();

        events.forEach(event => {
            const value = event[key];

            if (isArray) {
                // Si la propiedad es un array, agregar cada elemento al Set
                const values = value as unknown as string[];
                values?.forEach(val => {
                    if(val !== "nan"){
                        uniqueValues.add(val)
                    }
                });
            } else {
                // Si la propiedad es un string, agregarla directamente
                uniqueValues.add(value as unknown as string);
            }
        });

        return this.sortLabels([...uniqueValues]).map(value => ({
            value: value,
            label: value,
        }));
    }

    /**
     * Filtra eventos por un valor específico en una propiedad.
     */
    static filterEventsByValue<T, K extends keyof T>(
        events: T[],
        key: K,
        value: string,
        isArray: boolean = false
    ): T[] {
        if (value === "") return events;

        return events.filter(event => {
            if (isArray) {
                // Si la propiedad es un array, verificar si incluye el valor
                const values = event[key] as unknown as string[];
                return values?.some(val => {
                    if(val !== "nan"){
                       return value === val
                    }
                });
            }
            // Si la propiedad es un string, compararla directamente
            return event[key] === value;
        });
    }

    /**
     * Ordena etiquetas alfabéticamente o numéricamente si tienen prefijos numéricos.
     */
    static sortLabels(labels: string[]): string[] {
        return labels.sort((a, b) => {
            const regex = /^\d+/;
            const numA = a.match(regex)?.[0];
            const numB = b.match(regex)?.[0];

            if (numA && numB) {
                return parseInt(numA) - parseInt(numB);
            }
            if (numA) return -1;
            if (numB) return 1;

            return a.localeCompare(b);
        });
    }
}

export default EventController;