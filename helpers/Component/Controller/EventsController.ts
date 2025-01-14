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
                    if (val.trim() === "" || val.toLowerCase() === "nan") {
                        return;
                    }

                    uniqueValues.add(val);
                });
                return;
            }

            if (value && (value as string).trim() !== "" && (value as string).toLowerCase() !== "nan") {
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
        "18-28" | "28-59" | "60+" | "No disponible",
        (age: number | null) => boolean
    > = {
        "18-28": (age: number | null) => age !== null && age >= 18 && age < 28,
        "28-59": (age: number | null) => age !== null && age >= 28 && age <= 59,
        "60+": (age: number | null) => age !== null && age >= 60 ,
        "No disponible": (age: number | null) => age === null || age === 0,
    };

    /**
     * Agrupa edades en rangos definidos y retorna los valores únicos.
     */
    static getAgeRanges<T>(events: T[], key: keyof T): CustomTooltipData[] {
        const ageCount: { [key: string]: number } = {
            "18-28": 0,
            "28-59": 0,
            "60+": 0,
            "No disponible": 0,
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
        return events.filter(event => {
            const age = event[key] as unknown as number | null;
            return this.ageRanges[range as keyof typeof this.ageRanges](age);
        });
    }

    static predefinedInstitutions = new Set([
        "CIMMYT",
        "CIAT (Alianza Bioversity-CIAT)",
        "AGROSAVIA",
        "FEDEARROZ",
        "FEDEPAPA",
        "AUGURA",
        "ASOHOFRUCOL",
        "FEDEGAN",
        "FEDEPANELA",
        "CIPAV",
        "CENICAFE",
        "MADR",
        "FENALCE",
        "ASBAMA",
        "CENICAÑA",
        "FEDECAFE",
    ]);

    static predefinedInstitutionsProducers = new Set([
        "CIMMYT",
        "AGROSAVIA",
        "FEDEARROZ",
        "FEDEPAPA",
        "AUGURA",
        "ASOHOFRUCOL",
        "FEDEGAN",
        "FEDEPANELA",
        "CIPAV",
        "CENICAFE",
        "FENALCE",
        "ASBAMA",
        "CENICAÑA",
        "FEDECAFE",
    ]);

    static getInstitutionCategories<T>(
        events: T[],
        key: keyof T,
        predefinedInstitutions: Set<String>,
        isArray: boolean = false,
    ): CustomTooltipData[] {
        const categoryCounts: { [key: string]: number } = {};

        events.forEach(event => {
            const institutions = event[key];

            const institutionList = isArray
                ? (institutions as unknown as string[])
                : [institutions as unknown as string];

            institutionList.forEach(institution => {
                const category = predefinedInstitutions.has(institution)
                    ? institution
                    : "Otras";

                if (!categoryCounts[category]) {
                    categoryCounts[category] = 0;
                }
                categoryCounts[category]++;
            });
        });

        return this.sortLabels(Object.keys(categoryCounts))
            .filter(category => categoryCounts[category] > 0)
            .map(category => ({
                value: category,
                label: `${category}`,
            }));
    }


    static filterEventsByInstitution<T>(
        events: T[],
        key: keyof T,
        selectedCategory: string,
        predefinedInstitutions: Set<String>,
        isArray: boolean = false,
    ): T[] {
        return events.filter(event => {
            const institutions = event[key];

            const institutionList = isArray
                ? (institutions as unknown as string[])
                : [institutions as unknown as string];

            return institutionList.some(institution =>
                predefinedInstitutions.has(institution)
                    ? institution === selectedCategory
                    : selectedCategory === "Otras"
            );
        });
    }

}

export default EventController;