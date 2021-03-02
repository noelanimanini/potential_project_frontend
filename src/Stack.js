import React, {Fragment} from 'react'
import {Grid, Card, CardContent, makeStyles , CardActions, Typography, Button, Menu, MenuItem} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { useSelector,useDispatch} from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import ModalStack from './modals/ModalStack';
import {useState} from 'react'

const useStyles = makeStyles((theme) =>({
    root: {
      minWidth: 275,
      padding: theme.spacing(1.5)
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));

const Stack = () => {
    const classes = useStyles();
    const paperStyle = {padding: 7, margin: '10px', display: 'flex', justifyContent: 'flex-end', borderStyle: 'dotted'}
    const cardStyle = {width: '50%', margin: '2%'}
    const buttonStyle = {display: 'flex', justifyContent: 'center', position: 'relative', left: '280px'}
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const userStacks = useSelector(state => state.userStacks)
    const [isOpen, setIsOpen] = useState(false)
    const [stack, setStack] = useState(null)
    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    //

    const stackClick = (e) => {
        e.persist()
        console.log(user)
        const token = localStorage.token
        fetch('http://localhost:3000/card_stacks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: "Stack",
                user_id: user.id ,
                description: "new stack", 
                
            })
        }).then(response => response.json())
        .then(newStack => 
            dispatch({
            type: 'ADD_STACK',
            newStack: newStack
        }))

    }
    
    const renderStacks = () => {
       return userStacks.map( stack => {
          return (
              <Grid id={stack.id}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {stack.title}
                    </Typography>

                    <Typography variant="body2" component="p">
                        {stack.description}
                        
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" onClick={() => handleLearn(stack)}>Learn More</Button>
                  
                    <Button size="small" style={buttonStyle} ><ClearIcon></ClearIcon></Button>
                    </CardActions>
                </Card>
              </Grid>
    )})}

    const handleLearn = (stack) => {
        setStack(stack)
        console.log(stack)
        setIsOpen(true)
    }
    
    return (
        <Fragment>
            <Card style={paperStyle}>
            <Grid >
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <AddIcon></AddIcon>
                    </Button>
                    <Menu 
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    
                    <MenuItem onClick={(e) => stackClick(e)}>Create a Stack</MenuItem>
                    </Menu>
                </div>
            </Grid>
        </Card>
        <div style={cardStyle}>
            {renderStacks() }
            <ModalStack open={isOpen} onClose={() => setIsOpen(false)} cardInfo={stack}>

            </ModalStack>
        </div>

        </Fragment>
        
        
    )
}

export default Stack
