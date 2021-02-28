import React from 'react'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 200
    },
    media: {
      height: 140,
    },
    stack: {
        alignItems: 'center',
        padding: theme.spacing(1.5),
        flexGrow: 1
    }
  }));

const BodyContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const bodyparts = useSelector(state => state.bodyparts)
    // const bodyPartStyle={position: 'relative', padding: '10px', textAlign: 'cetner'}

    useEffect(() => {
        const token = localStorage.token;
        if (bodyparts.length === 0) {
            getBodyParts(token)
        }
    })

    const getBodyParts = (token) => {
        fetch('http://localhost:3000/body_parts', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
        .then(bodyparts => dispatch({
            type: 'SET_BODY_PARTS',
            bodyparts: bodyparts
        }))
    }

    const renderCard = bodyparts.map( part => (
        <Grid className={classes.stack} >
            <Card className={classes.root} id={part.id}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={part.image}
                    title={part.title}
                    />
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Stack
                    </Button>
                    
                </CardActions>
            </Card>
        </Grid>
        
    ))

    return (

        <div>
            {renderCard}
            {/* <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Stack
                    </Button>
                    
                </CardActions>
            </Card> */}
         </div>

        
    )
}

export default BodyContainer