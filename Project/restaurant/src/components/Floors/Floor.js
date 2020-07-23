import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import Table from './Table';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'react-grid-layout/css/styles.css';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import api from '../../globals/api';
const useStyles = makeStyles((theme) => ({
    row: {
        borderBottom: '1px solid #e1e1e1'
    }
}));

const Floor = ({ data }) => {
    const [layout, setLayout] = useState([]);
    const [addTable, setAddTable] = useState(false);
    const [floor, setFloor] = useState({ tables: [] })
    const classes = useStyles();
    //const dispatch = useDispatch();
    // const setFloor = (floor) => dispatch(setFloorAction(floor));

    useEffect(() => {
        api.request('GET', 'floors', {}, { param: `/${data._id}` })()
            .then(res => {
                setFloor(res);
            })
    }, [data])

    return (
        <Grid container justify="center">
            <Grid item xs={6} >
                <Typography variant="h5" align="center">{floor.name}</Typography>
                <GridLayout
                    cols={20}
                    rows={14}
                    rowHeight={25}
                    width={500}
                    height={500}
                    maxRows={14}
                    compactType={null}
                    preventCollision
                    // autoSize={false}
                    style={{ width: '500px', height: '500px', backgroundColor: '#e1e1e1' }}>
                    {floor.tables.map((table, i) => <div key={i} data-grid={{ ...table._data, static: true }}><Table table={table} /></div>)}
                </GridLayout>
            </Grid>
        </Grid>
    )
}

export default Floor;