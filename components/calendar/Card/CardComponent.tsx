import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
} from "@nextui-org/react";
import { NextPage } from "next";

interface ChartCardComponentProps {
    title: string;
    children: React.ReactNode;
    header: React.ReactNode;
    style: { [key: string]: string };
}

const CardComponent: NextPage<ChartCardComponentProps> = ({
        title,
        children,
        header,
        style
    }) => {
    return (
        <div className="justify-center w-full h-full">
            <Card className="w-full h-full">
                <CardHeader className={style.chart_card_header}>
                    <p className="text-md text-black font-serif">{title}</p>
                    <div className={style.header_right}>{header}</div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className={style.card_body}>
                        {/* <DoughnutChart data={data}/> */}
                        {children}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardComponent;