import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

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

const formStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "9px",
};

function ModalForm({ open, cardInfo, setOpenEdit, onClose, setStack }) {
  const dispatch = useDispatch();
  const formTitleInput = useSelector((state) => state.formTitleInput);
  const formDescriptionInput = useSelector(
    (state) => state.formDescriptionInput
  );
  const user = useSelector((state) => state.user);
  console.log(user);
  if (!open) return null;
  const submitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.token;
    console.log(e);
    fetch(`http://localhost:3000/card_stacks/${cardInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        card_stack: {
          title: formTitleInput,
          description: formDescriptionInput,
          user_id: user.id,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => handleForm(data));
  };

  const handleForm = (data) => {
    console.log(data);
    setStack(data);
    dispatch({
      type: "SET_FORM",
      form: data,
    });
  };

  return (
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLES}>
        <form onSubmit={(e) => submitHandler(e)} style={formStyle}>
          <TextField
            id="standard-basic"
            label="Edit Your Stack Title"
            onChange={(e) =>
              dispatch({
                type: "CHANGE_TITLE_INPUT",
                value: e.target.value,
              })
            }
          />

          <TextField
            id="standard-basic"
            label="Edit Your Description"
            onChange={(e) =>
              dispatch({
                type: "CHANGE_DESCRIPTION_INPUT",
                value: e.target.value,
              })
            }
          />
          <Button onClick={onClose}>close</Button>

          <Button type="submit" value="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
