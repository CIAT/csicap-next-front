import React from "react";
import { MapSelect } from "@/components/MapSelect/MapSelect";
import style from "./mapFilter.module.css";
import {MapFilterProps} from "@/interfaces/Components/MapFilter";

const MapFilter: React.FC<MapFilterProps> = ({
    setShowFilter,
    filterEvents,
    axesState,
    cropState,
    provinceState,
    sectionState,
    setSectionState
   }) => {

    const handleReset = () => {
        setSectionState(() => {
            const newState = {
                axe: "",
                crop: "",
                province: ""
            };
            filterEvents(newState);
            return newState;
        });
        setShowFilter(prev => !prev);
    };

    const handleApply = () => {
        filterEvents(sectionState);
        setShowFilter(prev => !prev);
    };

    return (
        <div className={style["filter-popup"]}>
            <div className={style["popup-title"]}>
                <div>
                    Filter
                </div>
                <button className={style["close-button"]} onClick={() => setShowFilter(prev => !prev)}>
                    <img className={style["close-image"]} src="/images/Calendar/x.png" alt="Close"/>
                </button>
            </div>
            <div className={style["select-container"]}>
                <div className={style["select-title"]}>
                    <div>
                        Eje
                    </div>
                    <button className={style["select-clear"]} onClick={() => setSectionState(prev => ({ ...prev, axe: "" }))}>
                        Clear
                    </button>
                </div>
                <MapSelect
                    options={{values: axesState, names: axesState}}
                    selected={sectionState.axe}
                    setSelected={setSectionState}
                    atrName="axe"
                    id={"axe-filter"}
                />
                <div className={style["select-title"]}>
                    <div>
                        Cultivo
                    </div>
                    <button className={style["select-clear"]} onClick={() => setSectionState(prev => ({ ...prev, crop: "" }))}>
                        Clear
                    </button>
                </div>
                <MapSelect
                    options={{values: cropState, names: cropState}}
                    selected={sectionState.crop}
                    setSelected={setSectionState}
                    atrName="crop"
                    id={"crop-filter"}
                />
                <div className={style["select-title"]}>
                    <div>
                        Departamento
                    </div>
                    <button className={style["select-clear"]} onClick={() => setSectionState(prev => ({ ...prev, province: "" }))}>
                        Clear
                    </button>
                </div>
                <MapSelect
                    options={{values: provinceState, names: provinceState}}
                    selected={sectionState.province}
                    setSelected={setSectionState}
                    atrName="province"
                    id={"province-filter"}
                />
            </div>
            <div className={style["popup-footer"]}>
                <button className={`${style["popup-footer-button"]} ${style["reset-button"]}`} onClick={handleReset}>
                    Reset
                </button>
                <button className={`${style["popup-footer-button"]} ${style["apply-button"]}`} onClick={handleApply}>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default MapFilter;