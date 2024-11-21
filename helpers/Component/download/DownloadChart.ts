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