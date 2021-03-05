import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import BodyModal from "./modals/BodyModal";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import BodyPopUp from "./BodyPopUp";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    position: "relative",
    //   backgroundColor: 'antiquewhite',
  },
  media: {
    height: 200,
  },
  stack: {
    alignItems: "center",
    padding: "14px",
  },
}));

const BodyContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bodyparts = useSelector((state) => state.bodyparts);
  const card = useSelector((state) => state.userStacks);
  const divStyle = { display: "flex", flexWrap: "wrap" };
  const [isOpen, setIsOpen] = useState(false);
  const [part, setPart] = useState(null);
  const [isExtended, setIsExtended] = useState(false);
  const [info, setInfo] = useState(null);

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

  const renderCards = () => {
    return bodyparts.map((part) => (
      <Grid className={classes.stack} key={part.id}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={part.image}
              title={part.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {part.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleClick(part)}
            >
              Stack
            </Button>

            <Button onClick={() => handlePopUp(part)}>Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  const handleClick = (part) => {
    setPart(part);
    setIsOpen(true);
  };

  const handlePopUp = (part) => {
    setIsExtended(true);
    setInfo(part);
  };

  return (
    <div style={divStyle}>
      {renderCards()}
      <BodyModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        bodypart={part}
        card={card}
      ></BodyModal>

      <BodyPopUp
        bodypart={info}
        open={isExtended}
        onClose={() => setIsExtended(false)}
      />
    </div>
  );
};

export default BodyContainer;
