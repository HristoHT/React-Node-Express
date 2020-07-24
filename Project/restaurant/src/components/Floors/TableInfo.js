import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../globals/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import pages from '../../globals/pages';
import { formatNumber } from '../../globals/NumberFormat';

const useStyles = makeStyles((theme) => ({
    receipt: {
        maxHeight: '80vh'
    },
    root: {
        padding: 15
    }
}));

export default function AlertDialog({ open, setOpen, table }) {
    const classes = useStyles();
    const [sum, setSum] = useState(0);
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
    }

    const handlePay = () => {
        api.request('DELETE', 'tables', {}, { param: `/${table._id}` })()
            .then(res => {
                handleClose();
            })
            .catch(err => {
                //TODO handle global errors
            });
    }

    const handleStart = () => {
        api.request('POST', 'tables', { bill: { items: [], startDate: new Date() } }, { param: `/${table._id}` })()
            .then(res => {
                history.push({
                    pathname: pages.menu,
                    state: { table }
                });
            })
            .catch(err => {
                //TODO handle global errors
            });
    }

    useEffect(() => {
        if (table.bill.items) {
            var localSum = 0;
            table.bill.items.forEach(item => {
                localSum += item.quantity * item.price;
            });

            setSum(localSum)
        }
    }, [table])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Маса {table.name}</DialogTitle>
            <DialogContent>
                {!table.active && <Typography>
                    Масата няма започната сметка
                </Typography>}
                {table.active && <TableContainer>
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
                                {table.bill.items.map(row => {
                                    return (
                                        <TableRow>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell align="center">{row.quantity}</TableCell>
                                            <TableCell align="right">{formatNumber(row.price)}</TableCell>
                                            <TableCell align="right">{formatNumber(row.quantity * row.price)}</TableCell>
                                        </TableRow>
                                    )
                                })}
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
                </TableContainer>}
            </DialogContent>
            <DialogActions>
                {!table.active && <Button onClick={handleStart} color="primary">
                    Започни сметка
                </Button>}
                {table.active && <Button onClick={handlePay} color="secondary">
                    Приключи сметка
                </Button>}
                <Button onClick={handleClose} color="primary">
                    Затвори
                </Button>
            </DialogActions>
        </Dialog>
    );
}