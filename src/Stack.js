import React, { Fragment } from "react";
import {
  Card,
  makeStyles,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModalStack from "./modals/ModalStack";
import { useState } from "react";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: theme.spacing(1.5),
    margin: "2px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Stack = () => {
  const classes = useStyles();
  const cardStyle = { width: "50%", margin: "2%" };
  const trashStyle = { position: "relative", left: "100px" };
  const dispatch = useDispatch();

  const userStacks = useSelector((state) => state.userStacks);
  const [isOpenCard, setOpenCard] = useState(false);
  const [stack, setStack] = useState(null);

  console.log(userStacks);

  const changeStackForm = (data) => {
    dispatch({
      type: "FILTER_FORM",
      input: data,
    });
  };

  const renderStacks = () => {
    return userStacks.map((stack) => (
      <Card className={classes.root} variant="outlined" id={stack.id}>
        <div>
          <Typography> Title: {stack.title}</Typography>
          <Typography> Description: {stack.description}</Typography>
        </div>
        <CardActions>
          <Button onClick={() => handleLearn(stack)} color="secondary">
            Edit Stack
          </Button>
          <Button onClick={() => handleDelete(stack)} style={trashStyle}>
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </Button>
        </CardActions>
      </Card>
    ));
  };

  const handleLearn = (stack) => {
    setOpenCard(true);
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
    }).then(() =>
      dispatch({
        type: "DELETE_STACK",
        id: stack.id,
      })
    );
  };

  return (
    <Fragment>
      <SearchBar />
      <div style={cardStyle}>
        {renderStacks()}

        <ModalStack
          open={isOpenCard}
          onClose={() => setOpenCard(false)}
          cardInfo={stack}
          setStack={setStack}
          changeStackForm={changeStackForm}
        ></ModalStack>
      </div>
    </Fragment>
  );
};

export default Stack;
