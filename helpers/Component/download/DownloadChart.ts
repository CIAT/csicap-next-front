import {utils, writeFile} from "xlsx";

export const downloadChart = (chartId?: string) => {
    if(!chartId) { return }

    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${chartId}.png`;
        link.click();
    } else {
        console.error("No se pudo encontrar la referencia del gráfico.");
    }
};

export const downloadDataAsExcel = (data: any) => {
    try {
        const formattedData = transformDataForExcel(data);

        const worksheet = utils.json_to_sheet(formattedData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Datos");
        writeFile(workbook, "datos.xlsx");
    } catch (error) {
        console.error("Error al transformar los datos:", error);
    }
};

const transformDataForExcel = (data: any): Record<string, any>[] => {
    if (!data || !data.datasets || !Array.isArray(data.datasets)) {
        throw new Error("Formato de datos inválido");
    }

    const datasetTree = data.datasets[0];

    // Caso: Datos en formato `tree`
    if (datasetTree.tree && Array.isArray(datasetTree.tree)) {
        const result: { [key: string]: number } = {};
        datasetTree.tree.forEach((node: { name: string; value: number }) => {
            result[node.name] = node.value;
        });
        return [result];
    }

    // Caso: Datos en formato `labels` + `data`
    const { labels, datasets } = data;
    const dataset = datasets[0];

    if (labels && labels.length) {
        return [
            labels.reduce((acc: any, label: any, index: any) => {
                acc[label] = dataset.data[index] || 0;
                return acc;
            }, {} as { [key: string]: number }),
        ];
    }

    throw new Error("Estructura de datos no reconocida");
};