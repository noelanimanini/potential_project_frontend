import React from "react";
import { Button, Drawer, List, Divider, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";

export default function Menu() {
  const [state, setState] = React.useState(false);
  const buttonStyle = { position: "relative", top: "8.5px" };
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: "SET_USER",
      user: {},
    });
    dispatch({
      type: "CHANGE_USERNAME_INPUT",
      usernameInput: "",
    });
    dispatch({
      type: "CHANGE_PASSWORD_INPUT",
      passwordInput: "",
    });
  };

  const list = () => (
    <div onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          {
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              Profile
            </Link>
          }
        </ListItem>
        <ListItem>
          {
            <Link
              to="/study_groups"
              style={{ textDecoration: "none", color: "black" }}
            >
              Study Groups
            </Link>
          }
        </ListItem>
        <ListItem>
          {
            <Link
              to="/account"
              style={{ textDecoration: "none", color: "black" }}
            >
              Settings
            </Link>
          }
        </ListItem>
        {!localStorage.token && <Redirect to="/login" />}
        <ListItem button onClick={handleLogout}>
          Logout
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} style={buttonStyle}>
        Menu
      </Button>
      <Drawer anchor={"top"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
