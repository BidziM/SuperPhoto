import React, { useState } from "react";
import styled from "styled-components";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCanvas } from "../context/CanvasContext";

function RightBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { placeDrawing, canvasItems, selectItem, removeItem } = useCanvas();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = ({ value }) => {
    placeDrawing({ type: value });
    setAnchorEl(null);
  };
  return (
    <Wrapper>
      <Button variant="outlined" onClick={handleClick}>
        Place object
      </Button>
      <List>
        {canvasItems.map((item) => (
          <ListItemButton
            onClick={() => selectItem(item.id)}
            key={`${item.name}_${item.id}`}
          >
            <ListItemText primary={item.name} />
            <DeleteIcon
              sx={{ zIndex: 10 }}
              onClick={() => removeItem(item.id)}
            />
          </ListItemButton>
        ))}
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose({ value: "circle" })}>
          Circle
        </MenuItem>
        <MenuItem onClick={() => handleClose({ value: "box" })}>Box</MenuItem>
      </Menu>
    </Wrapper>
  );
}

export default RightBar;

const Wrapper = styled.div`
  width: 200px;
`;
