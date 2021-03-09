import React, { Fragment } from "react";
import NavBar from "./NavBar";
import { Button, Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const gridStyle = {
  height: "100vh",
  // float: "left",
  // margin: "15px",
};

function Account() {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: "75%",
    margin: "20px auto",
  };
  const user = useSelector((state) => state.user);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(user);
  const renderAccount = () => {
    return (
      <div className="account-info">
        <h1>Account Information</h1>
        <h2>username: {user.username}</h2>
      </div>
    );
  };

  const handleDeleteModal = () => {
    return (
      <div>
        <Button onClick={openModal}> Delete your account? </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className="account-info">Are you sure? </h2>
          <h4>you can't undo this action.</h4>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <Button onClick={() => handleDelete(user)}>Yes I'm sure</Button>
          </Link>
          <Button onClick={closeModal}>close</Button>
        </Modal>
      </div>
    );
  };

  const handleDelete = (user) => {
    console.log(user);
    const token = localStorage.token;
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => alert("your account was deleted! We will miss you :("));
  };

  return (
    <Fragment>
      <div className="account-background">
        <NavBar />
        <Grid style={gridStyle}>
          <Paper elevation={20} style={paperStyle}>
            {renderAccount()}
            {handleDeleteModal()}
          </Paper>
        </Grid>
      </div>
    </Fragment>
  );
}

export default Account;
