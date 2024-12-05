import {
    Card,
    CardBody,
    CardHeader,
    Divider
} from "@nextui-org/react";
import React, {ReactNode} from "react";
import styles from "@/components/components.module.css";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";

interface CardProps {
    styles: { [key: string]: string };
    title: string;
    children: ReactNode;
    id?: string;
    data?: string[];
}

const CardComponent: React.FC<CardProps> = ({ styles, title, children, id, data }) => {
    return (
        <div className={styles.card}>
            <Card className={styles.card_container}>
                <CardHeader className={styles.card_header}>
                    <div className={styles.header}>
                        <p className={` ${styles.text_black}`}>{title}</p>
                        {(id || data) && (
                            <ExportDropdown
                                chartId={id}
                                chartData={data}
                            />
                        )}
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div className={styles.flex_full}>
                        {children}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardComponent;