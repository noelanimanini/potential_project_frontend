import React, {Fragment} from 'react'
import NavBar from './NavBar'
import { Grid, Paper, Avatar, Typography} from '@material-ui/core';
import {useSelector} from 'react-redux'

function Account() {
    const users = useSelector(state => state.user)
    const renderAccount = () => {
        const paperStyle = {padding :20, height:'120vh', width: '90%', margin: "20px auto"}
        const avatarStyle = {backgroundColor: 'pink'}
        const buttonStyle = {margin: '8px 0'}
        console.log(users)
        
        // return users.map( user => (
        //     <Grid>
        //         <Paper elevation={10} style={paperStyle}>
        //             <Grid align="center">
        //                 <Avatar style={avatarStyle}></Avatar> 
        //                 <h2>Account Information</h2>
        //                 <Typography>
        //                     {user.name}
        //                     {user.username}
        //                 </Typography>
        //             </Grid>
                            
        //         </Paper>
        //     </Grid>
        // )
        // )
    }

    return (
       <Fragment>
        
        <NavBar/>
        {renderAccount()}
       </Fragment>
    )
}

export default Account
