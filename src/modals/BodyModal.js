import React from "react";
import { Button, Typography, Menu, MenuItem } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import BodyPopUp from '../BodyPopUp'

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

function BodyModal({ open, onClose, bodypart, card }) {
  const buttonStyle = { display: "flex" };
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  if (!open) return null;

  const renderModal = () => {
    return (
      <div style={MODAL_STYLES} id={bodypart.id}>
        {bodypart.title}
        <img src={bodypart.image} />

        <Button onClick={onClose}>
          <HighlightOffIcon style={buttonStyle}></HighlightOffIcon>
        </Button>

        <Button onClick={handleClick}>
          <AddBoxTwoToneIcon></AddBoxTwoToneIcon>
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {card.map((cardTitle) => (
            <MenuItem onClick={(e) => handleItem(e, bodypart, cardTitle)}>
              {cardTitle.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  const handleItem = (e, bodypart, card) => {
    e.preventDefault();
    const token = localStorage.token;
    fetch("http://localhost:3000/user_body_parts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_body_part: {
          card_stack_id: card.id,
          body_part_id: bodypart.id,
        },
      }),
    })
      .then((response) => response.json())
      .then((newUserBodyPart) =>
        dispatch({
          type: "GRAB_USER_BODY_PARTS",
          newUserBodyPart: newUserBodyPart,
        })
      );
  };

  return ReactDom.createPortal(
    <>
      <li>{renderModal()}</li>
    </>,
    document.getElementById("portal")
  );
}

export default BodyModal;
