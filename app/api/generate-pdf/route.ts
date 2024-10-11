import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(request: Request) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const { width, height } = page.getSize();
  const fontSize = 18;

  // Dynamic Title (Example of a long title)
  const title = "Taller regional de coordinacion Caribe Humedo para fortalecer conocimientos sobre sostenibilidad en la región";
  
  // Function to wrap text based on max width
  const wrapText = (text: string, maxWidth: number) => {
    const words = text.split(' ');
    const lines = [];
    let line = '';

    words.forEach((word) => {
      const testLine = line + word + ' ';
      const testLineWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);
      
      if (testLineWidth > maxWidth) {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = testLine;
      }
    });
    lines.push(line.trim());
    return lines;
  };

  const wrappedTitle = wrapText(title, width - 100); // Wrapping text within 500px width (600 - 100)
  
  // Draw each line of the title
  wrappedTitle.forEach((line, index) => {
    const textWidth = timesRomanFont.widthOfTextAtSize(line, fontSize);
    const xPosition = (width - textWidth) / 2; // Centering text
    const yPosition = height - 50 - index * 25; // Spacing between lines

    page.drawText(line, {
      x: xPosition,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return new NextResponse(new Blob([pdfBytes], { type: 'application/pdf' }));
}
