import React, { Fragment, useEffect } from "react";
import NavBar from "./NavBar";
// import { Paper, Grid, Typography, Card } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import StudyBar from "./StudyBar";
import StudyCard from "./StudyCard";

// const paperStyle = {
//   padding: 15,
//   height: "69vh",
//   width: "74em",
//   margin: "auto",
// };

// const gridStyle = {
//   display: "flex",
//   float: "left",
//   margin: "15px",
// };

function StudyGroup() {
  // const studyGroups = useSelector((state) => state.studyGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.token;
    setStudyGroups(token);
  }, []);

  const setStudyGroups = (token) => {
    fetch("http://localhost:3000/study_groups", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_STUDY_GROUPS",
          studyGroups: data,
        });
      });
  };

  // const studyGroup = () => {
  //   const datetime = (group) => {
  //     let date = group.date;
  //     const options = { year: "numeric", month: "long", day: "numeric" };
  //     return new Date(date).toLocaleDateString(undefined, options);
  //   };
  //   return (
  //     <Grid style={gridStyle}>
  //       <Paper elevation={1} style={paperStyle}>
  //         <Typography>
  //           <h4>Study Groups</h4>
  //         </Typography>
  //         <div>
  //           {studyGroups.length !== 0 &&
  //             studyGroups.map((group) => {
  //               group.name && (
  //                 <Paper>
  //                   <Card>
  //                     <Typography>
  //                       <div>{group.name}</div>
  //                       <div>{group.description}</div>
  //                       <div>{datetime(group)}</div>
  //                     </Typography>
  //                   </Card>
  //                 </Paper>
  //               );
  //             })}
  //         </div>

  //         {/* {system.user_body_parts.body_part.map((system) => (
  //           <Typography>System: {system.title}</Typography>
  //         ))} */}
  //       </Paper>
  //     </Grid>
  //   );
  // };

  return (
    <Fragment>
      <NavBar />
      <StudyBar />
      <StudyCard />
    </Fragment>
  );
}

export default StudyGroup;
