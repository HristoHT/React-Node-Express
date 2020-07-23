import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from './MenuItem';
import BackMenuItem from './BackMenuItem';
import Typography from '@material-ui/core/Typography';
import { useLocation } from "react-router-dom";
import Loader from '../utils/Loader';
import pages from '../../globals/pages'
import api from '../../globals/api';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Menu = ({ ...rest }) => {
    const classes = useStyles();
    const [menu, setMenu] = useState({});
    const [parent, setParent] = useState('root')
    const [title, setTitle] = useState("Меню");
    const [loading, setLoading] = useState(true)
    const location = useLocation();

    useEffect(() => {
        // if (location.state) {
        //     if (location.state.menuItems) setMenuItems(location.state.menuItems);
        //     setTitle(location.state.title || "Меню");
        // }

        if (location.state && location.state.parent) {
            setParent(location.state.parent);
        } else {
            setParent('root');
        }
    }, [location]);

    useEffect(() => {
        if (location.pathname === pages.menu || parent !== 'root') {
            setLoading(true);
            api.request('GET', 'menus', {}, { queries: [`query=${parent}`] })()
                .then(data => { setMenu(data); setLoading(false); });
        }
    }, [parent])

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            {!loading && <Grid item xs={12}>
                <Typography variant="h3">{menu.name}</Typography>
            </Grid>}
            {loading && <Grid container justify='center' alignItems='center'>
                <Loader />
            </Grid>}
            {!loading && <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.root}>
                {location.pathname !== pages.menu && <Grid item xs="2"><BackMenuItem /></Grid>}
                {menu.children && menu.children.map((data, i) => <Grid item xs="2"><MenuItem key={data.index} data={data} i={i} /></Grid>)}
            </Grid>}
        </Grid>
    )
}

export default Menu;