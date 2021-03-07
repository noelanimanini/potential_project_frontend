import React from "react";
import { Card, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const paperStyle = {
  padding: 7,
  margin: "10px",
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: "#EEE2DC",
  opacity: "45%",
};
const buttonStyle = { display: "flex" };

function StudyBar() {
  // const postClick = (e) => {
  //   e.persist()
  //   const token = localStorage.token
  //   fetch(`http://localhost:3000/study_groups`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type' : 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({

  //     })
  //   })
  // }

  return (
    <div style={paperStyle}>
      <Card>
        <Button style={buttonStyle}>
          <AddIcon></AddIcon>
        </Button>
      </Card>
    </div>
  );
}

export default StudyBar;
