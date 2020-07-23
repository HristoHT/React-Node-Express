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

const useStyles = makeStyles((theme) => ({
    receipt: {
        maxHeight: '80vh'
    }
}));

const PosReceipt = ({ ...rest }) => {
    const classes = useStyles();
    const bill = useSelector(state => (state.currentTable.bill || {}));
    const [sum, setSum] = useState(0);
    const [rows, setRows] = useState([])

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
    }, [bill.items])

    return (
        <TableContainer component={Paper}>
            <TableContainer className={classes.receipt}>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Продукт</TableCell>
                            <TableCell align="center">Кол.</TableCell>
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
                            <TableCell align="right"><Typography fontWeight="fontWeightBold">{sum}</Typography></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TableContainer>
    )
}

export default PosReceipt;