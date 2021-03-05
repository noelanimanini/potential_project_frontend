import React, {Fragment} from 'react'
import NavBar from './NavBar'
import { Button, Paper} from '@material-ui/core';
import {useSelector} from 'react-redux'
import Modal from 'react-modal'
import {Link} from 'react-router-dom'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }

function Account() {
    const paperStyle = {padding: 20, height: '50vh', width: '75%', margin: "20px auto"}
    const user = useSelector(state => state.user)
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
    setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }

      function closeModal(){
        setIsOpen(false);
    }

    const renderAccount = () => {
        return (
            <div>
                
                    <h1>Account Information</h1>
                    <h2>username: {user.username}</h2>
               
                
            </div>
        )  
    }

    const handleDeleteModal = () => {
        return(
            <div>
                <Button onClick={openModal}> Delete your account? </Button>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
 
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Are you sure? </h2>
                <h4>you can't undo this action.</h4>
                <Link to='/login'>
                    <Button onClick={() => handleDelete(user)}>Yes I'm sure</Button>
                </Link>
                <Button onClick={closeModal}>close</Button>
                </Modal>
            </div>
        )
    }

    const handleDelete = (user) => {
       console.log(user)
       const token = localStorage.token
       fetch(`http://localhost:3000/users/${user.id}`,{
           method: "DELETE",
           headers: {
               'Content-Type' : 'application/json', 
               Authorization: `Bearer ${token}`
           },
       }).then(() => alert('your account was deleted! We will miss you :('))
    }

    return (
       <Fragment>
        <NavBar/>
        <Paper elevation={20} style={paperStyle}>
            {renderAccount()}
            {handleDeleteModal()}
        </Paper>
        
       </Fragment>
    )
}

export default Account
