import React, { useEfect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, externalClose, setOpen, action }) {
    const handleClose = () => {
        setOpen(false);
        if (externalClose) externalClose(false);
    };

    const handleDelete = () => {
        action();
        handleClose();
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