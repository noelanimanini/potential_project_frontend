import React from 'react'
import {Button, Typography, Menu, MenuItem} from '@material-ui/core'
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import ReactDom from 'react-dom'
import {useSelector, useDispatch} from 'react-redux'
import RenderCards from '../RenderCards'

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

function Modal({open, onClose, bodypart, card}) {
    const buttonStyle = {display: 'flex'}
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
                {/* <ListItem button onClick={handleClick}>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button >
                            <ListItemText primary="Starred" />
                        </ListItem>
                        </List>
                    </Collapse> */}
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
                            
                    {card.map( cardTitle => (
                    <MenuItem onClick={(e) => handleItem(e, bodypart, cardTitle)}>
                        {cardTitle.title}
                    </MenuItem>
    
                    ))}        
            
               </Menu>
                </div>
           ) 
    }


    const handleItem = (e, bodypart, card) => {
        console.log(bodypart)

        e.preventDefault()
        const token = localStorage.token
        fetch('http://localhost:3000/user_body_parts',{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify({
                card_stack_id: card.id,
                body_part_id: bodypart.id
            })
        }).then(response => response.json())
        .then(data => console.log(data))
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
