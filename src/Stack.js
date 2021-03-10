import React, { Fragment } from "react";
import {
  Card,
  makeStyles,
  CardActions,
  Typography,
  Button,
  Paper,
  Grid,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModalForm from "./modals/ModalForm";
import ModalStack from "./modals/ModalStack";
import { useState } from "react";
import SearchBar from "./SearchBar";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "10px",
  },
  media: {
    height: 140,
  },
});

const Stack = () => {
  const classes = useStyles();
  const cardStyle = {
    display: "flex",
    margin: "2%",
  };
  const trashStyle = { position: "relative", left: "10%", color: "#AC3B61" };
  const buttonStyle = { color: "#AC3B61" };
  const stackStyle = { position: "relative", left: "23%", color: "#AC3B61" };
  const divStyle = { width: "30%" };
  const dispatch = useDispatch();

  const userStacks = useSelector((state) => state.userStacks);
  const [isOpenCard, setOpenCard] = useState(false);
  const [isOpenStack, setOpenStack] = useState(false);
  const [stack, setStack] = useState(null);

  console.log("this is the userStacks", userStacks);

  // const changeStackForm = (data) => {
  //   dispatch({
  //     type: "FILTER_FORM",
  //     input: data,
  //   });

  const renderStacks = () => {
    return userStacks.map((stack) => (
      <div style={divStyle}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {stack.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {stack.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              style={buttonStyle}
              onClick={() => handleLearn(stack)}
            >
              Edit Stack
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => handleDelete(stack)}
              style={trashStyle}
            >
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </Button>
            <Button
              size="small"
              style={stackStyle}
              onClick={() => handleStack(stack)}
            >
              See Stack
            </Button>
          </CardActions>
        </Card>
      </div>

      // <Card className={classes.root} variant="outlined" key={stack.id}>
      //   <div>
      //     <Typography> {stack.title}</Typography>
      //     <Typography> {stack.description}</Typography>
      //   </div>
      //   <CardActions>
      //     <Button onClick={() => handleLearn(stack)} color="secondary">
      //       Edit Stack
      //     </Button>
      //     <Button onClick={() => handleStack(stack)} color="secondary">
      //       See Stack
      //     </Button>
      //     <Button onClick={() => handleDelete(stack)} style={trashStyle}>
      //       <DeleteOutlineIcon></DeleteOutlineIcon>
      //     </Button>
      //   </CardActions>
      // </Card>
    ));
  };

  const handleLearn = (stack) => {
    setOpenCard(true);
    setStack(stack);
  };

  const handleStack = (stack) => {
    setOpenStack(true);
    setStack(stack);
  };

  const handleDelete = (stack) => {
    const token = localStorage.token;
    fetch(`http://localhost:3000/card_stacks/${stack.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      dispatch({
        type: "DELETE_STACK",
        id: stack.id,
      });
    });
  };
  console.log(stack, setStack);
  return (
    <Fragment>
      <SearchBar />
      <div style={cardStyle}>
        {renderStacks()}

        <ModalForm
          open={isOpenCard}
          onClose={() => setOpenCard(false)}
          cardInfo={stack}
          setStack={setStack}
        />
        <ModalStack
          open={isOpenStack}
          onClose={() => setOpenStack(false)}
          cardInfo={stack}
          setStack={setStack}
        />
        {/* <ModalStack
          open={isOpenCard}
          onClose={() => setOpenCard(false)}
          cardInfo={stack}
          setStack={setStack}
          changeStackForm={changeStackForm}
        ></ModalStack> */}
      </div>
    </Fragment>
  );
};

export default Stack;
