import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTableAction, startTableBillAction } from '../../store/actions';
import pages from '../../globals/pages';
import TableInfo from './TableInfo';

const useStyles = makeStyles((theme) => ({
    table: {
        position: 'absolute',
        display: 'blocked',
        borderRadius: 5,
        userSelect: 'none',
    },
    badge: {
        position: 'absolute',
        bottom: 0
    },
}));
//table.billStartTime ако вече е била започната сметка да изчисти правилно таймера
const Table = ({ table, ...rest }) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const openInfo = () => {
        setOpen(true);
    }

    const handleAdd = () => {
        history.push({
            pathname: pages.menu.path,
            state: { table }
        });
    }

    return (
        <Grid style={{ width: '100%', height: '100%' }}
            className={classes.table}
            component={Paper}>
            {console.log((new Date()).getTime(), Date.parse(table.bill.startDate), (new Date()).getTime() - Date.parse(table.bill.startDate))}
            <Grid item>
                <Typography variant='subtitle1' color={!table.active ? 'primary' : 'secondary'}>{table.name}</Typography>
                <Typography variant='subtitle2' color={!table.active ? 'primary' : 'secondary'}>
                    {/* <Timer startTime={table.active ? new Date(String(table.bill.startDate)) : null} play={table.active} /> */}
                    {/* <Timer initialDate={table.active ? Date.parse(table.bill.startDate) : 0}></Timer> */}
                </Typography>
            </Grid>
            <Grid item xs container justify="flex-end" className={classes.badge}>
                <Grid item>
                    <IconButton size="small" onClick={handleAdd}><AddIcon /></IconButton>
                </Grid>
                <Grid item>
                    <IconButton size="small" onClick={openInfo}><InfoIcon /></IconButton>
                </Grid>
            </Grid>
            <TableInfo open={open} setOpen={setOpen} table={table}/>
        </Grid >)

}

export default Table;