declare const Buffer: any;

import { db } from "@/db/db";
import { Button } from "devextreme-react/button";
import FileUploader from "devextreme-react/file-uploader";
import ProgressBar from "devextreme-react/progress-bar";
import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { read, utils } from "xlsx";
import "./Uploader.style.css";

const allowedFileExtensions = [".json", ".xlsx", ".csv"];

const Uploder: FC = () => {
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [fileSource, setFileSource] = useState<any>("");
  const [textVisible, setTextVisible] = useState(true);
  const [progressVisible, setProgressVisible] = useState(false);
  const [progressValue, setprogressValue] = useState(0);
  const [isURLInputActive, setIsURLInputActive] = useState(false);
  const [inputURLValue, setInputURLValue] = useState("");
  const navigate = useNavigate();
  const currentDoc = useRef("");

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

  const saveToDb = async (data: any) => {
    await db.docs.add({ name: "currentFile" });

    data.forEach((user: any) => {
      try {
        db.items.add({
          ...user,
          uuid: uuidv4(),
          docId: "currentFile",
        });
      } catch (error) {
        console.log(error, "error");
      }
    });

    navigate("/table-view");
  };

  const onUploaded = (e: any) => {
    const { file } = e;

    currentDoc.current = file.name;
    localStorage.setItem("fileName", file.name);

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
    currentDoc.current = inputURLValue;
    localStorage.setItem("fileName", inputURLValue);
    fetchFile();
    setInputURLValue("");
    setIsURLInputActive(false);
  };

  return (
    <div className="widget-container flex-box">
      <div
        id="dropzone-external"
        className={`flex-box ${
          isDropZoneActive ? "dx-theme-accent-as-border-color dropzone-active" : "dx-theme-border-color"
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
