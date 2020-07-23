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

import { changeQuantityAction } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    receipt: {
        maxHeight: '80vh'
    },
    tbody: {

    }
}));

const PosReceiptRow = ({ data }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const incrementQuantity = (item) => dispatch(changeQuantityAction({ item, quantity: 1 }));
    const decrementQuantity = (item) => dispatch(changeQuantityAction({ item, quantity: -1 }));

    return (<TableRow key={data.name}>
        <TableCell component="th" scope="row">
            {data.name}
        </TableCell>
        <TableCell align="center">
            <ButtonGroup
                variant="outlined"
                size="small"
            >
                <Button onClick={() => decrementQuantity(data)}>-</Button>
                <Grid container justify="center" alignItems="center" style={{ border: '1px solid #d0d0d0' }}>{data.quantity}</Grid>
                <Button onClick={() => incrementQuantity(data)}>+</Button>
            </ButtonGroup></TableCell>
        <TableCell align="right">{data.price}</TableCell>
    </TableRow>)
}

export default PosReceiptRow;