import "devextreme/dist/css/dx.material.blue.light.compact.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import ChartViewPage from "./pages/ChartViewPage";
import TableViewPage from "./pages/TableViewPage";
import UploadPage from "./pages/UploadPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/table-view" element={<TableViewPage />} />
        <Route path="/chart-view" element={<ChartViewPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Navigate to="/upload" replace />} />{" "}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
