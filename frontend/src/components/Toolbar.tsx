import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Toolbar as ExternalToolbar, Item } from "devextreme-react/toolbar";

import notify from "devextreme/ui/notify";

import "devextreme/ui/select_box";

interface ToolbarProps {
  label: string;
}

const Toolbar: FC<ToolbarProps> = ({ label }) => {
  const navigate = useNavigate();
  const Label = () => <strong>{label}</strong>;

  const uplodeOptions = {
    text: "Upload file",
    onClick: () => {
      navigate("/upload");
    },
  };

  const tableOptions = {
    text: "Table view",
    onClick: () => {
      navigate("/table-view");
    },
  };

  const chartsOptions = {
    text: "Chart view",
    onClick: () => {
      navigate("/chart-view");
    },
  };

  const saveOptions = {
    text: "Save",
    onClick: () => {
      notify("Successfully saved");
    },
  };

  return (
    <div style={{ paddingInline: 10 }}>
      <ExternalToolbar>
        <Item location="before" widget="dxButton" options={uplodeOptions} />
        <Item location="center" locateInMenu="never" render={Label} />
        <Item
          location="after"
          widget="dxButton"
          options={window.location.pathname === "/chart-view" ? tableOptions : chartsOptions}
        />
        <Item locateInMenu="always" widget="dxButton" options={saveOptions} />
      </ExternalToolbar>
    </div>
  );
};

export default Toolbar;
