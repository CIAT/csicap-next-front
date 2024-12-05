import {EventFormat} from "@/interfaces/Components/Events";
import {CustomTooltipData} from "@/interfaces/Components/CustomTooltip";

class EventController {
    static getUniqueComponents(events: EventFormat[]): CustomTooltipData[] {
        const uniqueComponents = new Set<string>();
        events.forEach(event => {
            event.component.forEach(component => uniqueComponents.add(component));
        });
        return this.sortLabels([...uniqueComponents]).map(component => ({
            value: component,
            label: component
        }));
    }

    static getUniqueAxis(events: EventFormat[]): CustomTooltipData[] {
        const uniqueAxis = new Set<string>();
        events.forEach(event => {
            event.eje.forEach(eje => uniqueAxis.add(eje));
        });
        return this.sortLabels([...uniqueAxis]).map(axe => ({
            value: axe,
            label: axe
        }));
    }

    static getUniqueInstitutions(events: EventFormat[]): CustomTooltipData[] {
        const uniqueInstitutions = new Set<string>();
        events.forEach(event => {
            event.institution.forEach(institution => uniqueInstitutions.add(institution));
        });
        return this.sortLabels([...uniqueInstitutions]).map(institution => ({
            value: institution,
            label: institution
        }));
    }

    static getUniqueCrops(events: EventFormat[]): CustomTooltipData[] {
        const uniqueCrops = new Set<string>();
        events.forEach(event => {
            event.crop.forEach(crop => uniqueCrops.add(crop));
        });
        return this.sortLabels([...uniqueCrops]).map(crop => ({
            value: crop,
            label: crop
        }));
    }

    static getUniqueDepartments(events: EventFormat[]): CustomTooltipData[] {
        const uniqueDepartments = new Set<string>();
        events.forEach(event => {
            uniqueDepartments.add(event.province);
        });
        return this.sortLabels([...uniqueDepartments]).map(department => ({
            value: department,
            label: department
        }));
    }

    static getUniqueCities(events: EventFormat[]): CustomTooltipData[] {
        const uniqueCities = new Set<string>();
        events.forEach(event => {
            uniqueCities.add(event.city);
        });
        return this.sortLabels([...uniqueCities]).map(city => ({
            value: city,
            label: city
        }));
    }

    static getUniqueGCFActivities(events: EventFormat[]): CustomTooltipData[] {
        const uniqueGCFActivities = new Set<string>();
        events.forEach(event => {
            event.gcf_activities.forEach(activity => {
                if(activity !== "nan"){
                    uniqueGCFActivities.add(activity)
                }
            });
        });
        return this.sortByPrefixedVersion([...uniqueGCFActivities]).map(activity => ({
            value: activity,
            label: activity
        }));
    }

    static sortLabels(labels: string[]): string[] {
        return labels.sort((a, b) => {
            // Extraer números al inicio del label, si existen
            const regex = /^\d+/;
            const numA = a.match(regex)?.[0];
            const numB = b.match(regex)?.[0];

            // Si ambos tienen números, comparar numéricamente
            if (numA && numB) {
                return parseInt(numA) - parseInt(numB);
            }

            // Si solo uno tiene número, priorizar el que tiene número
            if (numA) return -1;
            if (numB) return 1;

            // Si ninguno tiene número, comparar alfabéticamente
            return a.localeCompare(b);
        });
    }

    static sortByPrefixedVersion(labels: string[]): string[] {
        return labels.sort((a, b) => {
            // Extraer la parte numérica al inicio de cada cadena
            const parseVersion = (str: string): number[] => {
                const match = str.match(/^(\d+(\.\d+)*)/);
                return match ? match[0].split('.').map(num => parseInt(num, 10)) : [];
            };

            const versionA = parseVersion(a);
            const versionB = parseVersion(b);

            // Comparar los números en cada nivel
            for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
                const numA = versionA[i] || 0;
                const numB = versionB[i] || 0;

                if (numA !== numB) {
                    return numA - numB;
                }
            }

            // Si las versiones son iguales, comparar alfabéticamente el texto
            return a.localeCompare(b);
        });
    }

    static filterEventsByComponent(events: EventFormat[], component: string): EventFormat[] {
        if(component === ""){
            return events;
        }

        return events.filter(event => {
            return event.component.some(components => components === component);
        })
    }

    static filterEventsByAxis(events: EventFormat[], axe: string): EventFormat[] {
        if(axe === ""){
            return events;
        }

        return events.filter(event => {
            return event.eje.some(eje => eje === axe);
        })
    }

    static filterEventsByInstitution(events: EventFormat[], institution: string): EventFormat[] {
        if(institution === ""){
            return events;
        }

        return events.filter(event => {
            return event.institution.some(tempInstitution => institution === tempInstitution);
        })
    }

    static filterEventsByCrop(events: EventFormat[], crop: string): EventFormat[] {
        if(crop === ""){
            return events;
        }

        return events.filter(event => {
            return event.crop.some(tempCrop => tempCrop === crop);
        })
    }

    static filterEventsByDepartment(events: EventFormat[], department: string): EventFormat[] {
        if(department === ""){
            return events;
        }

        return events.filter(event => event.province === department)
    }

    static filterEventsByCity(events: EventFormat[], city: string): EventFormat[] {
        if(city === ""){
            return events;
        }

        return events.filter(event => event.city === city)
    }

    static filterEventsByCGFActivity(events: EventFormat[], activity: string): EventFormat[] {
        if(activity === ""){
            return events;
        }

        return events.filter(event => {
            return event.gcf_activities.some(gcf_activity => gcf_activity === activity);
        })
    }
}

export default EventController;