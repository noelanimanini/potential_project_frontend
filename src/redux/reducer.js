export const initialState = {
    usernameInput: '',
    passwordInput: '',
    user: null,
    bodyparts: []
    
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
        default: 
            return state
    }
}
