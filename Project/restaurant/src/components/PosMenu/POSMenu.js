import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

var menu =[
    {
        id: 1,
        name: "Drinks",
        menuItems: [
            {
                id: 1,
                name: "Coca Cola",
                menuItems: [
                    { id: 1, name: "500ml" },
                    { id: 2, name: "1.5l" },
                    { id: 3, name: "2l" }
                ]
            },
            {
                id: 2,
                name: "Devin 500.000ml",
            },
            {
                id: 3,
                name: "Zagorka",
                menuItems: [
                    { id: 1, name: "Nalivna" },
                    { id: 2, name: "500ml ken" },
                ]
            },
        ]
    }
]

const POSMenu = ({ history, location, ...rest }) => {
    const classes = useStyles();
    history.push({
        pathname: '/menu',
        state: {
            menuItems: menu,
        }
    })
    return "";
}

export default POSMenu;