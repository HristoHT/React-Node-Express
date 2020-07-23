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
import Timer from '../utils/Timer';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTableAction, startTableBillAction } from '../../store/actions';
import pages from '../../globals/pages';

const useStyles = makeStyles((theme) => ({
    table: {
        position: 'absolute',
        display: 'blocked',
        borderRadius: 5,
        userSelect: 'none',
        width: '100%',
        height: '100%'
    },
    badge: {
        position: 'absolute',
        width: 25,
        zIndex: 10,
    },
}));
//table.billStartTime ако вече е била започната сметка да изчисти правилно таймера
const Table = ({ table = { name: '1' }, open, setOpen }) => {
    const classes = useStyles();
    const [locked, setLocked] = useState(false);
    const [bill, setBill] = useState(false);
    const dispatch = useDispatch()

    const setCurrentTable = table => dispatch(setCurrentTableAction(table));
    const startBill = table => dispatch(startTableBillAction(table));

    const handleClose = () => {
        setOpen(false);
    };

    const handleLock = () => {
        setLocked(!locked);
    };

    const handleBill = () => {
        if (bill) {
            //Request for paying
        } else {
            //Request for starting bill
            startBill();
        }

        setBill(!bill);
    }

    return (<Dialog open={open} onClose={handleClose} >
        <DialogTitle id="form-dialog-title">
            Маса №{table.name}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
            2
                    </DialogContent>
        <DialogActions>
            <Button
                color="primary"
                onClick={handleLock}
                endIcon={!locked ? <LockOpenIcon /> : <LockIcon />}
            >
                {locked ? 'Отключи' : 'Заключи'}
            </Button>
            <Button onClick={handleBill} color={bill ? 'secondary' : 'primary'}>
                {bill ? 'Плати' : 'Започни сметака'}
            </Button>
            <Button onClick={handleClose} color="primary">
                Затвори
                        </Button>
        </DialogActions>
    </Dialog>);
}

export default Table;