import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Loader from '../components/utils/Loader';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '../components/utils/Drawer';
import Floor from '../components/Floors/Floor';
import FloorList from '../components/FloorManager/FloorsList';
import socketIOClient from "socket.io-client";
import api from '../globals/api';
const ENDPOINT = "http://localhost:8080";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    menu: {
        padding: 5
    }
}));

const Floors = ({ ...rest }) => {
    const classes = useStyles();
    const [openedWindow, setOpenedWindow] = useState(null);
    const [floors, setFloors] = useState({ loading: true, data: [] });
    const [openAddFloor, setOpenAddFloor] = useState(false)
    const socket = socketIOClient(ENDPOINT);
    const floor = useSelector(state => state.floor)

    const handleAddFloor = () => {
        setOpenAddFloor(true);
    }

    const handleOpenWindow = (floor) => (e) => {
        setOpenedWindow(<Floor data={floor} />)
    }

    useEffect(() => {
        socket.on('add:floor', data => {
            setFloors({ loading: false, data });
        });

        socket.on('update:floor', data => {
            setOpenedWindow(<Floor data={data} />)
        });

        setFloors({ ...floors, loading: true });
        api.request('GET', 'floors')().then(data => {
            setFloors({ loading: false, data });
        }).catch(err => {
            //TODO handle global error
        });

        return () => {
            socket.disconnect();
            socket.close();
        }
    }, [])

    useEffect(() => {
        if (!openedWindow) {
            if (floors.data && floors.data[0]) {
                setOpenedWindow(<Floor data={floors.data[0]} />)
            }
        }
    }, [floors]);

    useEffect(() => {
        if (floor) {
            setOpenedWindow(<Floor data={floor} />);
        }
    }, [floor])

    return (
        <Drawer
            options={
                <Grid container className={classes.menu}>
                    <Grid item xs={12}>
                        <Typography fonSize={15} fontWeight='bold' className={classes.title}><b>Помещения</b></Typography>
                    </Grid>
                    {floors.loading &&
                        <Grid container justify="center">
                            <Grid item >
                                <Loader />
                            </Grid>
                        </Grid>}
                    {!floors.loading && <FloorList data={floors.data} openGroup={handleOpenWindow} />}
                </Grid >
            }
            title="Мениджър на помещения"
        >
            {openedWindow}
        </Drawer >
    );
}

export default Floors;