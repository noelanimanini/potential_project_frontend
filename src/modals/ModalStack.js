import React from 'react'
import {Button, Typography} from '@material-ui/core'
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

function ModalStack({open, onClose, cardInfo}) {
    
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
                    {/* <Typography>
                        {cardInfo}
                    </Typography>
                    <Button onClick={onClose}><HighlightOffIcon style={buttonStyle}></HighlightOffIcon></Button>
                    <Button onClick={(e) => handleClick(e)}><AddBoxTwoToneIcon></AddBoxTwoToneIcon></Button> */}
               </div>
           ) 
    }
   

    return ReactDom.createPortal(
        <div>
            <li>
                {renderModal()}
            </li>
        </div>,
            
            
        document.getElementById('portal')
    )
}

export default ModalStack

const handleClick = (e) => {
    e.preventDefault()
    // const token = localStorage.token
    // console.log(e)
    // fetch('http://localhost:3000/',{
    //     method: "PATCH",
    //     headers: {
    //         'Content-Type' : 'application/json', 
    //         Authorization: `Bearer ${token}`
    //     }, 
    //     body: JSON.stringify({

    //     })
    // }).then(response => response.json())
}
