import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '../components/PosMenu/Menu';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PosReceipt from '../components/PosMenu/PosReceipt'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 10,
    },
    // receipt: {
    //     margin: 5
    // }
}));

const PosMenu = ({ ...rest }) => {
    const classes = useStyles();
    const currentTable = useSelector(state => state.currentTable);

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item xs={8}>
                <Menu />
            </Grid>
            <Grid container item xs={4} component={Paper} className={classes.receipt}>
                <Grid container justify="center">
                    <Typography variant="h3">Маса №{currentTable.name}</Typography>
                </Grid>
                <Grid container xs={12} space={1}>
                    <PosReceipt />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PosMenu;