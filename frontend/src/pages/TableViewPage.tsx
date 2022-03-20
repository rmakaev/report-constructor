import TableView from "@/components/TableView";

import Toolbar from "@/components/Toolbar";

const TableViewPage = () => {
  return (
    <>
      {localStorage.getItem("file")}
      <Toolbar label={"fileName.d.tsx"} />
      <TableView />
    </>
  );
};

export default TableViewPage;
