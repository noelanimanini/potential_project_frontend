import React from "react";
import { Button, Menu, MenuItem, Card } from "@material-ui/core";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import BodyPopUp from "../BodyPopUp";
import { useState } from "react";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "14px",
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

function BodyModal({ open, onClose, bodypart, card }) {
  const imageStyle = {
    height: "300px",
    maxWidth: "400",
    display: "block",
    overFlow: "hidden",
  };
  const buttonStyle = { position: "relative", right: "2px" };
  const buttonStyle2 = { position: "relative", left: "200px" };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400",
    flexGrow: 1,
  };
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [info, setInfo] = useState(null);
  const [isExtended, setIsExtended] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  if (!open) return null;

  const handlePopUp = (part) => {
    setIsExtended(true);
    setInfo(part);
  };

  const renderModal = () => {
    return (
      <div style={OVERLAY_STYLE}>
        <Card style={MODAL_STYLES} id={bodypart.id}>
          <Button onClick={onClose} style={buttonStyle}>
            close
          </Button>
          <Button onClick={() => handlePopUp(bodypart)}>Learn More</Button>
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
          <div style={containerStyle}>
            <h2>{bodypart.title}</h2>
            <img src={bodypart.image} alt="body part" style={imageStyle} />
            <div>{/* <CardStepper bodypart={bodypart} /> */}</div>
          </div>
        </Card>
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
    <div>
      {renderModal()}
      <BodyPopUp
        bodypart={info}
        open={isExtended}
        onClose={() => setIsExtended(false)}
      />
    </div>,
    document.getElementById("portal")
  );
}

export default BodyModal;
