import React from "react";
import {sectionStateData} from "@/interfaces";

export interface MapFilterProps {
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
    filterEvents: (newState: sectionStateData) => void;
    axesState: string[];
    cropState: string[];
    provinceState: string[];
    sectionState: {
        axe: string;
        crop: string;
        province: string;
    };
    setSectionState: React.Dispatch<React.SetStateAction<{
        axe: string;
        crop: string;
        province: string;
    }>>;
}