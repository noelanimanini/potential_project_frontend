export const initialState = {
    usernameInput: '',
    passwordInput: '',
    user: null,
    bodyparts: [],
    userStacks: [],
    formTitleInput: '',
    formDescriptionInput: '',
}

export const reducer = ( state = initialState, action ) => {
    switch(action.type){
        case "CHANGE_USERNAME_INPUT":
            return {
                ...state,
                usernameInput: action.value
            }

        case "CHANGE_PASSWORD_INPUT":
            return {
                ...state,
                passwordInput: action.value
            } 
        case 'SET_USER':
            return {
                ...state, 
                user: action.user
            } 
        case 'SET_BODY_PARTS': 
            return {
                ...state, 
                bodyparts: action.bodyparts
            }
        case 'SET_STACKS':
            //fetch to the backend and see all the users stuff 
            return {
                ...state, 
                userStacks: action.userStacks
            }
        case 'ADD_STACK':
            return {
                ...state, 
                userStacks: [...state.userStacks, action.newStack]
            }
        case 'DELETE_STACK': 
            return {
                ...state, 
                userStacks: state.userStacks.filter(stack => stack.id !== action.id)

            }
        case 'CHANGE_TITLE_INPUT':
            return {
                ...state, 
                formTitleInput: action.value
            }
        case 'CHANGE_DESCRIPTION_INPUT':
            return {
                ...state, 
                formDescriptionInput: action.value
            }
        case 'SET_FORM': 
        console.log(action)
            return {
                ...state, 
                userStacks: state.userStacks.map(oldStack => {

                    if (oldStack.id === action.form.id) {
                        return action.form
                    } else {
                        return oldStack 
                    }
                } )
            }
        // case 'SET_USER_BODY_PARTS':
        //     return {
        //         ...state, 
        //         userBodyParts: action.userBodyParts
        //     }
        case 'GRAB_USER_BODY_PARTS':

            return {
                ...state,
                userStacks: state.userStacks.map(oldStack => {
                    if (oldStack.id == action.newUserBodyPart.card_stack_id) {
                        return {...oldStack, user_body_parts: [...oldStack.user_body_parts, action.newUserBodyPart]}
                    } else {
                        return oldStack
                    }
                })
            }

        case 'FILTER_FORM': 
            // let oldStack = state.userStacks.filter(stack => stack.id !== action.input.id)
            // debugger
            // let updatedStack = [...oldStack, action.input]
            // debugger
            //the state for stack is not updating correctly, it is not rerendering the new stack info. its not filtering out correctly.
            return {
                ...state, 
                userStacks:  state.userStacks.map(oldStack => {

                    if (oldStack.id === action.form.id) {
                        return action.form
                    } else {
                        return oldStack 
                    }
                } )
                // state.userStacks.map(oldStack => oldStack.id === action.form.id ? action.form : oldStack  )
                // [...state.userStacks, updatedStack]
                }
            // debugger
        default: 
            return state
    }
}
