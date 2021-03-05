import React, {Fragment} from 'react'
import {Grid, Card, CardContent, makeStyles , CardActions, Typography, Button, InputBase} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { useSelector,useDispatch} from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ModalStack from './modals/ModalStack';
import {useState, useEffect} from 'react'

const useStyles = makeStyles((theme) =>({
    root: {
      minWidth: 275,
      padding: theme.spacing(1.5),
      margin: '2px'
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
    const buttonStyle = {display: 'flex'}
    const trashStyle = {position: 'relative', left: '100px'}
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const userStacks = useSelector(state => state.userStacks)
    const [isOpenCard, setOpenCard] = useState(false)
    const [stack, setStack] = useState(null)
    const userBodyParts = useSelector(state => state.userBodyParts)
    // const [searchTerm, setSearchTerm] = useState('')
    // const [searchResults, setSearchResults] = useState([])

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
    
    const changeStackForm = (data) => {
        console.log(data)
        dispatch({
            type: 'FILTER_FORM', 
            input: data
        })
        
    }


    const renderStacks = () => {
       return userStacks.map( stack =>  (
            <Grid >
                <Card className={classes.root} variant="outlined" id={stack.id}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {stack.title}
                    </Typography>

                    <Typography variant="body2" component="p">
                        {stack.description}
                        
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleLearn(stack)} color="secondary"> Edit Stack</Button>
                        <Button onClick={() => handleDelete(stack)} style={trashStyle} ><DeleteOutlineIcon></DeleteOutlineIcon></Button>                  
                    </CardActions>
                </Card>
            </Grid>
                  
                
    ))}

    const handleLearn = (stack) => {
        setOpenCard(true)
        setStack(stack)
        console.log(stack)  
    }

    const handleDelete = (stack) => {
        console.log('it VERKS')
        console.log(stack)
        const token = localStorage.token
        fetch(`http://localhost:3000/card_stacks/${stack.id}`,{
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${token}`
            },
        }).then(() => dispatch({
            type: 'DELETE_STACK',
            id: stack.id
        }))
    }

    // const handleChange = (e) => {
    //     e.persist()
    //     // setSearchTerm(e.target.value)
    // }

    // useEffect(() => {
    //     const results = userStacks.filter(stack => stack.toLowerCase().includes(searchTerm))
    //     setSearchResults(results)
    // }, [searchTerm])
    
    return (
        <Fragment>
            <Card style={paperStyle}>
            <Grid >
                <div style={buttonStyle}>
                    {/* <InputBase 
                    placeholder='search for stacks' 
                    onChange={(e) => handleChange(e)}
                    /> */}
                    <Button onClick={(e) => stackClick(e)} >
                        <AddIcon></AddIcon>
                    </Button>
                </div>
                    
            </Grid>
        </Card>

        <div style={cardStyle}>
            {renderStacks() }
            {/* <ul>
                {searchResults.map(item => (
                    <li>{item}</li>
                ))}
                
            </ul> */}
            <ModalStack open={isOpenCard} onClose={() => setOpenCard(false)} cardInfo={stack} setStack={setStack}changeStackForm={changeStackForm}>
              
            </ModalStack>
        </div>

        </Fragment>
        
        
    )
}

export default Stack


