import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";

class ProducersController {
    static getUniqueCrops(data: DataFormat[]): string[] {
        const crops: string[] = data.flatMap(data => data.produccion);
        return Array.from(new Set(crops));
    }

    static formatEvents(data: DataFormat[]) {
        return data.map((item: DataFormat) => ({
            ...item,
            gremio: item.gremio,
            sexo: item.gen_name,
            etnia: item.pr_ethnic_group,
            propiedad: item.type_property,
            produccion: item.produccion,
            edad: item.edad,
            cultivo1: item.pr_primary_crop,
            cultivo2: item.pr_secundary_crop,
            province: item.pr_dpto
        }));
    }

    static extractProvinces(events: DataFormat[]): string[] {
        const provinces = events.map(event => event.pr_dpto);
        return Array.from(new Set(provinces));
    }

    static extractProvincesAndCities(events: { pr_dpto: string, pr_muni: string}[]): string[][]{
        const provincesAndCities = events.map(event => [event.pr_dpto, event.pr_muni]);
        return Array.from(new Set(provincesAndCities));
    }

    static filterEventsByCrop(events: DataFormat[], crop: string): DataFormat[] {
        if (crop === "") {
            return events;
        }
        return events.filter(event => event.produccion.includes(crop));
    }
}

export default ProducersController;