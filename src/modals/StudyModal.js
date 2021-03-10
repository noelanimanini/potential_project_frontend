import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import ReactDom from "react-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/Close";
import neuron from "../neuron.png";
import LearnModal from "./LearnModal";
import Modal from "react-modal";
import Comments from "../Comments";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "2em",
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

const useStyles = makeStyles({
  root: {
    width: "50%",
  },
});

function StudyModal({ open, onClose, studyCard, handleDelete, setStudyInfo }) {
  const classes = useStyles();
  const stuff = useSelector((state) => state.studyGroups);

  console.log(stuff);
  if (!open) return null;
  console.log(studyCard);

  const datetime = (studyCard) => {
    let date = studyCard.date;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // const handleLearn = (studyCard) => {
  //   setIsCardOpen(true);
  //   setIsPopUp(studyCard);
  // };
  return ReactDom.createPortal(
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLES}>
        <Card className={classes.root}>
          <CardActions>
            <Button onClick={onClose}>
              <CloseIcon></CloseIcon>
            </Button>
          </CardActions>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={studyCard.body_part.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {studyCard.body_part.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {studyCard.name} will meet {datetime(studyCard)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Button onClick={() => handleDelete(studyCard)}>
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </Button> */}
            {/* <div className="button-style">
              <Button onClick={() => handleLearn(studyCard)}>
                <img src={neuron} className="neuron-style" />
              </Button>
            </div> */}
          </CardActions>
        </Card>
        <Comments studyCard={studyCard} setStudyInfo={setStudyInfo} />
      </div>
    </div>,

    document.getElementById("portal")
  );
}

export default StudyModal;
