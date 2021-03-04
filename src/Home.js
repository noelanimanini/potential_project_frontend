 import React, {useEffect, Fragment} from 'react';
 import {useDispatch, useSelector} from 'react-redux'
 import BodyContainer from "./BodyContainer"
 import NavBar from './NavBar'

 const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) 
 
    // const bodyparts = useSelector(state => state.bodyparts)

     useEffect(() => {

        const token = localStorage.token;
        // console.log(token)
        if (!user) {
            if (localStorage.token) {
                persistUser(token)
            }
            
        } 
        // if (bodyparts.length === 0) {
        //     getBodyParts(token)
        // }
        
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

    // const getBodyParts = (token) => {
    //     fetch('http://localhost:3000/body_parts', {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(response => response.json())
    //     .then(bodyparts => dispatch({
    //         type: 'SET_BODY_PARTS',
    //         bodyparts: bodyparts
    //     }))
    // }

    return (
       <Fragment>

           
            <NavBar/>
           <BodyContainer/>
       </Fragment>
            
  
    )
}

export default Home