import { DropDownButton } from "devextreme-react";
import { ItemClickEvent } from "devextreme/ui/drop_down_button";
import React from "react";

export enum ExportFileType {
  Pdf = 0,
  Xlsx = 1,
}

const dropdownItems = [
  {
    text: "PDF",
    icon: "pdffile",
    type: ExportFileType.Pdf,
  },
  {
    text: "Spreadsheet",
    icon: "xlsxfile",
    type: ExportFileType.Xlsx,
  },
];

interface ToolbarExportButton {
  onItemClick: (exportFileType: ExportFileType) => void;
}

const ToolbarExportButton = ({ onItemClick }: ToolbarExportButton) => {
  const handleItemClick = (e: ItemClickEvent) => {
    onItemClick(e.itemData.type as ExportFileType);
  };

  return (
    <DropDownButton
      icon="export"
      dropDownOptions={{ width: 200 }}
      showArrowIcon={false}
      stylingMode="text"
      onItemClick={handleItemClick}
      items={dropdownItems}
    />
  );
};

export default ToolbarExportButton;
