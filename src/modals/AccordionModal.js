import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function AccordionModal({ bodypart }) {
  const classes = useStyles();
  const imageStyle = { height: "20vh" };
  const dispatch = useDispatch();

  const handleDelete = (bodypart) => {
    const token = localStorage.token;
    fetch(`http://localhost:3000/user_body_parts/${bodypart.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() =>
      dispatch({
        type: "DELETE_JOIN_CARD_STACK",
        id: bodypart.id,
      })
    );
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
          <div>put stuff here if you wanna</div>
          <div className={classes.column} />
          <div className={clsx(classes.column, classes.helper)}>
            <Typography>
              <img src={bodypart.body_part.image} style={imageStyle} />
              {/* {cardInfo.user_body_parts[0].body_part.title} */}
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={() => handleDelete(bodypart)}>
            Delete
          </Button>
          <Button size="small" color="primary">
            {<Link to="/study_groups">Study Groups</Link>}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default AccordionModal;