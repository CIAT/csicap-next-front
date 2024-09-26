"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { NextPage } from "next";
// import styles from "./reports.module.css";

const options = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
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
