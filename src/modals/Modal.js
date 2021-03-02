import React from 'react'
import {Button, Typography, Menu, MenuItem} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReactDom from 'react-dom'
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import {useSelector, useDispatch} from 'react-redux'
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'

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

// const OVERLAY_STYLE = {
//     postion: 'fixed',
//     top: 0, 
//     left: 0, 
//     right: 0, 
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0, .7)',
//     zIndex: 10000
// }
function Modal({open, onClose, bodypart, card}) {
    const buttonStyle = {display: 'flex'}
    console.log(card)
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
               <div style={MODAL_STYLES} id={bodypart.id}>
                {bodypart.title}
                <img src={bodypart.image} />
               
                <Button onClick={onClose}>
                    <HighlightOffIcon style={buttonStyle}></HighlightOffIcon>
                </Button>
                <Button onClick={handleClick}>
                    <AddBoxTwoToneIcon>
                    </AddBoxTwoToneIcon>
                </Button>
                <Menu 
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    
                    <MenuItem onClick={(e) => handleItem(e, bodypart)}
                    ></MenuItem>
                    </Menu>
                </div>
           ) 
    }


    const handleItem = (e, bodypart) => {
        console.log(bodypart)

        e.preventDefault()
        // const token = localStorage.token
        // fetch('http://localhost:3000/user_body_part',{
        //     method: "POST",
        //     headers: {
        //         'Content-Type' : 'application/json', 
        //         Authorization: `Bearer ${token}`
        //     }, 
        //     body: JSON.stringify({
        //         card_stack_id: card.id,
        //         body_part_id: bodypart.id
        //     })
        // }).then(response => response.json())
    }
    

    return ReactDom.createPortal(
        <>
        {/* <div style={OVERLAY_STYLE} id={bodyPartID}/> */}
            <li>
                {renderModal()}
            </li>
            {/* <div style={MODAL_STYLES} id={bodyPartID}>
            <CardActionArea>
                    <CardMedia
                        image={image}
                        title={title}
                        />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                        {title}
                </Typography>
            </CardContent>
            <Button onClick={onClose}><HighlightOffIcon style={buttonStyle}></HighlightOffIcon></Button>
            <Button onClick={(e) => handleClick(e)}><AddBoxTwoToneIcon></AddBoxTwoToneIcon></Button> 
            </div>
        */}
        </>, 
        document.getElementById('portal')
    )
}

export default Modal
