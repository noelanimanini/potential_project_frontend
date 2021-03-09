import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";
import StudyModal from "./modals/StudyModal";
import { makeStyles } from "@material-ui/core/styles";
import neuron from "./neuron.png";
import LearnModal from "./modals/LearnModal";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const paperStyle = {
  // padding: 25,
  // width: "74em",
  // margin: "auto",
  padding: 20,
  height: "50vh",
  width: "74em",
  margin: "auto",
  position: "relative",
  bottom: "50px",
  opacity: "95%",
};

const gridStyle = {
  height: "100vh",
  // float: "left",
  // margin: "15px",
};

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 2,
  },
});

function StudyCard() {
  const classes = useStyles();
  const studyGroups = useSelector((state) => state.studyGroups);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isStudyInfo, setStudyInfo] = React.useState(null);
  const [isCardOpen, setIsCardOpen] = React.useState(false);
  const [isPopUp, setIsPopUp] = React.useState(null);
  const dispatch = useDispatch();

  const datetime = (group) => {
    let date = group.date;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  console.log(studyGroups);
  const handleCard = (group) => {
    console.log(group);
    setIsOpen(true);
    setStudyInfo(group);
  };

  const handleDelete = (group) => {
    const token = localStorage.token;
    fetch(`http://localhost:3000/study_groups/${group.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      // let newStudyCard = studyCard.user_body_parts.filter(
      //   (card) => card.id !== studyCard.id
      // );
      // studyCard.user_body_parts = newStudyCard;
      setStudyInfo(studyGroups);
      dispatch({
        type: "DELETE_STUDY_GROUP",
        id: group.id,
      });
    });
  };

  const handleLearn = (group) => {
    setIsCardOpen(true);
    setIsPopUp(group);
  };

  const studyCard = () => {
    return (
      <Grid style={gridStyle}>
        <Paper elevation={1} style={paperStyle}>
          <div className="div-style">
            {studyGroups.map((group) => (
              // <div onClick={() => handleCard(group)}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <div onClick={() => handleCard(group)}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {datetime(group)}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {group.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {group.description}
                    </Typography>
                  </div>
                  <CardActions>
                    <CardActionArea>
                      <Button size="small" onClick={() => handleDelete(group)}>
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                      </Button>
                      <Button onClick={() => handleLearn(group)}>
                        <img src={neuron} className="neuron-style" />
                      </Button>
                    </CardActionArea>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
            <div>
              <StudyModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                studyCard={isStudyInfo}
                handleDelete={handleDelete}
              />
            </div>
            <div>
              <LearnModal
                open={isCardOpen}
                onClose={() => setIsCardOpen(false)}
                learnModal={isPopUp}
              />
            </div>
          </div>
        </Paper>
      </Grid>
    );
  };

  return <div>{studyCard()}</div>;
}

export default StudyCard;
