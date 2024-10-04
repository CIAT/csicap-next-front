import {EventsData, sectionStateData} from "@/interfaces";

export interface MapComponentProps {
    data: Record<string, string>;
    polygons: string[];
    filterData: (newState: sectionStateData) => void;
}