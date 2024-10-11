"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { NextPage } from "next";
// import styles from "./reports.module.css";

const options = [
  { key: "1", label: "Evento 12312431" },
  { key: "2", label: "Evento 232342" },
];

const Filter: NextPage = () => {
  return (
    <div className="w-full">
      <Select label="Reportes" placeholder="Elije un reporte" selectionMode="single" className="max-w-xs">
        {options.map((option) => {
          return (
            <SelectItem key={option.key}>
              {option.label}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};


export default Filter;
