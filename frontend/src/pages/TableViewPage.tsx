import TableView from "@/components/TableView";
import Toolbar from "@/components/Toolbar";
import { db } from "@/db/db";
//import data from "@/mock/users.json";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";

const TableViewLayout = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const TableViewPage = () => {
  const data = useLiveQuery(
    async () => {
      const data = await db.items
        .where({ docId: 'currentFile' })
        .toArray();

      return data;
    },
    []
  );
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
      {data && <TableView data={data.map(x => {
        delete x.uuid
        delete x.docId
        return x
      })} />}
    </TableViewLayout>
  );
};

export default TableViewPage;
