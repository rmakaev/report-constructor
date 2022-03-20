declare const Buffer: any;

import { Button } from "devextreme-react/button";
import FileUploader from "devextreme-react/file-uploader";
import ProgressBar from "devextreme-react/progress-bar";
import notify from "devextreme/ui/notify";
import { FC, useState } from "react";
import "./Uploader.style.css";
import { read, utils } from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";

const allowedFileExtensions = [".json", ".xlsx", ".csv"];

const Uploder: FC = () => {
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [fileSource, setFileSource] = useState<any>("");
  const [textVisible, setTextVisible] = useState(true);
  const [progressVisible, setProgressVisible] = useState(false);
  const [progressValue, setprogressValue] = useState(0);
  const [isURLInputActive, setIsURLInputActive] = useState(false);
  const [inputURLValue, setInputURLValue] = useState("");
  const [currentDoc, setCurrentDoc] = useState("");

  const onDropZoneEnter = (e: any) => {
    if (e.dropZoneElement.id === "dropzone-external") {
      setIsDropZoneActive(true);
    }
  };

  const onDropZoneLeave = (e: any) => {
    if (e.dropZoneElement.id === "dropzone-external") {
      setIsDropZoneActive(false);
    }
  };

  const currentDocId = useLiveQuery(async () => {
    console.log(currentDoc, 'currentDoc at hasAnydocs');
    if (!currentDoc) return
    const list = await db.docs.where({ name: currentDoc }).toArray();
    console.log(list, 'list');

    return list.uuid;
  }, [currentDoc]);

  const saveToDb = async (data: any) => {
    if (!currentDoc) return
    console.log(currentDoc, ' currentDoc at saveDB');
    if (!currentDocId) {
      await db.docs.add({ uuid: uuidv4(), name: currentDoc });

    }

    if (currentDocId) {
      db.items.where({ docId: currentDocId }).delete();
    }

    data.forEach((user: any) => {
      try {
        db.items.add({
          ...user,
          uuid: uuidv4(),
          docId: currentDoc,
        });
      } catch (error) {
        console.log(error, "error");
      }
    });
  };

  const onUploaded = (e: any) => {
    const { file } = e;

    setCurrentDoc(file.name);

    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = read(ab, { type: "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      console.log(currentDoc, data);
      saveToDb(data);
    };
    fileReader.readAsArrayBuffer(file);

    setTextVisible(false);
    setProgressVisible(false);
    setprogressValue(0);
  };

  const onProgress = (e: any) => {
    setprogressValue((e.bytesLoaded / e.bytesTotal) * 100);
  };

  const onUploadStarted = () => {
    setFileSource("");
    setProgressVisible(true);
  };

  const fetchFile = () => {
    setCurrentDoc(inputURLValue)
    return fetch(inputURLValue)
      .then((response) => response.json())
      .then((data) => {
        saveToDb(data);
      });
  };

  const onInputChange = (e: any) => {
    setInputURLValue(e.target.value);
  };

  const onInputBlur = () => {
    fetchFile();
    setInputURLValue("");
    setIsURLInputActive(false);
  };

  return (
    <div className="widget-container flex-box">
      <div
        id="dropzone-external"
        className={`flex-box ${isDropZoneActive ? "dx-theme-accent-as-border-color dropzone-active" : "dx-theme-border-color"
          }`}
      ></div>
      <div className="upload">
        <h3 style={{ marginBottom: 10 }}>
          <strong>Upload file</strong>
          <span>{fileSource}</span>
        </h3>
        {fileSource && <img id="dropzone-file" src={fileSource} alt="" />}
        <div id="dropzone-text" className="flex-box">
          <h5>Work with .json, .csv, .xlsx</h5>
        </div>
        <div className="btns">
          <Button id="browse-button" width={130} text="BROWSE" />
          {isURLInputActive ? (
            <input value={inputURLValue} onBlur={onInputBlur} onChange={onInputChange} />
          ) : (
            <Button width={130} text="URL" onClick={() => setIsURLInputActive(true)} />
          )}
        </div>
        <br />
        <p>or drop file here</p>
        <ProgressBar
          id="upload-progress"
          min={0}
          max={100}
          width="100%"
          showStatus={false}
          visible={progressVisible}
          value={progressValue}
        />
      </div>
      <FileUploader
        id="file-uploader"
        dialogTrigger="#browse-button"
        dropZone="#dropzone-external"
        multiple={false}
        allowedFileExtensions={allowedFileExtensions}
        uploadMode="instantly"
        uploadUrl="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
        visible={false}
        onDropZoneEnter={onDropZoneEnter}
        onDropZoneLeave={onDropZoneLeave}
        onUploaded={onUploaded}
        onProgress={onProgress}
        onUploadStarted={onUploadStarted}
      />
    </div>
  );
};

export default Uploder;
