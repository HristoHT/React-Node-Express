import React, { useEfect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../globals/api';

export default function AlertDialog({ open, externalClose, setOpen, path }) {
    const handleClose = () => {
        setOpen(false);
        externalClose(false);
    };

    const handleDelete = () => {
        api.request('DELETE', 'menus', {}, { param: `/${path}` })()
            .then(data => {
                handleClose();
            }).catch(e => {
                alert('Error')
            });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Наистина ли желаете да изтриете този елемент?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Затвори
          </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Изтрий
          </Button>
            </DialogActions>
        </Dialog>
    );
}