import ChartView from "@/components/ChartView";
import Toolbar from "@/components/Toolbar";
import "devextreme/dist/css/dx.material.blue.light.css";
import styled from "styled-components";

const TableViewPageRoot = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const TableViewPage = () => {
  return (
    <TableViewPageRoot>
      <Toolbar />
      <ChartView />
    </TableViewPageRoot>
  );
};

export default TableViewPage;
