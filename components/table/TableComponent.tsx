import React from "react";
import {StyleProps} from "@react-types/shared";
import styles from "./tableComponent.module.css";

type TableComponentProps = {
    data: Record<string, string[]>;
    style?: string
};

export const TableComponent: React.FC<TableComponentProps> = ({ data, style = "" }) => {
    const columnTitles = Object.keys(data);
    const rowCount = Math.max(...Object.values(data).map((values) => values.length));

    return (
        <div className={`${styles.table_wrapper} ${style}`}>
            <table className={`${styles.table} ${styles.border}`}>
                <thead>
                <tr>
                    {columnTitles.map((title) => (
                        <th key={title} className={`${styles.title} ${styles.inside_border}`}>
                            {title}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {columnTitles.map((title) => (
                            <td key={title} className={`${styles.body} ${styles.inside_border}`}>
                                {data[title][rowIndex] || ""}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};