import React from "react";
import { Paper, Grid, TextField, Button, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import potential from "./potential.png";

const Login = (props) => {
  const dispatch = useDispatch();
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "auto",
    position: "relative",
    top: "80px",
  };
  const paperStyle2 = {
    height: "100vh",
  };
  const buttonStyle = { margin: "8px 0" };
  const usernameInput = useSelector((state) => state.usernameInput);
  const passwordInput = useSelector((state) => state.passwordInput);
  const api = "http://localhost:3000/";

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => authResponse(data));
  };

  const authResponse = (data) => {
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      const token = data.token;
      localStorage.token = token;
      dispatch({
        type: "SET_USER",
        user: data.user,
      });
      dispatch({
        type: "SET_STACKS",
        userStacks: data.user.card_stacks,
      });
      // dispatch({
      //   type: "SET_STUDY_GROUPS",
      //   studyGroups: data.user.study_groups,
      // });
      // dispatch({
      //     type: 'SET_USER_BODY_PARTS',
      //     userBodyParts: data.userBodyParts
      // })
      //^^include this in my cardstack on the front end now
      props.history.push("/home");
    }
  };

  return (
    <div className="login-page">
      <form>
        <Grid style={paperStyle2}>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <img src={potential} alt="logo" />
            </Grid>
            <TextField
              label="Username"
              placeholder="Enter Username"
              name="username"
              fullWidth
              required
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_USERNAME_INPUT",
                  value: e.target.value,
                })
              }
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              name="password"
              type="password"
              fullWidth
              required
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_PASSWORD_INPUT",
                  value: e.target.value,
                })
              }
            />
            <Button
              type="submit"
              value="submit"
              style={buttonStyle}
              fullWidth
              variant="contained"
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>
            <Typography>
              {" "}
              Don't have an account?
              <Link to="/signup">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
