import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";

// Function to fetch report data by ID
async function getReportData(reportId: string) {
  const decodedReportId = decodeURIComponent(reportId);
  const dataset = await ReportsRepository.fetchEventById(decodedReportId);

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    throw new Error("Report data not found");
  }

  return dataset.data[0];
}

// Capitalize the first letter of each header key
function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("reportId");

  if (!reportId) {
    return new NextResponse("Report ID not provided", { status: 400 });
  }

  try {
    const reportData = await getReportData(reportId);

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Event Report", bold: true, size: 28 })],
              spacing: { after: 300 },
            }),
            ...Object.entries(reportData).map(([key, value]) => {
              const capitalizedKey = capitalizeFirstLetter(key);
              const valueText = Array.isArray(value) ? value.join(", ") : value || "N/A";
              return new Paragraph({
                children: [
                  new TextRun({ text: `${capitalizedKey}: `, bold: true }),
                  new TextRun({ text: valueText.toString() }),
                ],
                spacing: { after: 200 },
              });
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    const headers = new Headers({
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=report_${reportId}.docx`,
    });

    return new NextResponse(buffer, { headers });
  } catch (error) {
    return new NextResponse(`Error: ${(error as Error).message}`, { status: 500 });
  }
}
