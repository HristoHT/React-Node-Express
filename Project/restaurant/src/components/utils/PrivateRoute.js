import React from 'react';
import { Route } from "react-router-dom";
import api from '../../globals/api';
import Login from '../../view/Login';
import pages from "../../globals/pages";
import AppMenu from "../../view/AppMenu";
/**
 * 
 * @param {String} pathname, в който се опитваме да влезем
 * @param {String} permission permission-ът нужен за достъп до страницата
 * Ако няма токен рендърва логин компонентата, и след успешен логин редиректва към правилния URL 
 */
const PrivateRoute = ({ path, permission, component, ...props }) => {
    const user = api.getUser();
    const accessToken = api.getAccessToken();
    // window.localStorage.setItem('accessToken', '');
    // window.localStorage.setItem('refreshToken', '');

    if (accessToken !== undefined && accessToken !== null && accessToken !== 'null' && accessToken != 'undefined') {
        if (!permission || (user.permissions && user.permissions.indexOf(permission) != -1)) {
            return <Route path={path} component={component} {...props} />;
        } else {
            return <AppMenu {...props} />;
        }
    } else {
        return <Login goTo={path} />;
    }
}

export default PrivateRoute;