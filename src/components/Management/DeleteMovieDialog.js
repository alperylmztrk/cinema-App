import { Autocomplete, Button, Stack, TextField, Dialog, Typography, Snackbar, Alert, AlertTitle, Box, IconButton } from "@mui/material";
import * as React from 'react';
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { useState, useEffect } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteMovieDialog(props) {

    const handleSil = () => {

        fetch("/movies/" + props.movieId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            props.setMovieList(prevList => prevList.filter(movie => movie.id !== props.movieId));
            props.kapat();
        })

            .catch(error => console.log("hata: " + error))

    }


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

        </div>
    );
}