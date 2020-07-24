import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(0.5),
        margin: 4,
        maxWidth: 500,
    },
    image: {
        width: 100,
        height: 100,
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
    },
}));

const Item = ({ action, ...rest }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} >
            <Grid container direction="column" justify="center" alignItems="center" onClick={action} component={ButtonBase}>
                <Grid item xs className={classes.image}>
                    <img className={classes.img} alt="image" src="https://image.flaticon.com/icons/png/512/60/60577.png"/></Grid>
                <Grid item xs>
                    <p>Назад</p>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Item;