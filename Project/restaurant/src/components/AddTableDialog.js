import React, { useEffect, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from './Table';
import Alert from '@material-ui/lab/Alert';

import { useDispatch } from 'react-redux'
import { addTableAction } from '../store/actions';
import actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
    image: {
        width: 32 * 6.5,
        height: 32 * 6.5,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '80%',
        maxHeight: '80%',
    },
    input: {
        display: 'none'
    },
    dialog: {
        //height: '40vh'
        width: '20vw'
    }
}));

export default function AddItemDialog({ open, setOpen, ...props }) {
    const classes = useStyles();
    const [table, setTable] = useState({ width: 100, height: 100, name: '', locked: false })
    const [error, setError] = useState({ error: false, message: "Въведете номер на маса" })
    const dispatch = useDispatch()
    const addTable = table => dispatch(addTableAction(table));

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        let attr = e.target.id;
        setTable({ ...table, [attr]: Number(e.target.value) || 0 });
    }

    const handleAdd = (e) => {
        if (!table.name) {
            setError({ show: true, message: "Въведете номер на маса" });
        } else if (table.width < 100) {
            setError({ show: true, message: "Широчината не може да е по-малка от 100" });
        } else if (table.height < 100) {
            setError({ show: true, message: "Височината не може да е по-малка от 100" });
        } else {
            addTable(table);
            setTable({ width: 100, height: 100, name: '' });
            handleClose();
        }

    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle id="form-dialog-title">
                <Grid container justify="space-between">
                    <Grid item>Добавяне на маса</Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.dialog}>
                <Grid container direction="column" alignItems="center" spacing={2} >
                    <Grid item>
                        <TextField
                            id="name"
                            label="Номер"
                            defaultValue={table.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="width"
                            label="Широчина"
                            defaultValue={table.width}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="height"
                            label="Височина"
                            defaultValue={table.height}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {error.show && <Alert severity="error" variant="filled">{error.message}</Alert>}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Затвори
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Добави
                </Button>
            </DialogActions>
        </Dialog>
    );
}