export const initialState = {
    usernameInput: '',
    passwordInput: '',
    user: null,
    bodyparts: [],
    userStacks: [],
    formTitleInput: '',
    formDescriptionInput: ''
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
            return {
                ...state, 
                userStacks: 
                state.userStacks.map(oldStack => oldStack.id === action.form.id ? action.form : oldStack  )
            }
        default: 
            return state
    }
}
