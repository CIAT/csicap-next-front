import {
    Card,
    CardBody,
    CardHeader,
    Divider
} from "@nextui-org/react";
import React, {ReactNode} from "react";
import styles from "../../../app/assistance/assistance.module.css";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";

interface CardProps {
    title: string;
    children: ReactNode;
    id?: string;
    data?: string[];
}

const CardComponent: React.FC<CardProps> = ({title, children, id, data }) => {
    return (
        <div className={styles.card}>
            <Card className={styles.card_container}>
                <CardHeader className={styles.card_header}>
                    <div className={styles.header}>
                        <p className="text-md text-black font-serif">{title}</p>
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