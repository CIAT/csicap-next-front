export interface SelectOptions {
    values: number[] | string[];
    names: string[];
}

export interface MapSelectInterface {
    options: SelectOptions;
    selected: number | string;
    setSelected: Function;
    atrName: string;
    id: string;
}