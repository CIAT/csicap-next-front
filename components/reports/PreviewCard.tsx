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

interface CardComponentProps {
  children: React.ReactNode;
}

const PreviewCard: NextPage<CardComponentProps> = ({children}) =>{


    return(
        <div className={styles.preview_card}>
        <Card className="w-full h-full">
          <Divider />
          <CardBody>
            <div className="flex w-full h-full items-center" >
            {children}
            </div>
          </CardBody>
        </Card>
      </div>
    );
}

export default PreviewCard;