import React from "react";
import { Button, Typography, Menu, MenuItem } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ReactDom from "react-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalForm from "./ModalForm";
import { useState } from "react";
import AccordionModal from "./AccordionModal";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  if (!open) return null;

  const handleDelete = (bodypart) => {
    const token = localStorage.token;
    fetch(`http://localhost:3000/user_body_parts/${bodypart.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      let newBodyParts = cardInfo.user_body_parts.filter(
        (BP) => BP.id !== bodypart.id
      );
      cardInfo.user_body_parts = newBodyParts;
      setStack(cardInfo);
      dispatch({
        type: "DELETE_JOIN_CARD_STACK",
        id: bodypart.id,
      });
    });
  };

  const renderModal = () => {
    return (
      <div style={OVERLAY_STYLE}>
        <div style={MODAL_STYLES}>
          {cardInfo.user_body_parts.map((bodypart) => (
            <AccordionModal bodypart={bodypart} handleDelete={handleDelete} />
          ))}

          <Button onClick={onClose}>
            <HighlightOffIcon></HighlightOffIcon>
          </Button>
        </div>
      </div>
    );
  };

  return ReactDom.createPortal(
    <div>
      <li>
        {renderModal()}
        {/* <ModalForm
          open={openEdit}
          cardInfo={cardInfo}
          setOpenEdit={setOpenEdit}
          setStack={setStack}
          renderModal={renderModal()}
        /> */}
      </li>
    </div>,

    document.getElementById("portal")
  );
}

export default ModalStack;
