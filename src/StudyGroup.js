import React, { Fragment } from "react";
import NavBar from "./NavBar";
import { Paper, Grid } from "@material-ui/core";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: "20px auto",
};

const gridStyle = {
  display: "flex",
  float: "left",
  margin: "15px",
};

function StudyGroup() {
  const studyGroup = () => {
    return (
      <Grid style={gridStyle}>
        <Paper elevation={10} style={paperStyle}>
          whats up
        </Paper>
      </Grid>
    );
  };

  return (
    <Fragment>
      <NavBar />
      {studyGroup()}
    </Fragment>
  );
}

export default StudyGroup;
