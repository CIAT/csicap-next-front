"use client";

// import { Select, SelectItem } from "@nextui-org/react";
import { NextPage } from "next";
import styles from "./reports.module.css";
import Filter from "@/components/reports/Filter";
import SemiHeader from "@/components/static/SemiHeader";
// import CardComponent from "@/components/events/Card";
import PreviewCard from "@/components/reports/PreviewCard";
import ColombiaHeat from "@/components/maps/ColombiaHeat";

const ReportsPage: NextPage = () => {
  return (
    <div className="h-screen flex flex-row">
      <div className={styles.first_div}>
        <div className={styles.filter_div}>
          <Filter />
        </div>
        <div className={styles.preview_div}>
          <PreviewCard>
            <></>
          </PreviewCard>
        </div>
      </div>

      <div className={styles.second_div}>
        <ColombiaHeat />
      </div>
    </div>
  );
};

export default ReportsPage;
