import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../globals/api';
import { useDispatch } from 'react-redux';
import { setFloorAction } from '../../store/actions'

const defaultState = {
    name: ''
};

export default function FormDialog({ open, setOpen }) {
    const dispatch = useDispatch();
    const setFloor = (floor) => dispatch(setFloorAction(floor));

    const [body, setBody] = useState(defaultState)

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        api.request('POST', 'floors', body)().then(data => {
            setFloor(data);
            setBody(defaultState);
        }).catch(err => {
            //TODO handle global errors
        });
        handleClose();
    }

    const changeField = (field) => (e) => {
        setBody({ ...body, [field]: e.target.value.trim() });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='xs'
            fullWidth>
            <DialogTitle id="form-dialog-title">Добави нов етаж</DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    value={body.name}
                    onChange={changeField('name')}
                    label="Наименование на новия етаж"
                    type="email"
                    fullWidth
                />
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