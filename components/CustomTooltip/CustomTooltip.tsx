import React from "react";
import Select from "react-select";
import { Button } from "@mui/material";
import { CustomTooltipData } from "@/interfaces/Components/CustomTooltip";

interface MultiSelectProps {
    options: Array<Array<CustomTooltipData>>;
    values: Array<CustomTooltipData | null>;
    onChange: (
        selectedOption: string,
        filterType: string
    ) => void;
    onClick: () => void;
    onReset: () => void;
    placeholders: Array<string>;
    filterTypes: Array<string>;
}

const CustomTooltip: React.FC<MultiSelectProps> = ({
                                                       options,
                                                       values,
                                                       onChange,
                                                       onClick,
                                                       onReset,
                                                       placeholders,
                                                       filterTypes,
                                                   }) => {
    return (
        <div>
            {options.map((selectOptions, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <Select
                        options={selectOptions}
                        value={values[index]}
                        onChange={(selectedOption) => {
                            const selectedValue = selectedOption ? selectedOption.value : '';
                            onChange(selectedValue, filterTypes[index]);
                        }}
                        placeholder={placeholders[index]}
                        isSearchable
                    />
                </div>
            ))}
            <div>
                <Button onClick={onClick}>Aplicar</Button>
                <Button onClick={onReset}>Restaurar</Button>
            </div>
        </div>
    );
};


export default CustomTooltip;