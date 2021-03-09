import React from "react";
import ReactDom from "react-dom";
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "10px",
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

function LearnModal({ open, onClose, learnModal }) {
  if (!open) return null;
  console.log(learnModal);
  return ReactDom.createPortal(
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLES}>
        <Button onClick={onClose}> close</Button>
        <iframe
          height="550"
          width="550"
          src={learnModal.body_part.link}
        ></iframe>
      </div>
    </div>,
    document.getElementById("learn")
  );
}

export default LearnModal;
