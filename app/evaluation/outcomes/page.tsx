"use client"

import {NextPage} from "next";
import {TableComponent} from "@/components/table/TableComponent";
import {outcomesPageContent} from "@/helpers/content/IndicatorsContent";
import styles from "../evaluation.module.css";

const OutcomesPage: NextPage = ({}) => {
    return(
        <div className={styles.container}>
            <div className={styles.title_page}>
                Indicadores de resultados
            </div>
            <div>
                <TableComponent
                    style={styles.table}
                    data={outcomesPageContent}
                />
            </div>
        </div>
    );
}

export default OutcomesPage;