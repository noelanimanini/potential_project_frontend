import React from "react";
import ReactDom from "react-dom";
import { Button } from "@material-ui/core";

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

function BodyPopUp({ open, onClose, bodypart }) {
  if (!open) return null;

  console.log(bodypart);
  return ReactDom.createPortal(
    <div style={MODAL_STYLES}>
      <Button onClick={onClose}>close</Button>
      {/* <span
        data-trigger="popup"
        data-location="left"
        data-target="ulcers"
      ></span> */}

      <div className="human-popup" id="ulcers">
        <div className="header">
          {/* <span className="close-btn">&times;</span> */}
        </div>

        <iframe height="350" width="350" src={bodypart.link}></iframe>
        <div className="arrow"></div>
      </div>
    </div>,
    document.getElementById("window")
  );
}

export default BodyPopUp;
