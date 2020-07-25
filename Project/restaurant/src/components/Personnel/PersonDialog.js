import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { DatePicker } from '@material-ui/pickers';
import api from '../../globals/api';
import defaultImage from '../../globals/images';
import DeleteDialog from '../utils/DeleteDialog';
import { Typography } from '@material-ui/core';
import Loader from '../utils/Loader';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    image: {
        width: 32 * 6.5,
        height: 32 * 6.5,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '80%',
        maxHeight: '80%',
    },
    input: {
        display: 'none'
    },
    dialog: {
        height: '80vh'
    }
}));

const defaultValues = {
    password: '',
    firstName: '',
    secondName: '',
    job: '',
    username: '',
    startDate: new Date(),
    showPassword: false,
    image: defaultImage(208, 208),
};
const defaultPermissions = [
    { title: 'Мениджър на помещения', field: 'floorsmanager', checked: false },
    { title: 'Помещения', field: 'floors', checked: false },
    { title: 'Каса', field: 'turnovers', checked: false },
    { title: 'Справки', field: 'reports', checked: false },
    { title: 'Настройки', field: 'settings', checked: false },
    { title: 'Меню', field: 'pricelist', checked: false },
    { title: 'Персонал', field: 'personnel', checked: false },
];

/**
 * TODO Change password
 */
export default function AddItemDialog({ action, username }) {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [error, setError] = useState({ error: false, message: "Въведете собствено име на служителя" });
    const [succes, setSucces] = useState(false);
    const [open, setOpen] = useState(false);
    const [permissions, setPermissions] = useState([...defaultPermissions]);
    const [values, setValues] = useState(defaultValues);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const handleSucces = () => {
        setSucces(true);
        setTimeout(() => {
            setSucces(false);
        }, 2000);
    }

    const handleChange = () => (event) => {
        setValues({ ...values, [event.target.id]: event.target.value.trim() });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handlePermision = (i) => (e) => {
        let localPermissions = [...permissions];
        localPermissions[i].checked = !localPermissions[i].checked;
        setPermissions(localPermissions);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const openDeleteDialog = () => {
        setOpen(true);
    }

    const loadImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setValues({ ...values, image: e.target.result });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const createUser = (e) => {
        if (!values.firstName)
            setError({ show: true, message: "Въведете собствено име на служителя" });
        else if (!values.thirdName)
            setError({ show: true, message: "Въведете фамилно име на служителя" });
        else if (!values.username)
            setError({ show: true, message: "Въведете потребителско име за служителя" });
        else if (!values.job)
            setError({ show: true, message: "Въведете длъжност за служителя" });
        else if (!values.password && action !== 'update')
            setError({ show: true, message: "Въведете парола за служителя" });
        else {
            const method = action !== 'update' ? 'POST' : 'PUT';
            const permissionsArray = [...permissions].filter(permission => permission.checked).map(permission => permission.field);
            api.request(method, 'users', { ...values, permissions: permissionsArray })()
                .then(res => {
                    handleSucces();
                    setValues(defaultValues);
                    setPermissions(defaultPermissions);
                })
                .catch(err => {
                    setError({ show: true, message: err.message })
                });
        }
    }

    useEffect(() => {
        setValues({ ...values, startDate: selectedDate });
    }, [selectedDate]);

    useEffect(() => {
        if (username) {
            setLoading(true);
            api.request("GET", 'users', {}, { param: `/${username}` })()
                .then(user => {
                    if (user.permissions) {
                        let localPermissions = [...defaultPermissions].map(permission => {
                            const i = user.permissions.indexOf(permission.field);

                            if (i !== -1) {
                                permission.checked = true;
                            } else {
                                permission.checked = false;
                            }

                            return permission;
                        });
                        setPermissions([...localPermissions]);
                        delete user.permissions;
                    } else {
                        setPermissions([...defaultPermissions]);
                    }
                    setValues({ ...user, showPassword: false });
                    setLoading(false);
                })
        } else {
            setLoading(false);
            setValues(defaultValues);
            setPermissions([...defaultPermissions].map(permission => {
                permission.checked = false;
                return permission;
            }));
        }

    }, [username]);

    return (
        <Grid container justify="center">
            {loading && <Grid item xs={1}> <Loader /></Grid>}
            {!loading && <Grid item xs={12} container justify="center" spacing={2}>
                <Grid item className={classes.image} container alignItems="center" spacing={1}>
                    <Grid item >
                        <img className={classes.img} src={values.image} />
                    </Grid>
                    <Grid item container justify="center">
                        <Grid item>
                            <input accept="image/*" className={classes.input} id="photo" type="file" onChange={loadImage} />
                            <label htmlFor="photo">
                                <Button component="span" endIcon={<PhotoCamera />} variant="outlined" color="primary">
                                    Снимка
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={8} container spacing={1} justify="center" >
                    <Grid item xs={12} md={6} lg={12} container spacing={4} >
                        <Grid item xs={12} md={6}>
                            <TextField required id="firstName" label="Собствено име" autoFocus fullWidth value={values.firstName} onChange={handleChange()} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField required id="thirdName" label="Фамилно име" fullWidth value={values.thirdName} onChange={handleChange()} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Дата на постъпване"
                                value={selectedDate}
                                onChange={handleDateChange}
                                id="startDate"
                                okLabel="OK"
                                format="dd.MM.yyyy"
                                autoOk
                                clearLabel="Изчити"
                                cancelLabel="Затвори" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField required id="job" label="Длъжност" fullWidth value={values.job} onChange={handleChange()} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField required id="username" disabled={action === 'update'} label="Потребителско име" fullWidth value={values.username} onChange={handleChange()} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {action !== 'update' && <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="password">Парола</InputLabel>
                                <Input
                                    id="password"
                                    fullWidth
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange()}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>}
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant="h6">Права на достъп</Typography>
                            </Grid>
                            <Grid item xs container justify="space-araound">
                                {permissions.map((permission, i) => (
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            // value=
                                            control={<Checkbox color="primary" checked={permission.checked} onChange={handlePermision(i)} />}
                                            label={permission.title}
                                            labelPlacement="left"
                                        />

                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            {error.show && <Alert severity="error" variant="filled">{error.message}</Alert>}
                            {succes && <Alert severity="success" variant="filled">Записано</Alert>}
                        </Grid>
                        <Grid container justify="flex-end">
                            <Grid item xs={12} md={8} container justify="flex-end" >
                                <Grid item xs={12} container justify="space-evenly" spacing={2}>
                                    <Grid item>
                                        <Button component="span" color="primary" variant="outlined" onClick={createUser}>
                                            Запази
                                    </Button>
                                    </Grid>
                                    {action === 'update' && <Grid item>
                                        <Button component="span" color="primary" variant="outlined">
                                            Смени парола
                                    </Button>
                                    </Grid>}
                                    {action === 'update' && <Grid item>
                                        <Button component="span" color="secondary" variant="outlined" onClick={openDeleteDialog}>
                                            Изтрий
                                    </Button>
                                    </Grid>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <DeleteDialog open={open} setOpen={setOpen} action={() => {
                    api.request('DELETE', 'users', {}, { param: `/${username}` })()
                        .then(res => {
                            enqueueSnackbar(`Потребител ${username} е изтрит успешно`, { variant: 'success' });
                        })
                        .catch(err => {
                            enqueueSnackbar(err.message, { variant: 'error' });
                            console.log(err.stack);
                        })
                }} />

            </Grid >}
        </Grid >
    );
}