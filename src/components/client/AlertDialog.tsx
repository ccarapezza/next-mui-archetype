"use client"
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { on } from 'events';

export default function AlertDialog({id, type, message, title, open = true, setOpen = ()=>{}, onConfirm, onCancel, onClose}: {id: string, type:"message"|"confirm", message: string, title?: string, open?: boolean, setOpen?: React.Dispatch<React.SetStateAction<boolean>>, onConfirm?: () => void, onCancel?: () => void, onClose?: (id: string) => void}) {

  const [openState, setOpenState] = useState<boolean>(open);

  const handleClose = () => {
    if(onCancel){
      onCancel();
    }
    closeDialog();
  };

  const handleConfirm = () => {
    if(onConfirm){
      onConfirm();
    }
    closeDialog();
  };

  const closeDialog = () =>{
    setOpenState(false);
    setOpen(false);
    onClose&&onClose(id);
  }

  return (
      <Dialog
        open={openState}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title&&
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {type==="confirm"&&
            <Button onClick={handleClose}>Cancelar</Button>
          }
          <Button onClick={handleConfirm} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
  );
}
