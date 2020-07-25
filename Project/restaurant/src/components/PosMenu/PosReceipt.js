import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import PosReceiptRow from './PosReceiptRow';
import { useHistory } from 'react-router-dom';
import api from '../../globals/api';
import { formatNumber } from '../../globals/NumberFormat';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    receipt: {
        maxHeight: '80vh'
    },
    root: {
        padding: 15
    }
}));

const PosReceipt = ({ ...rest }) => {
    const classes = useStyles();
    const history = useHistory();
    const bill = useSelector(state => (state.currentTable.bill || []));
    const currentTable = useSelector(state => (state.currentTable || {}));
    const [sum, setSum] = useState(0);
    const [rows, setRows] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        history.goBack();
    };

    const handleAdd = () => {
        if (currentTable.bill && currentTable.bill.items && currentTable.bill.items.length) {
            api.request('POST', 'tables', { bill: currentTable.bill, startDate: new Date() }, { param: `/${currentTable._id}` })()
                .then(data => {
                    handleClose();
                    enqueueSnackbar(`Добавено към сметка на маса ${currentTable.name}`, { variant: 'success' });
                })
                .catch(err => {
                    enqueueSnackbar(err.message, { variant: 'error' });
                });
            } else {
                enqueueSnackbar('Добавете продукти', { variant: 'error' });
        }
    }

    useEffect(() => {
        let localSum = 0, localRows = [];
        if (bill && bill.items) {
            localRows = bill.items.map((row) => {
                localSum += (row.quantity * row.price);

                return (<PosReceiptRow data={row} />)
            });
        }

        setSum(localSum);
        setRows(localRows);
    }, [bill.items]);

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <TableContainer>
                    <TableContainer className={classes.receipt}>
                        <Table size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Продукт</TableCell>
                                    <TableCell align="center">Кол.</TableCell>
                                    <TableCell align="right">Ед. цена</TableCell>
                                    <TableCell align="right">Цена</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(e => e)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer >
                        <Table size="small" >
                            <TableFooter>
                                <TableRow>
                                    <TableCell><Typography fontWeight="fontWeightBold"> Общо:</Typography></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right"><Typography fontWeight="fontWeightBold">{formatNumber(sum)}</Typography></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </TableContainer>
            </Grid>
            <Grid item xs container justify="space-around">
                <Grid item>
                    <Button color='primary' onClick={handleAdd}>
                        Добави
                    </Button>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={handleClose}>
                        Затвори
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PosReceipt;