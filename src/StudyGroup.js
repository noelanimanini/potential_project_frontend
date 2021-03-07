import React, { Fragment } from "react";
import NavBar from "./NavBar";
import { Paper, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import StudyBar from "./StudyBar";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: "74em",
  margin: "20px auto",
};

const gridStyle = {
  display: "flex",
  float: "left",
  margin: "15px",
};

function StudyGroup() {
  const studyGroups = useSelector((state) => state.studyGroups);
  const system = useSelector((state) => state.userStacks);
  const studyGroup = () => {
    console.log(system);
    console.log(studyGroups);
    return (
      <Grid style={gridStyle}>
        <Paper elevation={10} style={paperStyle}>
          {studyGroups.map((group) => (
            <Typography>Study Group: {group.name}</Typography>
          ))}

          {/* {system.user_body_parts.body_part.map((system) => (
            <Typography>System: {system.title}</Typography>
          ))} */}
        </Paper>
      </Grid>
    );
  };

  return (
    <Fragment>
      <NavBar />
      <StudyBar />
      {studyGroup()}
    </Fragment>
  );
}

export default StudyGroup;
