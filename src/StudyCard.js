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
} from "@material-ui/core";
import StudyModal from "./modals/StudyModal";
import { makeStyles } from "@material-ui/core/styles";

const paperStyle = {
  padding: 25,
  width: "74em",
  margin: "auto",
};

const gridStyle = {
  float: "left",
  margin: "15px",
};

const divStyle = {
  display: "flex",
  width: "30%",
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
    marginBottom: 12,
  },
});

function StudyCard() {
  const classes = useStyles();
  const studyGroups = useSelector((state) => state.studyGroups);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isStudyInfo, setStudyInfo] = React.useState(null);
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

  const handleDelete = (studyCard) => {
    const token = localStorage.token;
    fetch(`http://localhost:3000/study_groups/${studyCard.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setStudyInfo(studyGroups);
      // let newStudyCard = studyCard.user_body_parts.filter(
      //   (card) => card.id !== studyCard.id
      // );
      // studyCard.user_body_parts = newStudyCard;
      dispatch({
        type: "DELETE_STUDY_GROUP",
        id: studyCard.id,
      });
    });
  };

  const studyCard = () => {
    return (
      <Grid style={gridStyle}>
        <Paper elevation={1} style={paperStyle}>
          <div style={divStyle}>
            {studyGroups.map((group) => (
              <div onClick={() => handleCard(group)}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
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
                  </CardContent>
                </Card>
              </div>
            ))}
            <div>
              <StudyModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                studyCard={isStudyInfo}
                handleDelete={handleDelete}
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
