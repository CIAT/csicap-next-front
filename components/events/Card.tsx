import {
    Card,
    CardHeader,
    CardBody,
    Divider,
  } from "@nextui-org/react";
import { NextPage } from "next";
import styles from "../components.module.css";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";
import React from "react";

interface CardComponentProps {
  title: string;
  id?: string;
  data?: string[];
  children: React.ReactNode;
}


const CardComponent: NextPage<CardComponentProps> = ({title, id, data, children = null}) =>{
    return(
        <div className={styles.card}>
        <Card className="w-full h-full">
          <CardHeader className={styles.card_header}>
            <div className={styles.header}>
              <p className="text-md text-black font-serif">{title}</p>
                <div className={styles.header_right}>
                    <ExportDropdown
                        chartId={id}
                        chartData={data}
                    />
                </div>
            </div>
          </CardHeader>
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

export default CardComponent;
