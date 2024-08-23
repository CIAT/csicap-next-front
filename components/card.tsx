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

interface CardComponentProps {
  title: string;
  children: React.ReactNode;
}


const CardComponent: NextPage<CardComponentProps> = ({title,children}) =>{


    return(
        <div className={styles.card}>
        <Card className="w-full h-full">
          <CardHeader className="flex">
            <div className="flex flex-col">
              <p className="text-md text-black font-serif">{title}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex w-full h-full items-center" >
            {children}
            </div>
          </CardBody>
          <Divider />
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
}

export default CardComponent;