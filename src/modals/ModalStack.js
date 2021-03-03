import React from 'react'
import {Button, Typography, Menu, MenuItem, Input, TextField} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReactDom from 'react-dom'
import AddIcon from '@material-ui/icons/Add';
import ModalForm from './ModalForm'
import {useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux'
// import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
// import {useSelector, useDispatch} from 'react-redux'
// import CardActionArea from '@material-ui/core/CardActionArea';
// // import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '84px',
    zIndex: 1000,
    borderRadius: '10px',
    borderStyle: 'dotted',
}

function ModalStack({open, onClose, cardInfo}) {
    // const cards = useSelector(state => state.userStacks)
    // const dispatch = useDispatch()
    const [openEdit, setOpenEdit] = useState(false)
    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    //
    if (!open) return null

    const renderModal = () => {

           return (
               <div style={MODAL_STYLES}>
                   <Typography>
                       Title: {cardInfo.title}
                   </Typography>
                   <Typography>
                       Description: {cardInfo.description}
                   </Typography>
                   
                   <Button onClick={onClose}><HighlightOffIcon ></HighlightOffIcon></Button>
                   <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <AddIcon></AddIcon>
                    </Button>
                    <Menu 
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}> 

                    <MenuItem onClick={() => handleEditForm(cardInfo)} >Edit Stack</MenuItem>
                    </Menu>
                    
               </div>
           ) 
    }
   
    const handleEditForm = (cardInfo) => {
        console.log(cardInfo)
        setOpenEdit(true)
        handleClose()
        console.log(openEdit)
        
    }

    return ReactDom.createPortal(
      
        <div>
            <li>
                {renderModal()}
                <ModalForm open={openEdit} cardInfo={cardInfo} setOpenEdit={setOpenEdit} /> 


            </li>
        </div>,
            
            
        document.getElementById('portal')
    )
}

export default ModalStack


