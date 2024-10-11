"use client";

import { NextPage } from "next";
import styles from "./reports.module.css";
import Filter from "@/components/reports/Filter";
import ColombiaHeat from "@/components/maps/ColombiaHeat";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const ReportsPage: NextPage = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the generated PDF from the API route
    const fetchPdf = async () => {
      try {
        const response = await fetch("/api/generate-pdf");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url); // Set the generated URL for the PDF
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "generated_report.pdf"; // Filename for the downloaded file
      link.click();
    }
  };

  return (
    <div className={styles.reports}>
      <div className={styles.first_div}>
        <div className={styles.filter_div}>
          <Filter />
          <div className="gap-2 flex flex-row">
            <Button variant="contained" onClick={downloadPdf} disabled={!pdfUrl}>
              PDF
            </Button>
            <Button variant="contained">Word</Button>
          </div>
        </div>
        <div className={styles.preview_div}>
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              width="100%"
              height="600"
              style={{ border: "none" }}
            />
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      </div>

      <div className={styles.second_div}>
        <ColombiaHeat />
      </div>
    </div>
  );
};

export default ReportsPage;
