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
                const values = value as unknown as string[];
                values?.forEach(val => {
                    if(val === "nan"){
                        return;
                    }

                    if(val === ""){
                        return;
                    }

                    uniqueValues.add(val)
                });
                return;
            }

            uniqueValues.add(value as unknown as string);
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
                const values = event[key] as unknown as string[];
                return values?.some(val => {
                    if(val !== "nan"){
                       return value === val
                    }
                });
            }
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

    static ageRanges: Record<
        "20-25" | "26-30" | "31-40" | "41-50" | "51+" | "N/N",
        (age: number | null) => boolean
    > = {
        "20-25": (age: number | null) => age !== null && age >= 20 && age <= 25,
        "26-30": (age: number | null) => age !== null && age >= 26 && age <= 30,
        "31-40": (age: number | null) => age !== null && age >= 31 && age <= 40,
        "41-50": (age: number | null) => age !== null && age >= 41 && age <= 50,
        "51+": (age: number | null) => age !== null && age > 50,
        "N/N": (age: number | null) => age === null || age === 0,
    };

    /**
     * Agrupa edades en rangos definidos y retorna los valores únicos.
     */
    static getAgeRanges<T>(events: T[], key: keyof T): CustomTooltipData[] {
        const ageCount: { [key: string]: number } = {
            "20-25": 0,
            "26-30": 0,
            "31-40": 0,
            "41-50": 0,
            "51+": 0,
            "N/N": 0,
        };

        events.forEach(event => {
            const age = event[key] as unknown as number | null;

            for (const range in this.ageRanges) {
                if (this.ageRanges[range as keyof typeof this.ageRanges](age)) {
                    ageCount[range]++;
                    break;
                }
            }
        });

        return Object.keys(ageCount)
            .filter(range => ageCount[range] > 0)
            .map(range => ({
                value: range,
                label: `${range}`,
            }));
    }

    /**
     * Filtra eventos por un rango de edades específico.
     */
    static filterEventsByAgeRange<T>(
        events: T[],
        key: keyof T,
        range: string
    ): T[] {
        if (!this.ageRanges[range as keyof typeof this.ageRanges]) return events;
        console.log(events)
        return events.filter(event => {
            const age = event[key] as unknown as number | null;
            return this.ageRanges[range as keyof typeof this.ageRanges](age);
        });
    }
}

export default EventController;