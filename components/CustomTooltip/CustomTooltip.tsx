import React from "react";
import Select from "react-select";
import { Button } from "@mui/material";

interface MultiSelectProps<T> {
    options: Array<Array<T>>;
    values: Array<T | null>;
    onChange: (selectedOption: string, filterType: string) => void;
    onClick: () => void;
    onReset: () => void;
    placeholders: Array<string>;
    filterTypes: Array<string>;
    getOptionLabel?: (option: T) => string;
    getOptionValue?: (option: T) => string;
}

const CustomTooltip = <T,>({
                               options,
                               values,
                               onChange,
                               onClick,
                               onReset,
                               placeholders,
                               filterTypes,
                               getOptionLabel = (option) => String(option),
                               getOptionValue = (option) => String(option),
                           }: MultiSelectProps<T>) => {
    return (
        <div>
            {options.map((selectOptions, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <Select
                        options={selectOptions}
                        value={values[index]}
                        onChange={(selectedOption) => {
                            const selectedValue = selectedOption
                                ? getOptionValue(selectedOption)
                                : '';
                            console.log(selectedValue)
                            onChange(selectedValue, filterTypes[index]);
                        }}
                        getOptionLabel={getOptionLabel}
                        getOptionValue={getOptionValue}
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