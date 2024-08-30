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
import styles from "../components.module.css";

interface ChartCardComponentProps {
  title: string;
  children: React.ReactNode;
  header: React.ReactNode;
}

const ChartCardComponent: NextPage<ChartCardComponentProps> = ({
  title,
  children,
  header,
}) => {
  return (
    <div className="justify-center w-full h-full">
      <Card className="w-full h-full">
        <CardHeader className={styles.chart_card_header}>
            <p className="text-md text-black font-serif">{title}</p>
            <div className={styles.header_right}>{header}</div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="w-full h-full">
            {/* <DoughnutChart data={data}/> */}
            {children}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ChartCardComponent;
