import { Popup, TextBox } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import React, { useEffect, useState } from "react";

interface RenameCaptionPopupProps {
  show?: boolean;
  initialValue: string;
  onClose?: () => void;
  onSave?: (value: string) => void;
}

const RenameCaptionPopup = ({ show, onClose, initialValue, onSave }: RenameCaptionPopupProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSaveButtonClick = () => {
    onSave && onSave(value);
  };

  return (
    <Popup
      visible={show}
      onHiding={onClose}
      dragEnabled={false}
      closeOnOutsideClick
      showCloseButton
      showTitle={true}
      title="Rename"
      container=".dx-viewport"
      width={300}
      height={200}
    >
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        options={{ text: "close", type: "normal", onClick: onClose }}
      />

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{ text: "save", icon: "save", onClick: handleSaveButtonClick, stylingMode: "contained" }}
      />

      <TextBox
        label="Caption"
        stylingMode="outlined"
        value={value}
        valueChangeEvent="keyup"
        onValueChange={setValue}
      />
    </Popup>
  );
};

export default RenameCaptionPopup;
