import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";

// Función para obtener los datos del reporte a partir de un ID
async function getReportData(reportId: string) {
  const decodedReportId = decodeURIComponent(reportId);
  const dataset = await ReportsRepository.fetchEventById(decodedReportId);

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    throw new Error("Report data not found");
  }

  return dataset.data[0]; // Solo tomamos el primer objeto del array 'data'
}

// Función para envolver texto si es más largo que el ancho permitido
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let reportId = searchParams.get("reportId");

  if (!reportId) {
    return new NextResponse("Report ID not provided", { status: 400 });
  }

  try {
    // Obtener los datos del reporte por el ID
    const reportData = await getReportData(reportId);

    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Agregar una página al documento
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const maxWidth = width - 100; // Margen para el ancho del texto

    // Título del PDF
    page.drawText("Event Report", {
      x: 50,
      y: height - 50,
      size: 24,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Campos que queremos imprimir en el PDF
    const fieldsToPrint = [
      { label: "Nombre", value: reportData.name },
      { label: "Fecha de inicio", value: reportData.date },
      { label: "Fecha de finalización", value: reportData.datesEnd },
      { label: "Provincia", value: reportData.province },
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
      { label: "Eje", value: reportData.eje },
      { label: "Tipo de suposición", value: reportData.guess_type },
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
      { label: "Cosecha", value: reportData.crop },
    ];

    // Imprimir los campos en el PDF con ajuste de líneas
    let yPosition = height - 100;
    fieldsToPrint.forEach((item) => {
      const labelText = `${item.label}: `;
      const valueText = Array.isArray(item.value)
        ? item.value.join(", ")
        : item.value ?? ""; // Manejo de arrays y valores undefined

      // Solo pasamos valores que sean cadenas de texto, o un string vacío
      const labelLines = splitTextIntoLines(
        labelText,
        timesRomanFont,
        fontSize,
        maxWidth
      );
      labelLines.forEach((line) => {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });

      // Imprimir el valor con ajuste de líneas
      const valueLines = splitTextIntoLines(
        valueText,
        timesRomanFont,
        fontSize,
        maxWidth
      );
      valueLines.forEach((line) => {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });

      yPosition -= 10; // Espaciado extra entre los campos
    });

    // Finalizar el PDF y devolverlo
    const pdfBytes = await pdfDoc.save();
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=report_${reportId}.pdf`,
    });

    return new NextResponse(pdfBytes, { headers });
  } catch (error) {
    return new NextResponse(`Error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}
