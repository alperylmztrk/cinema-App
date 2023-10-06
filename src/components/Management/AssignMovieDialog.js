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

export default function AssignMovieDialog(props) {


    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedHall, setSelectedHall] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");


    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
    };

    const handleCloseFail = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenFail(false);
    };

    const handleEmptyMovieAndHall = () => {
        setErrorMsg("Lütfen film ve salon seçiniz")
        setOpenFail(true);
    }

    const assignMovie = () => {

        fetch("/assignedMovies", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movieId: selectedMovie.id,
                hallId: selectedHall.id,
                startDateTime: format(selectedDateTime, "dd/MM/yyyy HH:mm"),
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    console.log("Hata oluştu. Durum Kodu: " + res.status);
        
                    // Hata durumunu özel olarak işleyebilirsiniz.
                    return res.json().then((errorJson) => {
                        console.log(errorJson)
                        setErrorMsg(errorJson.message)
                        setOpenFail(true);
                        throw new Error(errorJson.message || "Sunucu hatası");
                    });
                }
                return res.json()

            })
            .then(json => {
                console.log("istek atıldı " + json)
                props.kapat()
                setOpenSuccess(true);

            })
            .catch((error) => console.log(error));

        console.log("Film atandı..." + selectedMovie.id + " " + selectedHall.id + " " + format(selectedDateTime, "dd/MM/yyyy HH:mm"));

    }

    return (
        <div>
            <Dialog
                maxWidth={"lg"}
                fullWidth={true}
                open={props.open}
                onClose={props.kapat}
            >
                <DialogTitle>Film Atama</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hangi filmin nerede ve ne zaman oynatılacağını ayarlayın.
                    </DialogContentText>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4} >
                        <Stack direction={"row"} spacing={2} justifyContent={"center"} mt={5}>
                            <Autocomplete
                                id="combo-box-movie"
                                options={props.filmler}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Film" />}
                                getOptionLabel={option => option.title}
                                onChange={(event, newMovie) => {
                                    setSelectedMovie(newMovie);
                                }}
                                value={selectedMovie}
                                disableScrollLock

                            />
                            <Autocomplete
                                id="combo-box-hall"
                                options={props.salonlar}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Salon" />}
                                getOptionLabel={option => option.name}
                                onChange={(event, newHall) => {
                                    setSelectedHall(newHall);
                                }}
                                value={selectedHall}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Film zamanı"
                                    onChange={(newDateTime) => {
                                        setSelectedDateTime(newDateTime);
                                    }}
                                    value={selectedDateTime}
                                    ampm={false}
                                    minDateTime={new Date()}
                                    inputFormat="dd/MM/yyyy HH:mm"
                                />
                            </LocalizationProvider>

                        </Stack>
                        {selectedMovie !== null && selectedHall !== null ? <Button style={{ backgroundColor: "#00b9c9" }}
                            onClick={assignMovie}
                            variant="contained">
                            Onayla</Button> : <Button style={{ backgroundColor: "#00b9c9" }}
                                onClick={handleEmptyMovieAndHall}
                                variant="contained">
                            Onayla</Button>}


                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.kapat}>Kapat</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                sx={{ marginTop: 6 }}
                open={openSuccess}
                autoHideDuration={4000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="success" >
                    <AlertTitle>Film Atandı</AlertTitle>
                    {selectedMovie !== null && selectedHall !== null &&
                        selectedMovie.title + ",  " + selectedHall.name + "'e atandı ve " +
                        "başlangıç zamanı " + format(selectedDateTime, "dd/MM/yyyy HH:mm") + " olarak ayarlandı."
                    }
                </Alert>
            </Snackbar>
            <Snackbar
                sx={{ marginTop: 6 }}
                open={openFail}
                autoHideDuration={3000}
                onClose={handleCloseFail}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="error" >
                    <AlertTitle>Film Atanamadı!!!</AlertTitle>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}