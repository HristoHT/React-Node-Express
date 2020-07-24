import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from './MenuItem';
import BackMenuItem from './BackMenuItem';
import Typography from '@material-ui/core/Typography';
import { useLocation } from "react-router-dom";
import Loader from '../utils/Loader';
import api from '../../globals/api';
import { useSelector, useDispatch } from 'react-redux';
import { addToCurrentTableAction, setCurrentTableAction } from '../../store/actions';
import defaultImage from '../../globals/images';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Menu = ({ ...rest }) => {
    const classes = useStyles();
    const location = useLocation();
    const [menu, setMenu] = useState({});
    const [parent, setParent] = useState('root');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const addToCurrentTable = item => dispatch(addToCurrentTableAction(item));
    const setCurrentTable = table => dispatch(setCurrentTableAction(table));

    const handleOpenParent = (item) => (e) => {
        if (item.type === 'group') {
            setParent(item.index);
        } else {
            addToCurrentTable(item);
        }
    }

    const handleBackParent = (item) => (e) => {
        setParent(item.parent);
    }

    useEffect(() => {
        if (location.state && location.state.table) {
            setCurrentTable(location.state.table);
        }
    }, [location.state])

    useEffect(() => {
        setLoading(true);
        api.request('GET', 'menus', {}, { queries: [`query=${parent}`] })()
            .then(data => { setMenu(data); setLoading(false); })
            .catch(err => {
                //TODO handle global errors
            });

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
                {parent != 'root' && <Grid item xs="2"><BackMenuItem action={handleBackParent(menu)} /></Grid>}
                {menu.children && menu.children.map((data, i) => <Grid item xs="2"><MenuItem key={data.index} data={data} i={i} action={handleOpenParent} /></Grid>)}
            </Grid>}
        </Grid>
    )
}

export default Menu;