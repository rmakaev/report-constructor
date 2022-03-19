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
import ruMessages from "devextreme/localization/messages/ru.json";
import data from "@/mock/users.json";
import TableView from "./components/TableView";
import { Test } from "./indexedDB/Test";

const App = () => {
  return (
    <Test />

  );
};

export default App;
