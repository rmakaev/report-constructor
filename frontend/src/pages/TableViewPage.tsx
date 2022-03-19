import "devextreme/dist/css/dx.material.blue.light.css";

import TableView from "@/components/TableView";

import Toolbar from "@/components/Toolbar";

const TableViewPage = () => {
  return (
    <>
      <Toolbar label={"fileName.d.tsx"} />
      <TableView />
    </>
  );
};

export default TableViewPage;
