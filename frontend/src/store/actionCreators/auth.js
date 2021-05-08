
import { authorized, unauthorized   } from "./../actions/auth";

export const checkAuthentication = () => {
    console.log("checkAuthentication")
    return function (dispatch) { 
        if (localStorage.getItem('token') !== null) { 
            dispatch({
                type: authorized
            })
        } else { 
            dispatch({
                type: unauthorized
            })
        }
    };
};

export const initAuthentication = ( ) => { 
    console.log("Init authentication")
    return function (dispatch) {  
            dispatch({  
                type:authorized
            }) 
    };
};

export const removeAuthentication = () => { 
    return function (dispatch) {  
            dispatch({
                type: unauthorized
            }) 
    };
};
