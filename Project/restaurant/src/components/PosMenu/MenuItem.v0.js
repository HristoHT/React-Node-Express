import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory, useLocation } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useSelector, useDispatch } from 'react-redux';
import { addToCurrentTableAction } from '../../store/actions';
import defaultImage from '../../globals/images';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(0.5),
        position: 'relative',
        margin: 4,
        maxWidth: 500,
    },
    image: {
        height: 100,
        width: 100
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
    },
}));

const Item = ({ data, i, ...rest }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const addToCurrentTable = item => dispatch(addToCurrentTableAction(item));

    const action = (e) => {
        if (data.type === 'group') {
            history.push({
                pathname: `${location.pathname}/${i}`,
                state: {
                    parent: data.index
                }
            });
        } else {
            addToCurrentTable(data);
        }
    };


    return (
        <Paper className={classes.paper} >
            <Grid container direction="column" justify="center" alignItems="center" onClick={action} component={ButtonBase}>
                <Grid item xs className={classes.image}>
                    <img className={classes.img} alt="image" src={data.image ? data.image : defaultImage(100, 100)} />
                </Grid>
                <Grid item xs>
                    <p>{data.name}</p>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Item;