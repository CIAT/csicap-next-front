import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";

class BeneficiariesController {

    static getUniqueCrops(data: DataFormat[]): string[] {
        const crops: string[] = data.flatMap(data => data.produccion);
        return Array.from(new Set(crops));
    }

    static formatEvents(data: DataFormat[]) {
        return data.map((item: DataFormat) => ({
            ...item, // Extraer los datos de la propiedad `data`
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

    static filterEventsByCrop(events: DataFormat[], crop: string): DataFormat[] {
        if (crop === "") {
            return events;
        }
        return events.filter(event => event.produccion.includes(crop));
    }

    // static filterEventsByProvince(events: DataFormat[], province: string): DataFormat[] {
    //     if (province === "") {
    //         return events;
    //     }
    //     return events.filter(event => event.department_where_you_work.includes(province));
    // }

}

export default BeneficiariesController;