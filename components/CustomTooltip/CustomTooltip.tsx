import React, {useState} from "react";
import Select from "react-select";
import styles from "./tooltip.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MultiSelectProps<T> {
  options: Array<Array<T>>;
  values: Array<T | null>;
  onChange: (selectedOption: string, filterType: string) => void;
  onClick: () => void;
  onReset: () => void;
  placeholders: Array<string>;
  filterTypes: Array<string>;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;
  useDate?: boolean;
}

const CustomTooltip = <T,>({
  options,
  values,
  onChange,
  onClick,
  onReset,
  placeholders,
  filterTypes,
  getOptionLabel = (option) => String(option),
  getOptionValue = (option) => String(option),
  useDate = false
}: MultiSelectProps<T>) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;


  console.log(new Date(dateRange[0]!).toLocaleDateString("es"));

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", gap: "1vw",width:"85%" }}>
        {options.map((selectOptions, index) => (
          <div key={index} style={{maxWidth:"15%", minWidth:"10%"}}>
            <Select
              options={selectOptions}
              value={values[index]}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption
                  ? getOptionValue(selectedOption)
                  : "";
                onChange(selectedValue, filterTypes[index]);
              }}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              placeholder={placeholders[index]}
              isSearchable
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </div>
        ))}
        {
          useDate && (
              <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat={"dd/MM/YYYY"}
                  locale={"es-"}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  placeholderText="Fecha"
              />
            )
        }
      </div>
      <div style={{width:"15%"}}>
        <button onClick={onClick} className={styles.button}>
          Aplicar
        </button>
        <button onClick={onReset} className={styles.button}>
          Restaurar
        </button>
      </div>
    </div>
  );
};

export default CustomTooltip;
