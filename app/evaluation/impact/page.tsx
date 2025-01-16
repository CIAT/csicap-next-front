"use client"

import {NextPage} from "next";
import {TableComponent} from "@/components/table/TableComponent";
import {impactPageContent} from "@/helpers/content/impactPage";
import styles from "../evaluation.module.css";

const ImpactPage: NextPage = ({}) => {
    return(
        <div className={styles.container}>
            <div className={styles.title_page}>
                Indicadores de impacto
            </div>
            <div>
                <TableComponent
                    style={styles.table}
                    data={impactPageContent}
                />
            </div>
        </div>
    );
}

export default ImpactPage;