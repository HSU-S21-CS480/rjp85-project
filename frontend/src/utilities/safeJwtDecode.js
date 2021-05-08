
import jwt from 'jwt-decode'
export const safeJwtDecode = () => {
    var data = "" 
    const token = localStorage.getItem('token')
    if (token) { 
        data = jwt(token); 
    } else {
        data = { email: null,  userName:  null }
    } 
    console.log(data)
    return data;
}