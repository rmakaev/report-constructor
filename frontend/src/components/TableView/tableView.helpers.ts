import "devextreme/dist/css/dx.material.blue.light.css";
import { exportDataGrid } from "devextreme/excel_exporter";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ExportFileType } from "./ToolbarExportButton";

export const TABLE_CONFIG_STORAGE_KEY = "table-config";

export const clearTableConfigFromStorage = () => {
  window.localStorage.removeItem(TABLE_CONFIG_STORAGE_KEY);
};

export const exportAsXlsx = (dataGridInstance: any, fileName: string = "data") => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Main sheet");

  return exportDataGrid({
    component: dataGridInstance,
    worksheet: worksheet,
    // customizeCell: (options) => {
    //   options.excelCell = {};
    //   // console.log(options);
    // },
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), `${fileName}.xlsx`);
    });
  });
};

export const exportAsPdf = (dataGridInstance: any, fileName: string = "data") => {
  const doc = new jsPDF();

  autoTable(doc, {
    styles: {
      cellWidth: "wrap",
    },
  });

  // console.log(dataGridInstance)
  // dataGridInstance.selectAll().then((data: any) => {
  //   console.log(data);
  // });

  return exportDataGridToPdf({
    jsPDFDocument: doc,
    component: dataGridInstance,
  }).then(() => {
    doc.save(`${fileName}.pdf`);
  });
};

export const exportAsHtml = (dataGridInstance: any, fileName: string = "data") => {
  // TODO: implement in future
};

export const dataExporters = {
  [ExportFileType.Xlsx]: exportAsXlsx,
  [ExportFileType.Pdf]: exportAsPdf,
};
