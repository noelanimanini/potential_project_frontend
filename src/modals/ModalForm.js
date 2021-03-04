import React from 'react'
import {Button, TextField,Input} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'

function ModalForm({open, cardInfo, setOpenEdit, renderModal, changeStackForm, setStack}) {
    const dispatch = useDispatch()
    const formTitleInput = useSelector(state => state.formTitleInput)
    const formDescriptionInput = useSelector(state => state.formDescriptionInput)
    const form = useSelector(state => state.form )

    console.log(renderModal)
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

    if (!open) return null

    const submitHandler = (e) => {
        e.preventDefault()
        const token = localStorage.token
        console.log(e)
        fetch(`http://localhost:3000/card_stacks/${cardInfo.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                card_stack: {
                    title: formTitleInput,
                    description: formDescriptionInput,
                    user_id: cardInfo.user_id
                }
            })
        }) 
        .then(response => response.json())
        .then(data => handleForm(data))
    }

    const handleForm = (data) => {
        console.log(data)
        setStack(data)
        dispatch({
            type: 'SET_FORM',
            form: data
        })
        // changeStackForm(data)
    }

    return (
        <div style={MODAL_STYLES}>

            <form onSubmit={(e) => submitHandler(e)}>
                <TextField 
                id="standard-basic" 
                label="Title"
                onChange={(e) => dispatch({
                    type: 'CHANGE_TITLE_INPUT',
                    value: e.target.value
                })}
                />

                <TextField 
                id="standard-basic" 
                label="Description"
                onChange={(e) => dispatch({
                    type: 'CHANGE_DESCRIPTION_INPUT',
                    value: e.target.value
                })}
                />
                <Button onClick={() => setOpenEdit(false)}>close</Button>

                <Button type="submit" value="submit" >Submit</Button>
            </form >

        </div>
    )
}

export default ModalForm
