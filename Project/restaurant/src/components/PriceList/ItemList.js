import React, { useState, useEffect } from "react";
import "../utils/css/Table.css";
import { formatNumber } from '../../globals/NumberFormat';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    row: {
        borderBottom: '1px solid #d9d9d9'
    },
    image_container: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        display: 'flex'
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));
function ItemList({ data }) {
    const classes = useStyles();

    return (
        <Grid container>
            {(data || []).map(row => <Item row={row} />)}
        </Grid>
    )
};

export default ItemList;