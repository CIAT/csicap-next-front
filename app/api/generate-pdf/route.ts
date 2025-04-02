import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";
import fs from "fs";
import path from "path";

// Function to get report data by ID
async function getReportData(reportId: string) {
  const dataset = await ReportsRepository.fetchEventById(reportId);

  if (!dataset || !dataset.data) {
    throw new Error("Report data not found");
  }

  return dataset.data;
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

// Function to replace unsupported characters without affecting tildes
function replaceUnsupportedCharacters(text: string) {
  return text.replace(/–/g, "-"); // Replace en dash only
}

// Function to add header image to the top of each page
async function addImageToHeader(pdfDoc: PDFDocument, page: any) {
  const imagePath = path.join(process.cwd(), "public", "pdf.png");
  const imageBytes = fs.readFileSync(imagePath);
  const embeddedImage = await pdfDoc.embedPng(imageBytes);

  const imageWidth = 250;
  const imageHeight = 100;
  const pageWidth = page.getWidth();

  page.drawImage(embeddedImage, {
    x: (pageWidth - imageWidth) / 2,
    y: page.getHeight() - imageHeight - 20,
    width: imageWidth,
    height: imageHeight,
  });
}

// Function to add an image footer to each page
async function addImageFooter(pdfDoc: PDFDocument, page: any) {
  const footerImagePath = path.join(process.cwd(), "public", "footer.png");
  const footerImageBytes = fs.readFileSync(footerImagePath);
  const embeddedFooterImage = await pdfDoc.embedPng(footerImageBytes);

  const imageWidth = 150; // Adjust width as needed
  const imageHeight = 100; // Adjust height as needed
  const pageWidth = page.getWidth();

  // Draw the footer image centered at the bottom
  page.drawImage(embeddedFooterImage, {
    x: (pageWidth - imageWidth) / 2,
    y: 0, // Position near the bottom of the page
    width: imageWidth,
    height: imageHeight,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("reportId");

  if (!reportId) {
    return new NextResponse("Report ID not provided", { status: 400 });
  }

  try {
    const reportData = await getReportData(reportId);
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const fontSize = 12;
    const pageHeight = 800;
    const maxWidth = 500;
    let yPosition = pageHeight - 150;
    const bottomMargin = 100; // Adjust based on footer image height and desired spacing

    function drawBulletPointText(
      page: any,
      text: string,
      font: any,
      fontSize: number
    ) {
      page.drawText(`• ${text}`, {
        x: 60, // Indented for the bullet point
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20; // Adjust line spacing as needed
    }

    // Modified addNewPage function
    function addNewPage() {
      const page = pdfDoc.addPage([600, pageHeight]);
      addImageToHeader(pdfDoc, page); // Add header image to each new page
      addImageFooter(pdfDoc, page); // Add footer image to each new page
      yPosition = pageHeight - 150;
      return page;
    }

    let page = addNewPage();

    // Helper function to process each field value
    function formatValue(value: string | string[] | undefined): string {
      if (!value) return "N/A";
      const processedValue = Array.isArray(value) ? value.join(", ") : value;
      return replaceUnsupportedCharacters(processedValue);
    }

    // Helper function to capitalize the first letter and make the rest lowercase
    function capitalizeFirstLetter(text: string) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    // Capitalize the name and wrap it if needed
    const titleText = capitalizeFirstLetter(
      replaceUnsupportedCharacters(reportData.name)
    );
    const titleLines = splitTextIntoLines(titleText, timesBoldFont, 24, 500);

    // Draw the title with wrapping
    titleLines.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 24,
        font: timesBoldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 30;
    });

    yPosition -= 10;

    const fieldsToPrint = [
      { label: "Fecha de inicio", value: reportData.date },
      { label: "Fecha de finalización", value: reportData.datesEnd },
      { label: "Departamento", value: reportData.province },
      { label: "Ciudad", value: reportData.city },
      {
        label: "Justificación del evento",
        value: reportData.event_justification,
      },
      { label: "Correo electrónico", value: reportData.email },
      { label: "Número de participantes", value: reportData.participant_count },
      {
        label: "Participantes femeninos",
        value: reportData.female_participants,
      },
      {
        label: "Participantes masculinos",
        value: reportData.male_participants,
      },
      {
        label: "Participantes de otro género",
        value: reportData.other_participants,
      },
      { label: "Actividades del GCF", value: reportData.gcf_activities },
      { label: "Componentes", value: reportData.component },
      { label: "Eje(s)", value: reportData.eje },
      { label: "Tipo de invitado", value: reportData.guess_type },
      {
        label: "Ocupación principal",
        value: reportData.main_occupation_without_other,
      },
      { label: "Objetivo del evento", value: reportData.event_objective },
      { label: "Tipo de evento", value: reportData.event_type },
      {
        label: "Participantes invitados",
        value: reportData.invited_participants_number,
      },
      { label: "Conclusión", value: reportData.conclusion },
      { label: "Responsable", value: reportData.responsable },
      { label: "Institución", value: reportData.institution },
      { label: "Sistema productivo", value: reportData.crop },
    ];

    // Modified content rendering to handle only actual arrays as bullet points
    fieldsToPrint.forEach((item) => {
      const labelText = `${item.label}: `;

      // Determine if the value is an array or undefined, and set valueItems accordingly
      const isArray = Array.isArray(item.value);
      const valueItems = isArray ? item.value : [formatValue(item.value || "")];

      // Wrap the label text
      const labelLines = splitTextIntoLines(
        labelText,
        timesBoldFont,
        fontSize,
        maxWidth
      );

      // Wrap the value text for all lines (handling bullets if it's an array)
      let valueLines: string[] = [];
      if (isArray && valueItems && valueItems.length > 1) {
        (valueItems as string[]).forEach((bulletItem) => {
          valueLines.push(
            ...splitTextIntoLines(
              `• ${bulletItem}`,
              timesRomanFont,
              fontSize,
              maxWidth - 20
            )
          );
        });
      } else if (!(valueItems?.[0] === "nan" || valueItems?.[0] === "0")) {
        valueLines = splitTextIntoLines(
          (valueItems?.[0] || ""),
          timesRomanFont,
          fontSize,
          maxWidth
        );
      }

      // Calculate required space for all lines (label + all wrapped value lines)
      const requiredSpace =
        (labelLines.length + valueLines.length) * 20 + bottomMargin;

      // Check if there's enough space above the footer
      if (yPosition - requiredSpace < 0) {
        page = addNewPage();
      }

      // Draw label lines with wrapping
      if (!(valueItems?.[0] === "nan" || valueItems?.[0] === "0")) {
        labelLines.forEach((line) => {
          page.drawText(line, {
            x: 50,
            y: yPosition,
            size: fontSize,
            font: timesBoldFont,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        });
      }

      // Draw each wrapped value line (with bullet if it's an array)
      valueLines.forEach((line) => {
        page.drawText(line, {
          x: isArray ? 60 : 50, // Indent slightly if bullet point
          y: yPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });

      yPosition -= 10; // Extra space between fields
    });

    // Finalize the PDF and return it
    const pdfBytes = await pdfDoc.save();
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=report_${encodeURIComponent(
        reportId
      )}.pdf`,
    });

    return new NextResponse(pdfBytes, { headers });
  } catch (error) {
    console.error("Error generating the PDF:", error);
    return new NextResponse(`Error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}
