import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import pages from '../globals/pages';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //backgroundColor: 'red',
        padding: '30px'
    },
    button: {
        height: '20vh',
        backgroundColor: '#f2f2f2'
    }
}));

const AppMenu = ({ ...rest }) => {
    const classes = useStyles();

    return (
        <Container>
            <Grid container className={classes.root} spacing={5}>
                <AppMenuItem title="Помещения" link={pages.floorsmanager} />
                <AppMenuItem title="Помещения" link={pages.floors} />
                <AppMenuItem title="Каса" icon={<MonetizationOnIcon fontSize="large" />} />
                <AppMenuItem title="Справки" icon={<AssessmentIcon fontSize="large" />} />
                <AppMenuItem title="Настройки" icon={<SettingsIcon fontSize="large" />} />
                <AppMenuItem title="Меню" icon={<MenuBookIcon fontSize="large" />} link={pages.pricelist}/>
                <AppMenuItem title="Персонал" icon={<PeopleIcon fontSize="large" />} link={pages.personnel}/>
            </Grid>
        </Container>
    );
}

const AppMenuItem = ({ title, icon, link, ...rest }) => {
    const classes = useStyles();
    const history = useHistory();

    const CustomButton = props => <Button component={Paper} {...props} />;

    const Redirect = () => {
        if(link)history.push(link);
    }

    return (
        <Grid item md={3} xs={6} onClick={Redirect}>
            <Grid container
                component={CustomButton} className={classes.button} alignItems="center" justify="center">
                <Grid item>
                    {icon}
                </Grid>
                <Grid item>
                    <Typography variant="h4">{title}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AppMenu;