// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import ExcelJS from "exceljs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    offerDate,
    offerNo,
    notes,
    issue,
    solution,
    warranty,
    timeframe,
    workDetails,
  } = req.body;

  const file = new ExcelJS.Workbook();
  const template = "./pages/api/assets/quotation.xlsx";

  // ? Workbook metadata
  file.creator = "System";
  file.lastModifiedBy = "System";
  file.created = new Date();
  file.modified = new Date();

  // ? Read file
  const workbook = await file.xlsx.readFile(template);
  const worksheet = workbook.getWorksheet("Sheet1");

  const details = {
    offer: "Offer X",
    store: "Shop X",
    actioner: "Hellena",
    VAT: 118,
    images: "",
  };

  // ? Update cell values
  worksheet.getCell("D5").value = new Date();
  worksheet.getCell("D6").value = offerNo;
  worksheet.getCell("D7").value = details.store;
  worksheet.getCell("D8").value = details.actioner;
  worksheet.getCell("B9").value = {
    richText: [{ font: { bold: true }, text: "Notes: " }, { text: notes }],
  };

  let startRow = 16;

  if (workDetails.length <= 12) {
    workDetails.forEach((detail: any, i: any) => {
      i++;
      worksheet.getCell(`B${startRow}`).value = i;
      worksheet.getCell(`C${startRow}`).value = detail.work;
      worksheet.getCell(`H${startRow}`).value = detail.brand;
      worksheet.getCell(`I${startRow}`).value = detail.quantity;
      worksheet.getCell(`J${startRow}`).value = detail.price;
      worksheet.getCell(`K${startRow}`).value = detail.quantity * detail.price;
      startRow++;
    });
  }

  worksheet.getCell(`K28`).value = {
    formula: `SUM(K16:K27)`,
    result: 7,
  };
  worksheet.getCell(`K29`).value = { formula: `K28+${details.VAT}`, result: 7 };

  worksheet.getCell("J16:K27").numFmt = "[$KES] #,##0.00";
  worksheet.getCell("K28:K29").numFmt = "[$KES] #,##0.00";

  worksheet.getCell("B31").value = {
    richText: [
      { text: "1 - What is the issue? : " },
      { font: { bold: true }, text: issue },
    ],
  };
  worksheet.getCell("B32").value = {
    richText: [
      { text: "2 - What needs to be done? : " },
      { font: { bold: true }, text: solution },
    ],
  };
  worksheet.getCell("B33").value = {
    richText: [
      { text: "3 - Warranty : " },
      { font: { bold: true }, text: warranty },
    ],
  };
  worksheet.getCell("B34").value = {
    richText: [
      { text: "4 - Timeframe / Deadline : " },
      { font: { bold: true }, text: timeframe },
    ],
  };
  worksheet.getCell("B35").value = {
    richText: [
      { text: "5 - Supportive pictures : " },
      { font: { bold: true }, text: "" },
    ],
  };

  // ? Write to file
  await workbook.xlsx.writeFile("./pages/api/temp/quotation0.xlsx");

  res.status(201).json({
    message: "created",
  });
}
