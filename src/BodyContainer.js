import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BodyCard from "./BodyCard";

const BodyContainer = () => {
  const dispatch = useDispatch();
  const bodyparts = useSelector((state) => state.bodyparts);

  useEffect(() => {
    const token = localStorage.token;
    if (bodyparts.length === 0) {
      getBodyParts(token);
    }
  });

  const getBodyParts = (token) => {
    fetch("http://localhost:3000/body_parts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((bodyparts) =>
        dispatch({
          type: "SET_BODY_PARTS",
          bodyparts: bodyparts,
        })
      );
  };

  return <BodyCard />;
};

export default BodyContainer;
