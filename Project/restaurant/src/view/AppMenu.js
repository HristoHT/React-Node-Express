import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import pages from '../globals/pages';
import api from '../globals/api';
import Avatar from '@material-ui/core/Avatar';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //backgroundColor: 'red',
        padding: '30px'
    },
    button: {
        height: '20vh',
        backgroundColor: '#f2f2f2'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));


const AppMenu = ({ initial, ...rest }) => {
    const classes = useStyles();
    const user = api.getUser();
    const buttons = [
        { title: "Мениджър на помещения", link: pages.floorsmanager.path, icon: null, permission: pages.floorsmanager.permission },
        { title: "Помещения", link: pages.floors.path, icon: null, permission: pages.floors.permission },
        { title: "Каса", link: pages.turnovers.path, icon: <MonetizationOnIcon fontSize="large" />, permission: pages.turnovers.permission },
        { title: "Справки", link: null, icon: <AssessmentIcon fontSize="large" />, permission: '' },
        { title: "Настройки", link: null, icon: <SettingsIcon fontSize="large" />, permission: '' },
        { title: "Меню", link: pages.pricelist.path, icon: <MenuBookIcon fontSize="large" />, permission: pages.pricelist.permission },
        { title: "Персонал", link: pages.personnel.path, icon: <PeopleIcon fontSize="large" />, permission: pages.personnel.permission },
        { title: "Изход", link: pages.welcome.path, icon: <ExitToAppIcon fontSize="large" />, permission: pages.welcome.permission },
    ];
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Container>
            <Grid container className={classes.root} spacing={5}>
                <Grid item xs={12} container justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography variant="h4">
                            Здравейте, <b>{`${user.firstName || ''} ${user.thirdName || ''}`}</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar alt={user.firstName || ''} src={user.image || ''} className={classes.large} />
                    </Grid>
                </Grid>

                {buttons.map(props => {
                    if (!props.permission || (user.permissions && user.permissions.indexOf(props.permission) != -1)) {
                        return <AppMenuItem {...props} />;
                    } else {
                        return null;
                    }
                })}
            </Grid>
        </Container>
    );
}

const AppMenuItem = ({ title, icon, link, logout, ...rest }) => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const CustomButton = props => <Button component={Paper} {...props} />;

    const Redirect = () => {
        if (logout) {
            api.logout()
                .then(res => {
                    //history.go(link);
                    enqueueSnackbar('Добиждане :)', { variant: 'info' })
                })
                .catch(err => {
                    enqueueSnackbar(err.message, { variant: 'error' })
                })
        }
        if (link) {
            history.push(link);
        }
    }
    return (
        <Grid item md={3} xs={6} onClick={Redirect}>
            <Grid container
                component={CustomButton} className={classes.button} alignItems="center" justify="center">
                <Grid item>
                    {icon}
                </Grid>
                <Grid item>
                    <Typography variant="h4" align="center">{title}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AppMenu;