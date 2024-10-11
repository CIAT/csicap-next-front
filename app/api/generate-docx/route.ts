import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Simulating a database or data source
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

  const doc = new Document({
    sections: [
      {
        children: reportData.map((item) =>
          new Paragraph({
            children: [new TextRun({ text: `${item.label}: ${item.value}` })],
          })
        ),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  const headers = new Headers({
    "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "Content-Disposition": `attachment; filename=report_${reportId}.docx`,
  });

  return new NextResponse(buffer, { headers });
}
