import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";

// Function to get report data by ID
async function getReportData(reportId: string) {
  const decodedReportId = decodeURIComponent(reportId);
  const dataset = await ReportsRepository.fetchEventById(decodedReportId);

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    throw new Error("Report data not found");
  }

  return dataset.data[0]; // Only take the first object in the 'data' array
}

// Function to wrap text if it's longer than the allowed width
function splitTextIntoLines(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

// Function to replace unsupported characters
function replaceUnsupportedCharacters(text: string) {
  return text.replace(/–/g, "-"); // Replace en dash with a hyphen
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let reportId = searchParams.get("reportId");

  if (!reportId) {
    return new NextResponse("Report ID not provided", { status: 400 });
  }

  try {
    // Get report data by ID
    const reportData = await getReportData(reportId);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Page and font settings
    const fontSize = 12;
    const pageHeight = 800;
    const maxWidth = 500;
    let yPosition = pageHeight - 100;

    // Function to add a new page and reset yPosition
    function addNewPage() {
      const page = pdfDoc.addPage([600, pageHeight]);
      yPosition = pageHeight - 100;
      return page;
    }

    let page = addNewPage();

    // Helper function to process each field value
    function formatValue(value: string | string[] | undefined): string {
      if (!value) return "N/A";
      const processedValue = Array.isArray(value) ? value.join(", ") : value;
      return replaceUnsupportedCharacters(processedValue);
    }

    // Title of the PDF
    page.drawText("Event Report", {
      x: 50,
      y: yPosition,
      size: 24,
      font: timesBoldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    const fieldsToPrint = [
      { label: "Nombre", value: reportData.name },
      { label: "Fecha de inicio", value: reportData.date },
      { label: "Fecha de finalización", value: reportData.datesEnd },
      { label: "Provincia", value: reportData.province },
      { label: "Ciudad", value: reportData.city },
      { label: "Justificación del evento", value: reportData.event_justification },
      { label: "Correo electrónico", value: reportData.email },
      { label: "Número de participantes", value: reportData.participant_count },
      { label: "Participantes femeninos", value: reportData.female_participants },
      { label: "Participantes masculinos", value: reportData.male_participants },
      { label: "Participantes de otro género", value: reportData.other_participants },
      { label: "Actividades del GCF", value: reportData.gcf_activities },
      { label: "Componentes", value: reportData.component },
      { label: "Eje", value: reportData.eje },
      { label: "Tipo de suposición", value: reportData.guess_type },
      { label: "Ocupación principal", value: reportData.main_occupation_without_other },
      { label: "Objetivo del evento", value: reportData.event_objective },
      { label: "Tipo de evento", value: reportData.event_type },
      { label: "Participantes invitados", value: reportData.invited_participants_number },
      { label: "Conclusión", value: reportData.conclusion },
      { label: "Responsable", value: reportData.responsable },
      { label: "Institución", value: reportData.institution },
      { label: "Cosecha", value: reportData.crop },
    ];

    // Print the fields on the PDF with line wrapping
    fieldsToPrint.forEach((item) => {
      const labelText = `${item.label}: `;
      const valueText = formatValue(item.value);

      const labelLines = splitTextIntoLines(labelText, timesBoldFont, fontSize, maxWidth);
      const valueLines = splitTextIntoLines(valueText, timesRomanFont, fontSize, maxWidth);

      if (yPosition - (labelLines.length + valueLines.length) * 20 < 0) {
        page = addNewPage();
      }

      // Draw label lines (bold)
      labelLines.forEach((line) => {
        page.drawText(line, { x: 50, y: yPosition, size: fontSize, font: timesBoldFont, color: rgb(0, 0, 0) });
        yPosition -= 20;
      });

      // Draw value lines
      valueLines.forEach((line) => {
        page.drawText(line, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
        yPosition -= 20;
      });

      yPosition -= 10; // Extra space between fields
    });

    // Finalize the PDF and return it
    const pdfBytes = await pdfDoc.save();
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=report_${reportId}.pdf`,
    });

    return new NextResponse(pdfBytes, { headers });
  } catch (error) {
    return new NextResponse(`Error: ${(error as Error).message}`, { status: 500 });
  }
}
