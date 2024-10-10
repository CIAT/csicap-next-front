import React from "react";
import { MapSelect } from "@/components/MapSelect/MapSelect";
import style from "./mapFilter.module.css";
import {MapFilterProps} from "@/interfaces/Components/MapFilter";

const MapFilter: React.FC<MapFilterProps> = ({
                                                 setShowFilter,
                                                 filterEvents,
                                                 axesState,
                                                 cropState,
                                                 cityState,
                                                 sectionState,
                                                 setSectionState
                                             }) => {

    const handleReset = () => {
        setSectionState(() => {
            const newState = {
                axe: "",
                crop: "",
                city: ""
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
                    Filtro
                </div>
                <button className={style["close-button"]} onClick={() => setShowFilter(prev => !prev)}>
                    <img className={style["close-image"]} src="/cross-svgrepo-com.png" alt="Close"/>
                </button>
            </div>
            <div className={style["select-container"]}>
                <div className={style["select-title"]}>
                    <div>
                        Eje
                    </div>
                    <button className={style["select-clear"]} onClick={() => setSectionState(prev => ({ ...prev, axe: "" }))}>
                        Limpiar
                    </button>
                </div>
                <MapSelect
                    options={{values: axesState, names: axesState}}
                    selected={sectionState.axe}
                    setSelected={setSectionState}
                    atrName="axe"
                    id={"axe-filter"}
                    label="eje"
                />
                <div className={style["select-title"]}>
                    <div>
                        Cultivo
                    </div>
                    <button className={style["select-clear"]} onClick={() => setSectionState(prev => ({ ...prev, crop: "" }))}>
                        Limpiar
                    </button>
                </div>
                <MapSelect
                    options={{values: cropState, names: cropState}}
                    selected={sectionState.crop}
                    setSelected={setSectionState}
                    atrName="crop"
                    id={"crop-filter"}
                    label="cultivo"
                />
                <div className={style["select-title"]}>
                    <div>
                        Municipio
                    </div>
                    <button className={style["select-clear"]} onClick={() => setSectionState(prev => ({ ...prev, city: "" }))}>
                        Limpiar
                    </button>
                </div>
                <MapSelect
                    options={{values: cityState, names: cityState}}
                    selected={sectionState.city}
                    setSelected={setSectionState}
                    atrName="city"
                    id={"city-filter"}
                    label="municipio"
                />
            </div>
            <div className={style["popup-footer"]}>
                <button className={`${style["popup-footer-button"]} ${style["reset-button"]}`} onClick={handleReset}>
                    Restaurar
                </button>
                <button className={`${style["popup-footer-button"]} ${style["apply-button"]}`} onClick={handleApply}>
                    Aplicar
                </button>
            </div>
        </div>
    );
};

export default MapFilter;