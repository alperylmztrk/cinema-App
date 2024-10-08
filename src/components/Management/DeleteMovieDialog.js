import { Button, Dialog, Snackbar, Alert } from "@mui/material";
import * as React from 'react';

import { useState, useEffect } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteMovieDialog(props) {

    const [open, setOpen] = useState(false);

    const handleSil = () => {

        fetch("/movies/" + props.movieId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            console.log(response);
            props.setMovieList(prevList => prevList.filter(movie => movie.id !== props.movieId));
            props.kapat();
            setOpen(true);
        })

            .catch(error => console.log("hata: " + error))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.kapat}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Filmi silmek istediğinizden emin misiniz?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.movieName} silinecek!!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.kapat}>Vazgeç</Button>
                    <Button onClick={handleSil} autoFocus>
                        Sil
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {props.movieName} silindi
                </Alert>
            </Snackbar>

        </div>
    );
}