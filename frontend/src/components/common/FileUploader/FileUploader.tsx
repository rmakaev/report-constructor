import useDragAndDrop from "@/hooks/useDragAndDrop";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fileIcon from "../../../assets/icons/file.svg";

const allowedFileExtensions =
    ".json, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

const FileUploaderContainer = styled.form`
  width: 100vw;
  height: 100vh;
`;


const HiddenInput = styled.input`
  display: none; 
`;


const PrepareBlock = styled.div<{ done: boolean }>`
  font-weight: 100;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 40px;
  align-items: center;
  transition: opacity 0.35s linear;
  opacity: ${({ done }) => (done ? 0 : 0.7)};
`;

const PrepareBlockButtons = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;

const DropZone = styled.div`
  width: 475px;
  height: 290px;  
`;

const DropZoneLabel = styled.label`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropZoneTitle = styled.h1`
   font-size: 36px !important;
   font-weight: bold !important;
 `;

function Uploader() {
    const [file, setFile] = useState<File | null>(null);

    const {
        dragOver,
        setDragOver,
        onDragOver,
        onDragLeave
    } = useDragAndDrop();



    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();

        setDragOver(false);

        const selectedFile = e?.dataTransfer?.files[0];



        selectedFile && setFile(selectedFile);
    };
    const fileSelect = (e: any) => {
        let selectedFile = e?.dataTransfer?.files[0];

        selectedFile && setFile(selectedFile)
    };



    useEffect(() => {
        console.log(file);
    }, [file]);

    return (
        <FileUploaderContainer>
            <DropZoneLabel
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                htmlFor="fileInputH"
            >
                <DropZone >
                    <img src={fileIcon} />
                    <DropZoneTitle >
                        {file ? file.name : dragOver ? 'Drop here' : "Upload file"}
                    </DropZoneTitle>
                    <PrepareBlock done={!!file}>
                        <span>Work with .json, .csv, .xmls</span>
                      {/*   <PrepareBlockButtons>

                        </PrepareBlockButtons> */}
                        <span>or drop file here</span>
                    </PrepareBlock>
                </DropZone>
            </DropZoneLabel>
            <HiddenInput
                type="file"
                name="file"
                id="fileInputH"
                onChange={fileSelect}
                accept={allowedFileExtensions}
            />
        </FileUploaderContainer>

    );
}

export default Uploader;
