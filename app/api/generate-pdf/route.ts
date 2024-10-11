// /app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Simulated "database" of reports (just like in the DOCX route)
const reports = [
  {
    id: "1",
    data: [
      { key: "main_event_objective", label: "Objetivo", value: "Aumentar la conciencia sobre la sostenibilidad" },
      { key: "event_type", label: "Tipo de taller o capacitación", value: "Taller" },
      { key: "event_justification", label: "Justificación", value: "Necesidad de educar a la comunidad" },
      { key: "guest_type", label: "Tipo de invitados", value: "Expertos en sostenibilidad" },
      { key: "invited_participants_number", label: "No. Invitados", value: 50 },
      // ... other fields
    ],
  },
  {
    id: "2",
    data: [
      { key: "main_event_objective", label: "Objetivo", value: "Mejorar la calidad del agua" },
      { key: "event_type", label: "Tipo de taller o capacitación", value: "Capacitación" },
      { key: "event_justification", label: "Justificación", value: "Fomentar la protección de los recursos hídricos" },
      { key: "guest_type", label: "Tipo de invitados", value: "Expertos en agua" },
      { key: "invited_participants_number", label: "No. Invitados", value: 100 },
      // ... other fields
    ],
  },
];

// Function to get report data by ID (similar to DOCX route)
async function getReportData(reportId: string) {
  const report = reports.find((r) => r.id === reportId);
  if (!report) {
    throw new Error("Report not found");
  }
  return report.data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("reportId");

  if (!reportId) {
    return new NextResponse("Report ID not provided", { status: 400 });
  }

  const reportData = await getReportData(reportId);

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Embed a font
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Add a page to the document
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  const fontSize = 12;

  // Title for the PDF
  page.drawText('Event Report', {
    x: 50,
    y: height - 50,
    size: 24,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Add the report data (dynamically)
  let yPosition = height - 100;
  reportData.forEach((item) => {
    page.drawText(`${item.label}: ${item.value}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20; // Adjust vertical spacing for each entry
  });

  // Finalize the PDF and get it as a byte array
  const pdfBytes = await pdfDoc.save();

  // Set the headers for downloading the PDF
  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=report_${reportId}.pdf`,
  });

  // Return the PDF as a response
  return new NextResponse(pdfBytes, { headers });
}
