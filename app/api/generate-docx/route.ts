import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";

// Function to fetch report data by ID
async function getReportData(reportId: string) {
  const dataset = await ReportsRepository.fetchEventById(reportId);

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    throw new Error("Report data not found");
  }

  return dataset.data[0];
}

// Function to replace unsupported characters in filenames only
function sanitizeFilename(text: string) {
  return text.replace(/[–]/g, "-"); // Replace en dash with a standard hyphen
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("reportId");

  if (!reportId) {
    return new NextResponse("Report ID not provided", { status: 400 });
  }

  try {
    const reportData = await getReportData(reportId);

    const fieldsToPrint = [
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

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: sanitizeFilename(reportData.name), bold: true, size: 28 })],
              spacing: { after: 300 },
            }),
            ...fieldsToPrint.map((field) => {
              const valueText = Array.isArray(field.value) ? field.value.join(", ") : field.value || "N/A";
              return new Paragraph({
                children: [
                  new TextRun({ text: `${field.label}: `, bold: true }),
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
      "Content-Disposition": `attachment; filename="report_.docx"`,
    });

    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error("Error generating the document:", error);
    return new NextResponse(`Error: ${(error as Error).message}`, { status: 500 });
  }
}
