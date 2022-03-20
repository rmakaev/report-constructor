import { Item, Toolbar as ExternalToolbar } from "devextreme-react/toolbar";
import "devextreme/ui/select_box";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ToolbarRoot = styled.div({
  paddingInline: 10,
  flexGrow: 0,
});

const Toolbar: FC = () => {
  const navigate = useNavigate();
  const Label = () => <strong>{localStorage.getItem("fileName")}</strong>;

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

  return (
    <ToolbarRoot>
      <ExternalToolbar>
        <Item location="before" widget="dxButton" options={uplodeOptions} />
        <Item location="center" locateInMenu="never" render={Label} />
        <Item
          location="after"
          widget="dxButton"
          options={window.location.pathname === "/chart-view" ? tableOptions : chartsOptions}
        />
      </ExternalToolbar>
    </ToolbarRoot>
  );
};

export default Toolbar;
