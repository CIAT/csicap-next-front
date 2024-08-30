import style from "./table.module.css";
import { GenericObject } from "../../../interfaces";
import { keyExtractor } from "../../../helpers";

export function Table({ data }: { data: GenericObject[] }) {
  const heads = keyExtractor(data[0]).slice(12,-9);
  return (
    <div className={style["tableContainer"]}>
      <table className={style["dataTable"]}>
        <thead className={style["dataHead"]}>
          <tr className={style["dataRow"]}>{heads.map((head, idx) => (<th key={idx} className={style["dataTitle"]}>{head}</th>))}</tr>
        </thead>
        <tbody className={style["dataBody"]}>
          {data.map((item: any, idx) => (<tr key={idx} className={style["dataRow"]}>{heads.map((head, idx2) => (<td key={idx2} className={style["dataCell"]}>{item[head]}</td>))}</tr>))}
        </tbody>
      </table>
    </div>
  );
};