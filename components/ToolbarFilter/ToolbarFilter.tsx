import React, { useState } from "react";
import style from "../CustomToolbar/toolbar.module.css";
import { sectionStateData } from "@/interfaces";
import MapFilter from "@/components/MapFilter/MapFilter";
import { ToolbarFilterProps } from "@/interfaces/Components/ToolbarFilter";

const ToolbarFilter: React.FC<ToolbarFilterProps> = ({
    axesState,
    cropState,
    cityState,
    sectionState,
    setSectionState,
    filterEvents
}) => {

    const [isHiddenFilter, setShowFilter] = useState(true);

    const toggleFilter = () => {
        setShowFilter(prev => !prev);
    };

    return (
        <div>
            <button className={`${style["button"]} ${style["filter-button"]}`} onClick={toggleFilter}>
                Filtro
            </button>
            <div hidden={isHiddenFilter} className={style["map-filter-container"]}>
                <MapFilter
                    filterEvents={(newState: sectionStateData) => filterEvents(newState)}
                    setShowFilter={setShowFilter}
                    axesState={axesState}
                    cropState={cropState}
                    cityState={cityState}
                    sectionState={sectionState}
                    setSectionState={setSectionState}
                />
            </div>
        </div>
    );
};

export default ToolbarFilter;