import React, {Fragment} from 'react'
import NavBar from './NavBar'
import Stack from './Stack'
import {useEffect} from 'react'; 
import {useSelector, useDispatch} from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch() 
    const user = useSelector(state => state.user)

    useEffect(() => {

        const token = localStorage.token;
        if (!user) {
            if (localStorage.token) {
                persistUser(token)
            }  
        } 
     })

     const persistUser = (token) => {
        fetch('http://localhost:3000/persist', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => response.json())
        .then(data => authResponse(data))
     }

     const authResponse = (data) => {
        console.log(data)
        if (data.error) {
            alert(data.error)
        } else {
            dispatch({
                type: 'SET_USER',
                user: {
                    username: data.user.username,
                    id: data.user.id
                }
            })
            dispatch({
                type: 'SET_STACKS',
                userStacks: data.user.card_stacks
            })
            dispatch({
                type: 'SET_USER_BODY_PARTS',
                userBodyParts: data.user.userBodyParts
            })
        }
    }

    return (
       <Fragment>
           <NavBar/>
           <Stack/>
       </Fragment>
    )
}

export default Profile
