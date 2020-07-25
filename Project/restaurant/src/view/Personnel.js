import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Drawer from '../components/utils/Drawer';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PersonDialog from '../components/Personnel/PersonDialog'
import Loader from '../components/utils/Loader';

import api from '../globals/api';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 10,
    }
}));

const Personnel = ({ ...rest }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [employees, setEmployes] = useState({ loading: true, data: [] });
    const [sellectedEmployee, setSellectedEmployee] = useState({});
    const socket = socketIOClient(ENDPOINT);
    const user = api.getUser();

    useEffect(() => {
        socket.on('update:users', (data) => {
            setEmployes({ loading: false, data });
        });

        if (employees.loading) {
            api.request('GET', 'users')()
                .then(data => {
                    setEmployes({ loading: false, data });
                    if (data[0] /* && data[0]._id != user._id */) {
                        openEmployee()(data[0]);
                    }
                }).catch(err => {
                    // TODO да дисплейва глобалните грешки
                });
        }
        return () => {
            socket.disconnect();
            socket.close();
        }
    }, []);

    useEffect(() => {
        if (employees.data.length === 0) {
            setOpen(true);
        } else {
            setSellectedEmployee(employees.data[0]);
        }
    }, [employees])

    const openEmployee = (e) => (employee) => {
        setOpen(false);
        setSellectedEmployee(employee);
    }

    return <Drawer options={<Grid container className={classes.menu}>
        <Grid container justify="space-evenly">
            <Grid item style={{ padding: '10px' }}>
                <Button color="primary" onClick={() => setOpen(true)} endIcon={<AddIcon />}>Добави</Button>
            </Grid>
            {employees.loading &&
                <Grid container justify="center" direction="row">
                    <Loader />
                </Grid>}
            {!employees.loading && employees.data/* .filter(employee => employee._id != user._id) */.map(employee => <Button fullWidth onClick={(e) => openEmployee(e)(employee)}>{`${employee.firstName} ${employee.thirdName}`}</Button>)}
        </Grid>

    </Grid >} title="Служители">
        {open && <PersonDialog action="save" username={null} />}
        {!open && <PersonDialog action="update" username={sellectedEmployee.username} />}
    </Drawer>
}

export default Personnel;