export const initialState = {
    usernameInput: '',
    passwordInput: '',
    user: null,
    bodyparts: [],
    userStacks: [],
    
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
      
        default: 
            return state
    }
}
