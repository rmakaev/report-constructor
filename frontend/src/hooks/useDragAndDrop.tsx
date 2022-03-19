import { useState } from "react";

export default function useDragAndDrop() {
    const [dragOver, setDragOver] = useState(false);
    const [fileDropError, setFileDropError] = useState("")

    const onDragOver = (e: React.SyntheticEvent) => {
        setDragOver(true);
    }


    const onDragLeave = (e: React.SyntheticEvent) => {

        setDragOver(false)
    };

    return {
        dragOver,
        setDragOver,
        onDragOver,
        onDragLeave,
        fileDropError,
        setFileDropError,
    };
}