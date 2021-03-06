import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import { Typography, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BodyPopUp2 from "./BodyPopUp2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50em",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "50px",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: "41px 165px",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function AccordionModal({ bodypart, handleDelete, setStack }) {
  const classes = useStyles();
  const imageStyle = { width: "39%", position: "relative", left: "80px" };
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isBodyPart, setBodyPart] = useState(null);

  // const handleDelete = (bodypart) => {
  //   const token = localStorage.token;
  //   fetch(`http://localhost:3000/user_body_parts/${bodypart.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then(() => {
  //     dispatch({
  //       type: "DELETE_JOIN_CARD_STACK",
  //       id: bodypart.id,
  //     });
  //   });
  // };

  // const editNotes = (e, bodypart) => {
  //   e.preventDefault();
  //   const token = localStorage.token;

  //   fetch(`http://localhost:3000/user_body_parts/${bodypart.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: {

  //     }
  //   })

  const handleLearn = (bodypart) => {
    setIsOpen(true);
    setBodyPart(bodypart);
  };

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography>{bodypart.body_part.title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <Typography>
            <img src={bodypart.body_part.image} style={imageStyle} />
            {/* {cardInfo.user_body_parts[0].body_part.title} */}
          </Typography>
          <div className={clsx(classes.column, classes.helper)}>
            {/* {bodypart.comments} */}
            <Button size="small" onClick={() => handleDelete(bodypart)}>
              Delete
            </Button>
            <Button>
              {
                <Link
                  to="/study_groups"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Study Groups
                </Link>
              }
            </Button>
            <Button onClick={() => handleLearn(bodypart)}>Learn More</Button>
          </div>
          {/* <Button onClick={(e) => editNotes(e, bodypart)}>Edit Notes</Button> */}
        </AccordionDetails>
        <Divider />
        {/* <AccordionActions>
          <Button size="small" onClick={() => handleDelete(bodypart)}>
            Delete
          </Button>
          <Button style={{ textDecoration: "none", color: "black" }}>
            {<Link to="/study_groups">Study Groups</Link>}
          </Button> */}
        {/* <Button size="small" onClick={editNotes(bodypart)}>
            Edit Notes
          </Button> */}
        {/* </AccordionActions> */}
      </Accordion>
      <div>
        <BodyPopUp2
          open={isOpen}
          onClose={() => setIsOpen(false)}
          bodypart={isBodyPart}
        />
      </div>
    </div>
  );
}

export default AccordionModal;
