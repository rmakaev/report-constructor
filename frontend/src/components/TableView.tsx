import { DataGrid } from "devextreme-react";
import Button from "devextreme-react/button";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  Export,
  Grouping,
  GroupPanel,
  HeaderFilter,
  IColumnProps,
  Pager,
  Scrolling,
  SearchPanel,
  Selection,
  Sorting,
} from "devextreme-react/data-grid";
import ArrayStore from "devextreme/data/array_store";
import "devextreme/dist/css/dx.material.blue.light.css";
import { Component, ReactElement, ReactNode, useEffect, useMemo } from "react";
import data from "@/mock/users.json";

const TableView = () => {
  const columns = useMemo(() => {
    const uniqueColumnNames = data.reduce((acc, post) => {
      for (const key of Object.keys(post)) {
        if (!(key in acc) && typeof post[key as keyof typeof post] !== "object") {
          acc[key] = true;
        }
      }

      return acc;
    }, {} as Record<string, boolean>);

    return Object.keys(uniqueColumnNames).map((columnName) => {
      return {
        dataField: columnName,
      };
    });
  }, []);

  return (
    <DataGrid
      height="100%"
      width="100%"
      dataSource={data}
      keyExpr="id"
      allowColumnReordering
      columnResizingMode="widget"
      allowColumnResizing
      showColumnLines
      onSelectionChanged={(e) => console.log(e.selectedRowKeys)}
    >
      <Selection mode="single" />
      <Scrolling mode="virtual" />
      <HeaderFilter visible allowSearch searchTimeout={200} />
      <Grouping contextMenuEnabled />
      <GroupPanel allowColumnDragging visible />
      <Export enabled excelFilterEnabled />
      <SearchPanel visible />
      <ColumnChooser enabled />
      <Editing mode="cell" allowUpdating={true} />

      {columns.map((column, i) => (
        <Column minWidth={100} key={i} {...column} />
      ))}
    </DataGrid>
  );
};

export default TableView;
