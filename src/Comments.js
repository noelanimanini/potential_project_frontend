import {
  Card,
  CardActionArea,
  CardActions,
  Fab,
  ListItem,
  List,
  TextField,
  Paper,
  Button,
  CardContent,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import neuron from "./neuron.png";

function Comments({ studyCard, setStudyInfo }) {
  const comments = useSelector((state) => state.comments);
  const studyGroups = useSelector((state) => state.studyGroups);
  const commentInput = useSelector((state) => state.commentInput);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.token;
  //   fetchComments(token);
  // }, []);

  // const fetchComments = (token) => {
  //   fetch("http://localhost:3000/comments", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((comments) =>
  //       dispatch({
  //         type: "SET_COMMENTS",
  //         comments: comments,
  //       })
  //     );
  // };
  console.log(studyGroups);
  const handleChange = (e, studyCard) => {
    console.log("this is the studycard", studyCard);
    console.log("this is the studygroup", studyGroups);
    console.log(user);
    e.preventDefault();
    console.log(e.target.value);
    const token = localStorage.token;
    // debugger;
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: {
          study_group_id: studyCard.id,
          user_id: user.id,
          comment: commentInput,
        },
      }),
    })
      .then((response) => response.json())
      .then((comment) => {
        console.log(comment);
        // debugger;
        setStudyInfo({
          ...studyCard,
          comments: [...studyCard.comments, comment],
        });
        dispatch({
          type: "ADD_COMMENT_TO_USER_STUDY_GROUP",
          comment: comment,
        });
      });
  };

  const styleComments = (group) => {
    if (group.comment.length > 10) {
      return {
        wordWrap: "break-word",
      };
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "18px",
        }}
      >
        <Card>
          <Paper elevation={4} style={{ padding: "3px" }}>
            <Paper style={{ maxHeight: 320, overflow: "auto" }}>
              <List style={{ maxHeight: "270px", maxWidth: "230px" }}>
                {studyCard.comments.map((group) => (
                  <ListItem>
                    <div style={{ wordBreak: "break-word" }}>
                      {group.comment}
                    </div>
                  </ListItem>
                ))}
              </List>
            </Paper>

            <CardActionArea
              style={{ paddingRight: "10px", paddingLeft: "10px" }}
            >
              <form onSubmit={(e) => handleChange(e, studyCard)}>
                <TextField
                  placeholder="  create a comment"
                  onChange={(e) =>
                    dispatch({
                      type: "COMMENT_INPUT",
                      value: e.target.value,
                    })
                  }
                />

                <Button color="secondary" size="small" type="submit">
                  <img src={neuron} className="neuron-style" />
                </Button>
              </form>
            </CardActionArea>
          </Paper>
        </Card>
      </div>
    </div>
  );
}

export default Comments;
