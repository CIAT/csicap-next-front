import React, {useState} from "react";
import Select from "react-select";
import styles from "./tooltip.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getMonth, getYear} from "date-fns";
import {range} from "pdf-lib";

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
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const years = range(1990, getYear(new Date()) + 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

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
                  className={styles.customDatePicker}
                  renderCustomHeader={({
                                         date,
                                         changeYear,
                                         changeMonth,
                                         decreaseMonth,
                                         increaseMonth,
                                         prevMonthButtonDisabled,
                                         nextMonthButtonDisabled,
                                       }) => (
                      <div
                          style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                      >
                        <button
                            className={styles.calendar_button}
                            onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                          {"<"}
                        </button>
                        <select
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(Number(value))}
                        >
                          {years.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                          ))}
                        </select>

                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                        >
                          {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                          ))}
                        </select>

                        <button
                            className={styles.calendar_button}
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                  )}
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat={"dd/MM/YYYY"}
                  locale={"es"}
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