"use client"

import {NextPage} from "next";
import {TableComponent} from "@/components/table/TableComponent";
import {performancePageContent} from "@/helpers/content/IndicatorsContent";
import styles from "../evaluation.module.css";

const PerformancePage: NextPage = ({}) => {
    return(
        <div className={styles.container}>
            <div className={styles.title_page}>
                Indicadores de ejecución
            </div>
            <div>
                <TableComponent
                    style={styles.table}
                    data={performancePageContent}
                />
            </div>
        </div>
    );
}

export default PerformancePage;