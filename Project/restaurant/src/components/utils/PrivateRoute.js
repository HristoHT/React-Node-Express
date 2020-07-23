import React from 'react';
import { Route } from "react-router-dom";
import api from '../../globals/api';
import Login from '../../view/Login';

/**
 * 
 * @param {*} pathname, в който се опитваме да влезем
 * Ако няма токен рендърва логин компонентата, и след успешен логин редиректва към правилния URL 
 */
const PrivateRoute = ({ path, ...props }) => {
    return api.accessToken ? <Route path={path} {...props} /> : <Login goTo={path} />;
}

export default PrivateRoute;