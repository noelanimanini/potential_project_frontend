import React from "react";
import { Card, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";

function SearchBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const buttonStyle = { display: "flex" };
  const paperStyle = {
    padding: 7,
    margin: "10px",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#EEE2DC",
    opacity: "45%",
  };

  const stackClick = (e) => {
    e.persist();
    console.log(user);
    const token = localStorage.token;
    fetch("http://localhost:3000/card_stacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Stack",
        user_id: user.id,
        description: "new stack",
      }),
    })
      .then((response) => response.json())
      .then((newStack) =>
        dispatch({
          type: "ADD_STACK",
          newStack: newStack,
        })
      );
  };
  return (
    <Card style={paperStyle}>
      <div style={buttonStyle}>
        {/* <InputBase 
                    placeholder='search for stacks' 
                    onChange={(e) => handleChange(e)}
                    /> */}
        <Button onClick={(e) => stackClick(e)}>
          <AddIcon></AddIcon>
        </Button>
      </div>
    </Card>
  );
}

export default SearchBar;
