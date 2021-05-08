
import { authorized, unauthorized  } from "./../actions/auth";

const intialState = {
    authenticated: false,
}

export const authReducer = (state = intialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case authorized:
            return {
                authenticated: true,
            }
        case unauthorized:
            return {
                authenticated: false,
            }

        default:
            return state
    }
}