import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "../utils/css/Table.css";

import AddFloor from './AddFloor';

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
            setDialog(<AddFloor open={open} setOpen={setOpen} action='update' floor={element} />)
        } else {
            setDialog(null);
        }
    }, [open])

    return (
        <div className={`Table-row ${classes.row}`} key={i}>
            <div className={classes.button} onClick={openGroup(element)}>
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