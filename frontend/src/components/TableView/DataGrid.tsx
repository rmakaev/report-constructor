import { DataGrid as DxDataGrid } from "devextreme-react";
import { Column, Item, Toolbar } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import "devextreme/dist/css/dx.material.blue.light.css";
import { ContextMenuPreparingEvent } from "devextreme/ui/data_grid";
import { ComponentPropsWithoutRef, Ref, useImperativeHandle, useRef } from "react";
import { dataExporters, TABLE_CONFIG_STORAGE_KEY } from "./tableView.helpers";
import ToolbarExportButton, { ExportFileType } from "./ToolbarExportButton";

interface DataGridProps {
  data: DataSource<any, any>; //Record<string, any>[];
  columns: ComponentPropsWithoutRef<typeof Column>[];
  onCaptionRename: (column: { dataField: string; caption: string }) => void;
  dataGridInstanceRef: Ref<any>;
}

const DataGrid = ({ data, columns, onCaptionRename, dataGridInstanceRef }: DataGridProps) => {
  const dxDataGridRef = useRef<any>();

  useImperativeHandle(dataGridInstanceRef, () => dxDataGridRef.current.instance);

  const handleContextMenuPreparing = (e: ContextMenuPreparingEvent<Record<string, any>, any>) => {
    if (e.target === "header") {
      if (!e.items) e.items = [];

      e.items.push({
        text: "Rename",
        onItemClick: () => {
          const { dataField, caption } = e.column!;

          onCaptionRename({
            dataField: dataField!,
            caption: caption!,
          });
        },
      });
    }
  };

  const handleToolbarExportButtonClick = (type: ExportFileType) => {
    const dataGridInstance = dxDataGridRef.current.instance;

    const specificExporter = dataExporters[type];

    specificExporter(dataGridInstance);
  };

  return (
    <DxDataGrid
      ref={dxDataGridRef}
      height="100%"
      width="100%"
      dataSource={data}
      columns={columns}
      allowColumnReordering
      columnResizingMode="widget"
      allowColumnResizing
      showColumnLines
      cellHintEnabled
      columnMinWidth={100}
      onContextMenuPreparing={handleContextMenuPreparing}
      stateStoring={{
        enabled: true,
        storageKey: TABLE_CONFIG_STORAGE_KEY,
        type: "localStorage",
      }}
      // rowDragging={{
      //   autoScroll: true,
      //   allowReordering: true,
      //   showDragIcons: false,
      // }}
      // selection={{
      //   mode: "single",
      //   showCheckBoxesMode: "none",
      // }}
      export={{
        enabled: true,
      }}
      scrolling={{
        mode: "virtual",
      }}
      headerFilter={{
        visible: true,
        allowSearch: true,
        searchTimeout: 200,
      }}
      grouping={{
        contextMenuEnabled: true,
        allowCollapsing: true,
      }}
      groupPanel={{
        allowColumnDragging: true,
        visible: true,
      }}
      columnChooser={{
        enabled: true,
      }}
      searchPanel={{
        visible: true,
      }}
      editing={{
        startEditAction: "dblClick",
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        mode: "cell",
      }}
      filterRow={{
        visible: true,
      }}
      loadPanel={{
        enabled: true,
        showPane: true,
      }}
    >
      <Toolbar>
        <Item name="groupPanel" />
        <Item name="addRowButton" />
        <Item name="columnChooserButton" />
        <Item name="searchPanel" />
        <Item location="after">
          <ToolbarExportButton onItemClick={handleToolbarExportButtonClick} />
        </Item>
      </Toolbar>
    </DxDataGrid>
  );
};

export default DataGrid;
