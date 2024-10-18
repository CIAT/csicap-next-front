import {DataFormat} from "@/interfaces/Components/BeneficiariesComponent";

class RegisteredController {
    static crops: { [key: string]: number; };
    static organizations: { [key: string]: number; };

    static processTreemapData(filter: string): { name: string; value: number }[] {
        let filterData: { [key: string]: number } = {};

        switch (filter) {
            case "crop":
                filterData = this.crops;
                break;
            case "institution":
                filterData = this.organizations;
                break;
            default:
                filterData = {};
        }

        return Object.keys(filterData).map((key) => ({
            name: key,
            value: filterData[key],
        }));
    }

    static countCrops(data: DataFormat[]) {
        const cropCount: { [key: string]: number } = {};

        data.forEach(item => {
            const crop = item.pr_primary_crop;
            cropCount[crop] = (cropCount[crop] || 0) + 1;
        });

        this.crops = this.sortObjectByValue(cropCount);
    }

    static countOrganizations(data: DataFormat[]) {
        const predefinedInstitutions = new Set([
            "AGROSAVIA",
            "AUGURA",
            "ASBAMA",
            "ASOHOFRUCOL",
            "CENICAFE",
            "CENICAÑA",
            "CIAT (Alianza Bioversity-CIAT)",
            "CIPAV",
            "CIMMYT",
            "FEDEARROZ",
            "FEDEGAN",
            "FEDEPANELA",
            "FEDEPAPA",
            "FENALCE",
            "FEDECAFE",
            "ASOCAÑA",
            "MADR",
            "ADR",
            "No está vinculado a ningún gremio"
        ]);

        const organizationCount: { [key: string]: number } = {
            Otras: 0,
        };

        data.forEach(item => {
            const gremio = item.gremio;
            if (predefinedInstitutions.has(gremio)) {
                organizationCount[gremio] = (organizationCount[gremio] || 0) + 1;
            } else {
                organizationCount["Otras"] += 1;
            }

        });

        this.organizations = this.sortObjectByValue(organizationCount);
    }

    static sortObjectByValue(obj: { [key: string]: number }) {
        return Object.entries(obj)
            .sort(([, a], [, b]) => b - a)
            .reduce((sortedObj, [key, value]) => {
                sortedObj[key] = value;
                return sortedObj;
            }, {} as { [key: string]: number });
    }
}

export default RegisteredController;