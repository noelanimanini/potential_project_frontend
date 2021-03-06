import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import BodyContainer from "./BodyContainer";
import NavBar from "./NavBar";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.token;
    // console.log(token)
    if (!user) {
      if (localStorage.token) {
        persistUser(token);
      }
    }
  });

  const persistUser = (token) => {
    fetch("http://localhost:3000/persist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => authResponse(data));
  };

  const authResponse = (data) => {
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      dispatch({
        type: "SET_USER",
        user: {
          username: data.user.username,
          id: data.user.id,
        },
      });
      dispatch({
        type: "SET_STACKS",
        userStacks: data.user.card_stacks,
      });
      //   dispatch({
      //     type: "SET_STUDY_GROUPS",
      //     studyGroups: data.user.study_groups,
      //   });
      // }
    }
  };
  console.log(user);
  return (
    <Fragment>
      <div className="home-container">
        <NavBar />
        <BodyContainer />
      </div>
    </Fragment>
  );
};

export default Home;
