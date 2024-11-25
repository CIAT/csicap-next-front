import {EventsData, sectionStateData} from "@/interfaces";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";

export interface MapComponentProps {
    id?: string;
    data: NestedDictionary;
    polygons: string[][] | string[];
    useQuintile?: boolean;
    filterData?: (newState: sectionStateData) => void;
}