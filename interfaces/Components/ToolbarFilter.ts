import React from "react";
import { sectionStateData } from "@/interfaces";

export interface ToolbarFilterProps {
    axesState: string[];
    cropState: string[];
    provinceState: string[];
    sectionState: any;
    setSectionState: React.Dispatch<React.SetStateAction<any>>;
    filterEvents: (newState: sectionStateData) => void;
}