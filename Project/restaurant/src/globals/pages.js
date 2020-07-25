import React from 'react';
import PosMenu from "../view/PosMenu";
import FloorsManager from "../view/FloorsManager";
import Floors from "../view/Floors";
import AppMenu from "../view/AppMenu";
import PriceList from "../view/PriceList";
import Login from "../view/Login";
import Personnel from "../view/Personnel";
import Turnovers from "../view/Turnovers";

const pages = {
    welcome: { path: '/', permission: '', exact: true, component: (props) => (<Login {...props} />) },
    default: { path: '/home', permission: 'default', exact: true, component: (props) => (<AppMenu {...props} />) },//AppMenu
    menu: { path: '/menu', permission: 'floors', exact: true, component: (props) => (<PosMenu {...props} />) },//PosMenu
    pricelistsubmenu: { path: '/pricelist/:page', permission: 'pricelist', component: (props) => (<PriceList {...props} />) },
    pricelist: { path: '/pricelist', permission: 'pricelist', component: (props) => (<PriceList {...props} />) },
    personnel: { path: '/personnel', permission: 'personnel', exact: true, component: (props) => (<Personnel {...props} />) },
    login: { path: '/login', permission: '', exact: true, component: (props) => (<Login {...props} />) },
    floorsmanager: { path: '/floorsmanager', permission: 'floorsmanager', exact: true, component: (props) => (<FloorsManager {...props} />) },
    floors: { path: '/floors', permission: 'floors', exact: true, component: (props) => (<Floors {...props} />) },
    turnovers: { path: '/turnovers', permission: 'turnovers', exact: true, component: (props) => (<Turnovers {...props} />) }
}

export default pages;