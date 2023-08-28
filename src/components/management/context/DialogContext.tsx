'use client'
import AlertDialog from "@/components/client/AlertDialog";
import { Snackbar } from "@mui/material";
import { createContext, useState } from "react";

type Dialog = {
    type: "message" | "confirm",
    message: string,
    title?: string,
    onConfirm?: () => void,
    onCancel?: () => void
}

type SnackbarMessage = {
    type: "error" | "success" | "warning" | "info",
    message: string,
    autoHideDuration?: number,
    onConfirm?: () => void,
    onCancel?: () => void
}

export const DialogContext = createContext({
    showMessage: (title: string, message: string) => { },
    showConfirm: (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => { }
});

export const DialogContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [dialogs, setDialogs] = useState<Dialog[]>([]);
    const [snackbar, setSnackbar] = useState<SnackbarMessage[]>([]);
  
    return (
      <DialogContext.Provider value={{
            showMessage: (title: string, message: string) => {
                setDialogs([...dialogs, { type: "confirm", title, message }]);
            },
            showConfirm: (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => {
                setDialogs([...dialogs, { type: "confirm", title, message, onConfirm, onCancel }]);
            }
        }}>
        {children}
        {dialogs?.map((dialog, index) => {
            return <AlertDialog key={`global-dialog-${index}`} id={`global-dialog-${index}`} {...dialog} onClose={(closedId)=>{
                setDialogs(dialogs?.filter((dialog, index) => `global-dialog-${index}` !== closedId));
            }} />
        })}
      </DialogContext.Provider>
    );
  };
