import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCanvas } from "../context/CanvasContext";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

function EditBar() {
  const { selectedObj, editItem } = useCanvas();
  const [parameters, setParameters] = useState({ ...selectedObj });

  useEffect(() => {
    setParameters({ ...selectedObj });
  }, [selectedObj]);

  const changeParameters = (e) => {
    const { name, value } = e.target;
    const newParameters = { ...parameters, [name]: value };
    setParameters(newParameters);
    editItem(newParameters);
  };

  if (!selectedObj) return null;
  return (
    <Wrapper>
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        name={"name"}
        value={parameters.name}
        onChange={changeParameters}
      />
      <Slider
        size="small"
        defaultValue={50}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={changeParameters}
        name="size"
      />
      <TextField
        value={parameters.x}
        label="X"
        name="x"
        variant="standard"
        onChange={changeParameters}
      />
      <TextField
        value={parameters.y}
        label="Y"
        name="y"
        variant="standard"
        onChange={changeParameters}
      />
    </Wrapper>
  );
}

export default EditBar;

const Wrapper = styled.div`
  width: 200px;
`;
