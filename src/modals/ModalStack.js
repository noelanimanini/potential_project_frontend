import React from "react";
import {
  Button,
  Typography,
  Menu,
  MenuItem,
  Input,
  TextField,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ReactDom from "react-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalForm from "./ModalForm";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "84px",
  zIndex: 1000,
  borderRadius: "10px",
  borderStyle: "dotted",
};

function ModalStack({ open, onClose, cardInfo, changeStackForm, setStack }) {
  const [openEdit, setOpenEdit] = useState(false);
  const modalStyle = { height: "50vh", width: "50vh" };
  //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!open) return null;

  const renderModal = () => {
    // debugger
    return (
      <div style={MODAL_STYLES}>
        <Typography>Title: {cardInfo.title}</Typography>
        <Typography>Description: {cardInfo.description}</Typography>
        <Typography>System: {cardFunction(cardInfo)}</Typography>

        {/* {cardInfo.user_body_parts.map(part => part.body_part)} */}

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
            Edit Stack
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const cardFunction = (cardInfo) => {
    return (
      <div>
        {cardInfo.user_body_parts.map((part) => part.body_part.title)}
        <iframe
          style={modalStyle}
          src={cardInfo.user_body_parts.map((part) => part.body_part.link)}
        ></iframe>
      </div>
    );
  };

  const handleEditForm = (cardInfo) => {
    console.log(cardInfo);
    setOpenEdit(true);
    handleClose();
    console.log(openEdit);
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
          changeStackForm={changeStackForm}
        />
      </li>
    </div>,

    document.getElementById("portal")
  );
}

export default ModalStack;
