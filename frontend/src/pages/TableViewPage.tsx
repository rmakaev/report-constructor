import TableView from "@/components/TableView";
import Toolbar from "@/components/Toolbar";
import data from "@/mock/mock.json";
import styled from "styled-components";

const TableViewLayout = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const TableViewPage = () => {
  // const sourceData =

  // useEffect(() => {
  //   dataSource
  //     .store()
  //     .load()
  //     .then((loadedData) => {
  //       if (loadedData.length === 0) {
  //         resetDataSource({ data });
  //       }
  //     });
  //   // const handleStoreLoaded = (e: LocalStore) => {
  //   //   console.log(e);
  //   // };

  //   // store.on("loaded", handleStoreLoaded);

  //   // return () => {
  //   //   store.off("loaded", handleStoreLoaded);
  //   // };
  // }, []);

  return (
    <TableViewLayout>
      <Toolbar />
      <TableView data={data} />
    </TableViewLayout>
  );
};

export default TableViewPage;
