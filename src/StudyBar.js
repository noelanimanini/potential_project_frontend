import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  TextField,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const paperStyle = {
  padding: 7,
  margin: "10px",
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: "#EEE2DC",
  opacity: "45%",
};
const buttonStyle = { display: "flex" };
const wordStyle = { position: "fixed", right: "80px", top: "76.5px" };

const formStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "9px",
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function StudyBar() {
  const dispatch = useDispatch();
  const studyGroupNameInput = useSelector((state) => state.studyGroupNameInput);
  const studyGroupDate = useSelector((state) => state.studyGroupDate);
  const studyGroupDescriptionInput = useSelector(
    (state) => state.studyGroupDescriptionInput
  );
  const studyGroupSystem = useSelector((state) => state.studyGroupSystem);
  const bodyparts = useSelector((state) => state.bodyparts);
  const classes = useStyles();
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChangeMultiple = (e) => {
    dispatch({
      type: "STUDY_SYSTEM",
      value: e.target.value,
    });
  };

  const studyBar = () => {
    return (
      <div>
        <Card style={paperStyle}>
          <Typography style={wordStyle}>create a study group</Typography>
          <div style={buttonStyle}>
            <Button onClick={openModal}>
              <AddIcon></AddIcon>
            </Button>
          </div>
        </Card>
        <h4 className="study-group">Study Groups</h4>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.token;
    fetch("http://localhost:3000/study_groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        study_group: {
          name: studyGroupNameInput,
          date: studyGroupDate,
          description: studyGroupDescriptionInput,
          body_part_id: studyGroupSystem,
        },
      }),
    })
      .then((response) => response.json())
      .then((studygroup) => {
        dispatch({
          type: "ADD_STUDY_GROUPS",
          studygroup: studygroup,
        });
      });
  };
  //I can do payload instead of the action key. then every action will have a type and payload

  console.log(bodyparts);
  return (
    <div>
      {studyBar()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Button onClick={closeModal}>close</Button>
        <h2>Create A Study Group</h2>
        <form onSubmit={(e) => handleSubmit(e)} style={formStyle}>
          <TextField
            label="What are you going to call me?"
            onChange={(e) =>
              dispatch({
                type: "STUDY_GROUP_NAME",
                value: e.target.value,
              })
            }
          />
          <TextField
            id="datetime-local"
            label="study date"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              dispatch({
                type: "STUDY_DATE",
                value: e.target.value,
              })
            }
          />
          <TextField
            label="Comments"
            onChange={(e) =>
              dispatch({
                type: "STUDY_GROUP_DESCRIPTION",
                value: e.target.value,
              })
            }
          />
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Native
            </InputLabel>
            <Select
              multiple
              native
              onChange={(e) => handleChangeMultiple(e)}
              inputProps={{
                id: "select-multiple-native",
              }}
            >
              {bodyparts.map((bodypart) => (
                <option key={bodypart.id} value={bodypart.id}>
                  {bodypart.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit">Enter</Button>
        </form>
      </Modal>
    </div>
  );
}

export default StudyBar;
