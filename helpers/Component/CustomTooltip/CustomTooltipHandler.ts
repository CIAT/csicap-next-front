import { CustomTooltipData } from "@/interfaces/Components/CustomTooltip";
import React from "react";

// Función para manejar los cambios del tooltip
export const handleTooltipChange = <T,>(
    selectedValue: string,
    filterType: string,
    formattedItems: T[],
    setTooltipStates: Array<React.Dispatch<React.SetStateAction<CustomTooltipData[]>>>,
    tooltipValues: CustomTooltipData[],
    setTooltipValues: React.Dispatch<React.SetStateAction<CustomTooltipData[]>>,
    filterFunctions: Record<string, (items: T[], value: string) => T[]>,
    uniqueValuesFunctions: ((items: T[]) => CustomTooltipData[])[],
    filterTypes: string[]
) => {
    // Filtrar elementos según el filtro seleccionado
    const filteredItems =
        filterFunctions[filterType]?.(formattedItems, selectedValue) || formattedItems;

    // Actualizar los estados de los tooltips
    updateTooltipStates(filteredItems, setTooltipStates, uniqueValuesFunctions);

    // Actualizar el valor seleccionado del filtro actual
    const updatedTooltipValues = tooltipValues.map((tooltip, index) => {
        const currentFilterType = filterTypes[index];
        if (currentFilterType === filterType) {
            return { label: selectedValue, value: selectedValue };
        }
        return tooltip;
    });

    // Asegurarnos de que el estado de tooltipValues se actualice correctamente
    setTooltipValues(updatedTooltipValues);
};

// Función para manejar el reset
export const handleReset = <T,>(
    allData: T[],
    setTooltipStates: Array<React.Dispatch<React.SetStateAction<CustomTooltipData[]>>>,
    setTooltipValues: React.Dispatch<React.SetStateAction<CustomTooltipData[]>>,
    setTempData: React.Dispatch<React.SetStateAction<T[]>>,
    uniqueValuesFunctions: ((items: T[]) => CustomTooltipData[])[],
    placeholders: string[]
) => {
    // Restaurar los datos originales
    setTempData(allData);

    // Actualizar los estados de los tooltips con los valores originales
    updateTooltipStates(allData, setTooltipStates, uniqueValuesFunctions);

    // Resetear los valores de los filtros seleccionados y restaurar placeholders
    setTooltipValues(
        placeholders.map((placeholder) => ({
            label: placeholder,
            value: "",
        }))
    );
};

// Función para manejar el clic en los filtros
export const handleOnClick = <T,>(
    tooltipValues: CustomTooltipData[],
    allData: T[],
    setTempData: React.Dispatch<React.SetStateAction<T[]>>,
    filterFunctions: Record<string, (data: T[], value: string) => T[]>,
    filterTypes: string[]
) => {
    let filteredData = [...allData];

    // Aplicar los filtros uno por uno
    tooltipValues.forEach((tooltip, index) => {
        const filterType = filterTypes[index];
        if (tooltip.value && filterFunctions[filterType]) {
            filteredData = filterFunctions[filterType](filteredData, tooltip.value);
        }
    });

    // Establecer los datos filtrados
    setTempData(filteredData);
};

// Función para actualizar los estados de los tooltips
const updateTooltipStates = <T,>(
    items: T[],
    setTooltipStates: Array<React.Dispatch<React.SetStateAction<CustomTooltipData[]>>>,
    uniqueValuesFunctions: ((items: T[]) => CustomTooltipData[])[]
) => {
    const updatedTooltipStates = uniqueValuesFunctions.map((fn) => fn(items));
    updatedTooltipStates.forEach((values, index) => {
        try {
            setTooltipStates[index](values);
        } catch (error) {
            console.error(`Error updating tooltip state at index ${index}:`, error);
        }
    });
};