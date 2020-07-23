import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import "../utils/css/Table.css";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import AddItemDialog from './AddItemDialog';

const useStyles = makeStyles((theme) => ({
    tag: {
        width: '20px',
        paddingRight: '5px',
        '&:hover': {
            backgroundColor: '#d8d8d8',
            borderRadius: '25px'
        },
    },
    button: {
        width: 'calc(100% - 20px)',
        padding: 2.5,
    },
    row: {
        width: '100%',
        display: 'flex',
        '&:hover': {
            backgroundColor: '#e1e1e1'
        },
        border: '0.1px solid #fafafa'
    }
}));

const GroupButton = ({ element, i, openGroup }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(null);

    const handleEdit = (element) => () => {
        setOpen(true);
    };

    useEffect(() => {
        if (open) {
            setDialog(<AddItemDialog open={open} setOpen={setOpen} element={element} action='update' />)
        } else {
            setDialog(null);
        }
    }, [open])

    return (
        <div className={`Table-row ${classes.row}`} >
            <div className={classes.button} onClick={openGroup(i, element.index)}>
                {element.name}
            </div>
            <div className={classes.tag} onClick={handleEdit(element)}>
                <MoreVertIcon />
            </div>

            {dialog}
        </div>
    )
}

export default function GroupList({ data, openGroup }) {
    const classes = useStyles();

    return (
        <Grid container>
            {data.map((element, i) =>
                <GroupButton element={element} i={i} openGroup={openGroup} />
            )}
        </Grid>
    );
}