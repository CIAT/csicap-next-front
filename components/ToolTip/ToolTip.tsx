import React from "react";
import SelectNetwork from "@/components/Select/SelectNetwork";
import YearsSlider from "@/components/YearSlider/YearSlider";
import styles from "./tool.module.css";

interface FiltersPanelProps {
  placeHolder1?: string;
  placeHolder2?: string;
  select1Options: { value: string; label: string }[];
  select2Options: { value: string; label: string }[];
  selectedSelect1: string | null;
  selectedSelect2: string | null;
  setSelectedSelect1: (value: string | null) => void;
  setSelectedSelect2: (value: string | null) => void;
  sliderValues: number[];
  setSliderValues: (values: number[]) => void;
  handleSelect1Change: (value: string) => void;
  handleApply: () => void;
  handleReset: () => void;
}

const ToolTip: React.FC<FiltersPanelProps> = ({
  placeHolder1 = "Select an option for the filter",
  placeHolder2 = "Select an option for the filter",
  select1Options,
  select2Options,
  selectedSelect1,
  selectedSelect2,
  setSelectedSelect1,
  setSelectedSelect2,
  sliderValues,
  setSliderValues,
  handleSelect1Change,
  handleApply,
  handleReset,
}) => {
  return (
    <div className={styles.toolTip}>
      <div className={styles.selectDiv}>
        <div className={styles.selects}>
          <SelectNetwork
            className={styles.selectStyle}
            options={select1Options}
            onChange={(selected) => {
              const value = selected?.value || null;
              setSelectedSelect1(value);
              if (value) {
                handleSelect1Change(value);
              }
            }}
            value={
              selectedSelect1
                ? select1Options.find((opt) => opt.value === selectedSelect1)
                : null
            }
            placeholder={placeHolder1}
          />
          <SelectNetwork
            className={styles.selectStyle}
            options={select2Options}
            onChange={(selected) => {
              const value = selected?.value || null;
              setSelectedSelect2(value);
            }}
            value={
              selectedSelect2
                ? select2Options.find((opt) => opt.value === selectedSelect2)
                : null
            }
            placeholder={placeHolder2}
          />
        </div>
        <div className={styles.yearSlider}>
          <YearsSlider
            values={sliderValues}
            setValues={setSliderValues}
            min={1971}
            max={2024}
          />
        </div>
        <div className={styles.buttonDiv}>
          <button className={styles.buttons} onClick={handleApply}>
            Apply
          </button>
          <button className={styles.buttons} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
