import {
    Card,
    CardBody,
    CardHeader,
    Divider
} from "@nextui-org/react";
import {ReactNode} from "react";

interface CardProps {
    styles: { [key: string]: string };
    title: string;
    children: ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ styles, title, children }) => {
    return (
        <div className={styles.card}>
            <Card className={styles.card_container}>
                <CardHeader className={styles.card_header}>
                    <div className={styles.flex_col}>
                        <p className={`${styles.text_md} ${styles.text_black}`}>{title}</p>
                    </div>
                </CardHeader>
                <Divider />
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