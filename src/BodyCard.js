import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import BodyModal from "./modals/BodyModal";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    position: "relative",
  },
  media: {
    height: "200px",
    width: "15em",
  },
  stack: {
    alignItems: "center",
    padding: "14px",
  },
}));

function BodyCard() {
  const divStyle = { display: "flex", flexWrap: "wrap" };
  const bodyparts = useSelector((state) => state.bodyparts);
  const card = useSelector((state) => state.userStacks);
  // const [info, setInfo] = useState(null);
  const [part, setPart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [isExtended, setIsExtended] = useState(false);
  const classes = useStyles();
  const handleClick = (part) => {
    setPart(part);
    setIsOpen(true);
  };

  // const handlePopUp = (part) => {
  //   setIsExtended(true);
  //   setInfo(part);
  // };

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
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleClick(part)}
            >
              Stack
            </Button>

            {/* <Button onClick={() => handlePopUp(part)}>Learn More</Button> */}
          </CardActions>
        </Card>
      </Grid>
    ));
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

      {/* <BodyPopUp
        bodypart={info}
        open={isExtended}
        onClose={() => setIsExtended(false)}
      /> */}
    </div>
  );
}

export default BodyCard;
