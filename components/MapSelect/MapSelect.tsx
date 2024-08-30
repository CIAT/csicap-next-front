import React, { FC } from "react";
import styles from "./mapSelect.module.css";
import { MapSelectInterface } from "@/interfaces";

export const MapSelect: FC<MapSelectInterface> = ({ options={ values: [], names: []}, selected, setSelected, atrName, id=undefined }) => {
    const { values, names } = options;
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected( (prevState: Record<string, any>) => ({
            ...prevState,
            [atrName]: e.target.value
        }));
    };
    return (
        <select
            value={selected}
            onChange={handleSelect}
            className={styles["select-filter"]}
            id={id}
        >
            <option value="" disabled selected>Select {atrName}</option>
            {
                (values.length != names.length) ? <option>No option</option> :
                    (
                        values.map((value: number | string, index: number) => <option key={value}
                                                                                      value={value}>{names[index]}</option>)
                    )
            }
        </select>
    );
};