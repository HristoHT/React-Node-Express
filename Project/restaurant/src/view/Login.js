import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

import api from '../globals/api';
import pages from '../globals/pages';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 25,
        //margin: '20vh',
        marginTop: '20vh'
    },
    container: {
        backgroundColor: 'red'
    }
}));

const Login = ({ goTo, ...props }) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ message: '', type: 'error', show: false });
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();

    const handlePasswordClick = (val) => (e) => {
        setShowPassword(val);
    }

    const changeField = (field) => (e) => {
        setCredentials({ ...credentials, [field]: e.target.value });
    }

    const handleLogin = async (e) => {
        api.login(credentials)
            .then(res => {
                if (res.status) {
                    setMessage({ ...message, message: res.message, show: true });
                } else {
                    history.push(goTo && goTo != '/login' ? goTo : pages.default.path);
                }
            });
    }

    useEffect(() => {
        return () => {
            setCredentials({ username: '', password: '' });
        }
    }, [])

    return (
        <Grid container justify="space-evenly">
            <Grid item xs={12} sm={12} md={6} lg={4} container
                alignItems="center"
                justify="center"
                direction='column'
                component={Paper}
                className={classes.root}
                spacing={3}>
                {goTo}
                <Grid item xs>
                    <Typography variant="h5" color="primary">
                        Вход
                    </Typography>
                </Grid>
                <Grid item xs container spacing={1} alignItems="flex-end" justify="center">
                    <Grid item>
                        <AccountCircle color="primary" />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Потребител"
                            onChange={changeField('username')}
                            defaultValue={credentials.username} />
                    </Grid>
                </Grid>
                <Grid item xs container spacing={1} alignItems="flex-end" justify="center">
                    <Grid item onClick={handlePasswordClick(!showPassword)}>
                        {showPassword ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Парола"
                            type={showPassword ? 'text' : 'password'}
                            onChange={changeField('password')}
                            defaultValue={credentials.password} />
                    </Grid>
                </Grid>
                <Grid item>
                    {message.show && <Alert severity={message.type}>
                        {message.message}
                    </Alert>}
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={handleLogin}>
                        Влез
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;