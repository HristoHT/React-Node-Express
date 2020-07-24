import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import Table from './TableBody';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'react-grid-layout/css/styles.css';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddTable from './AddTable';
import api from '../../globals/api';
import { useDispatch, useSelector } from 'react-redux';
import { setFloorAction } from '../../store/actions';
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

    const handleSave = () => {
        //Във layout-ът има параметър i показващ на коя позиция в масива се намират
        //Заменям променените позиции на масите от layout-a
        //Не би трябвало да има по-малко или повече маси, тъй като ъпдейтвам floor-а на Добавяне и Изтриване
        floor.tables = floor.tables.map((table, i) => {
            const index = layout.findIndex((data_table) => i === Number(data_table.i));
            let forSave = { ...layout[index] };
            delete forSave.i;
            return { ...table, _data: forSave };
        })

        api.request('PUT', 'floors', floor)()
            .then(res => {
                setFloor(res);
            }).catch(e => {
                //TODO handle global errors
            })
    }

    const handleAddTable = () => {
        setAddTable(true);
    }

    const handleLayoutChange = (layout) => {
        setLayout(layout);
    }

    useEffect(() => {
        api.request('GET', 'floors', {}, { param: `/${data._id}` })()
            .then(res => {
                setFloor(res);
            })
    }, [data])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} >
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
                    style={{ width: '500px', height: '500px', backgroundColor: '#e1e1e1' }}
                    onLayoutChange={handleLayoutChange}>
                    {floor.tables.map((table, i) => <div key={i} data-grid={{ ...table._data }}><Table table={table} /></div>)}
                </GridLayout>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom>{floor.name}</Typography>
                </Grid>
                <Grid item xs container
                    justify="space-around"
                    spacing={3}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleAddTable}>Добави маса</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleSave}>Запиши</Button>
                    </Grid>
                </Grid>
                <Grid item xs container spacing={3} justify="center" style={{ marginTop: 5 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">Маси</Typography>
                    </Grid>
                    {floor.tables.map(el =>
                        <Grid item xs={8} container justify="space-between" className={classes.row}>
                            <Grid item>{el.name}</Grid>
                            <Grid item ><IconButton size="small"><SettingsIcon fontSize="small" /></IconButton></Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <AddTable open={addTable} setOpen={setAddTable} floor={floor} />
        </Grid>
    )
}

export default Floor;