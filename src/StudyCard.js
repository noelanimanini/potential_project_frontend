import React from "react";
import { useSelector } from "react-redux";
import { Paper, Grid, Typography, Card } from "@material-ui/core";

const paperStyle = {
  padding: 15,
  height: "69vh",
  width: "74em",
  margin: "auto",
};

const gridStyle = {
  float: "left",
  margin: "15px",
};

const cardStyle = {
  display: "flex",
  justifyContent: "space-around",
};

function StudyCard() {
  const studyGroups = useSelector((state) => state.studyGroups);
  console.log(studyGroups);
  const datetime = (group) => {
    let date = group.date;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Grid style={gridStyle}>
      <Paper elevation={1} style={paperStyle}>
        <Typography>
          <h4>Study Groups</h4>
        </Typography>
        <div style={cardStyle}>
          {studyGroups.map((group) => (
            <Grid>
              <Paper>
                <Card>
                  <Typography>
                    <div>{group.name}</div>
                    <div>{group.description}</div>
                    <div>{datetime(group)}</div>
                  </Typography>
                </Card>
              </Paper>
            </Grid>
          ))}
        </div>

        {/* {system.user_body_parts.body_part.map((system) => (
        <Typography>System: {system.title}</Typography>
      ))} */}
      </Paper>
    </Grid>
  );
}

export default StudyCard;
