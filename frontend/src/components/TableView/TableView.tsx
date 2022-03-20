import useBoolean from "@/hooks/useBoolean";
import DataSource from "devextreme/data/data_source";
import LocalStore from "devextreme/data/local_store";
import "devextreme/dist/css/dx.material.blue.light.css";
import { useMemo, useRef, useState } from "react";
import DataGrid from "./DataGrid";
import RenameCaptionPopup from "./RenameCaptionPopup";

interface TableViewProps {
  data: any;
}

const TableView = ({ data }: TableViewProps) => {
  const {
    value: isRenameCaptionPopupShown,
    setTrue: showRenameCaptionPopup,
    setFalse: hideRenameCaptionPopup,
  } = useBoolean(false);
  const [renamingHeaderColumn, setRenamingHeaderColumn] = useState<{ dataField: string; caption: string }>({
    dataField: "",
    caption: "",
  });
  const dataGridInstanceRef = useRef<any>();

  const dataSource = useMemo(() => {
    return new DataSource({
      store: new LocalStore({
        data,
        key: "id",
        name: "table-data",
      }),
      // @ts-ignore
      // load: (data: any) => console.log(data),
      // load(data: any) { console.log(data); },
      // store: new LocalStore({
      //   data,
      //   name: "table-data",
      // }),
      // store: new ArrayStore({
      //   data,
      //   key: "id",
      // }),
    });
  }, [data]);

  // useEffect(() => {
  //   console.log(store);
  // }, [store]);

  // useEffect(() => {
  //   const dataGridInstance = dataGridInstanceRef.current;

  //   console.log(dataGridInstance);

  //   dataGridInstance.state(data);

  //   dataSource.load().then((data) => {
  //     console.log(dataSource.store());
  //   });
  //   // store.load()
  //   // store.on("", (e: any) => console.log(e));
  //   // console.log();
  // }, [dataSource]);

  const columns = useMemo(() => {
    // @ts-ignore
    const uniqueColumnNames = data.reduce((acc, dataItem) => {
      return new Set([...acc, ...Object.keys(dataItem)]);
    }, new Set<string>());

    return [...uniqueColumnNames].map((dataField) => ({ dataField }));
  }, [data]);

  const handleCaptionRename = (column: { dataField: string; caption: string }) => {
    showRenameCaptionPopup();
    setRenamingHeaderColumn(column);
  };

  const handleRenameCaptionPopupSave = (value: string) => {
    const dataGridInstance = dataGridInstanceRef.current;

    dataGridInstance.columnOption(renamingHeaderColumn.dataField, "caption", value);

    hideRenameCaptionPopup();
  };

  return (
    <>
      <DataGrid
        dataGridInstanceRef={dataGridInstanceRef}
        onCaptionRename={handleCaptionRename}
        data={dataSource}
        columns={columns}
      />
      <RenameCaptionPopup
        initialValue={renamingHeaderColumn.caption}
        show={isRenameCaptionPopupShown}
        onSave={handleRenameCaptionPopupSave}
        onClose={hideRenameCaptionPopup}
      />
    </>
  );
};

export default TableView;
