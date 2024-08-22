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
import styles from "../pages/events.module.css";

interface ChartCardComponentProps {
  title: string;
  children: React.ReactNode;
}


const ChartCardComponent: NextPage<ChartCardComponentProps> = ({title,children}) =>{


    return(
        <div className="justify-center w-full h-full">
        <Card className="w-full h-full">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md text-black font-serif">{title}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="w-full h-full" >
            {/* <DoughnutChart data={data}/> */}
            {children}
            </div>
          </CardBody>
          <Divider />
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
}

export default ChartCardComponent;