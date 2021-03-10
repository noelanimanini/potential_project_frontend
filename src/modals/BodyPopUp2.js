import React, { useState } from "react";
import { Button, Card, CardActionArea, CardActions } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

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

function BodyPopUp2({ open, onClose, bodypart }) {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments);
  const userStacks = useSelector((state) => state.userStacks);

  if (!open) return null;
  console.log(bodypart);
  // const submitNotes = (e, notes) => {
  //   e.preventDefault();
  //   console.log(userStacks);
  //   const token = localStorage.token;
  //   fetch(`http://localhost:3000/user_body_parts/${notes.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       user_body_part: {
  //         comments: comment,
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       dispatch({
  //         type: "UPDATE_USER_BODY_PART_IN_STACK",
  //         user_body_part: data,
  //       });
  //     });
  // };

  return (
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLES}>
        <Card>
          <iframe
            height="550"
            width="550"
            src={bodypart.body_part.link}
          ></iframe>
          <CardActionArea>
            <CardActions>
              <Button onClick={onClose}>close</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default BodyPopUp2;
