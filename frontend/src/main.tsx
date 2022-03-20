import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import TableViewPage from "./pages/TableViewPage";
import ChartViewPage from "./pages/ChartViewPage";
import UploadPage from "./pages/UploadPage";
import "devextreme/dist/css/dx.material.blue.light.compact.css";

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
