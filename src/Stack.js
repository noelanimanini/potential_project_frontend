import React from 'react'
import {Grid, Paper, Card, Typography} from '@material-ui/core'

const Stack = () => {
    const paperStyle = {padding: 20, height: '50vh', width:280, margin: "20px auto"}
    return (
        <Grid >
            <Paper elevation={10} style={paperStyle}>
                <Card>
                    <Typography>
                       Stack
                    </Typography>
                </Card>
            </Paper>
        </Grid>
    )
}

export default Stack
