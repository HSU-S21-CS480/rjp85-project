import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthGuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token') === null ? <Component {...props} /> : <Redirect to='/' />
    )} />
)
export default AuthGuardedRoute;