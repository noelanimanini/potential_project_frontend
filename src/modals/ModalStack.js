import React from "react";
import { Button, Typography, Menu, MenuItem } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ReactDom from "react-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalForm from "./ModalForm";
import { useState } from "react";
import AccordionModal from "./AccordionModal";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "84px",
  zIndex: 1000,
  borderRadius: "10px",
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};

function ModalStack({ open, onClose, cardInfo, setStack }) {
  const [openEdit, setOpenEdit] = useState(false);
  console.log(cardInfo);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!open) return null;
  const renderModal = () => {
    return (
      <div style={OVERLAY_STYLE}>
        <div style={MODAL_STYLES}>
          {cardInfo.user_body_parts.map((bodypart) => (
            <AccordionModal bodypart={bodypart} />
          ))}

          <Button onClick={onClose}>
            <HighlightOffIcon></HighlightOffIcon>
          </Button>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AddIcon></AddIcon>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleEditForm(cardInfo)}>
              Stack Notes
            </MenuItem>
          </Menu>
        </div>
      </div>
    );
  };

  const handleEditForm = (cardInfo) => {
    console.log(cardInfo);
    setOpenEdit(true);
    handleClose();
  };

  return ReactDom.createPortal(
    <div>
      <li>
        {renderModal()}
        <ModalForm
          open={openEdit}
          cardInfo={cardInfo}
          setOpenEdit={setOpenEdit}
          setStack={setStack}
          renderModal={renderModal()}
        />
      </li>
    </div>,

    document.getElementById("portal")
  );
}

export default ModalStack;
