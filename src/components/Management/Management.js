import { Autocomplete, Button, Stack, TextField, Typography, Snackbar, Alert, AlertTitle, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


function Management() {

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [errorMovie, setErrorMovie] = useState(null);
    const [isLoadedMovie, setIsLoadedMovie] = useState(false);
    const [hallList, sethallList] = useState([]);
    const [selectedHall, setSelectedHall] = useState(null);
    const [errorHall, setErrorHall] = useState(null);
    const [isLoadedHall, setIsLoadedHall] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openEmpty, setOpenEmpty] = useState(false);

    useEffect(() => {
        fetch("/movies")
            .then(res => res.json())
            .then((result) => {
                setIsLoadedMovie(true);
                setMovieList(result);
            }, (errorMovie) => {
                setIsLoadedMovie(true);
                setErrorMovie(errorMovie);
            }
            )
    }, [])

    useEffect(() => {
        fetch("/halls")
            .then(res => res.json())
            .then((result) => {
                setIsLoadedHall(true);
                sethallList(result);
            }, (errorHall) => {
                setIsLoadedHall(true);
                setErrorHall(errorHall);
            }
            )
    }, [])

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
            .then((res) => res.json())
            .then(json => console.log(json))
            .catch((error) => console.log(error));

        console.log("Film atandı..." + selectedMovie.id + " " + selectedHall.id + " " + format(selectedDateTime, "dd/MM/yyyy HH:mm"));

        setOpenSuccess(true);


    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        setOpenEmpty(false);
    };
    const handleEmptyMovieAndHall = () => {
        setOpenEmpty(true);
    }

    if (errorMovie || errorHall) {
        return <div>Error !!!</div>
    } else if (!isLoadedMovie || !isLoadedHall) {
        (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: "calc(100vh - 64px)" }}>
                <img src={require('../../Images/gif.gif')} alt="Loading..." />
            </Box>
        )
    } else {
        return (
            <div>

                <Typography
                    variant="h3"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    Sinema Yönetim Ekranı
                </Typography>


                <Grid item xs={12} md={6} marginLeft={20} marginRight={20}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Filmleri düzenle
                    </Typography>
                    <Demo>
                        <List dense={dense}>
                            {generate(
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            {/* sil düzenle (modal açılsın)*/}
                                            <DeleteIcon />
                                            
                                            <FolderIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>,
                            )}
                        </List>
                    </Demo>
                </Grid>

                <Typography
                    variant="h6"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    Film Atama
                </Typography>



                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4} >
                    <Stack direction={"row"} spacing={2} justifyContent={"center"} mt={5}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-movie"
                            options={movieList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Film" />}
                            getOptionLabel={option => option.title}
                            onChange={(event, newMovie) => {
                                setSelectedMovie(newMovie);
                            }}
                            value={selectedMovie}

                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-hall"
                            options={hallList}
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

                <Snackbar
                    open={openSuccess}
                    autoHideDuration={3500}
                    onClose={handleClose}>
                    <Alert severity="success" >
                        <AlertTitle>Başarılı</AlertTitle>
                        {selectedMovie !== null && selectedHall !== null &&
                            selectedMovie.title + ",  " + selectedHall.name + "'e atandı ve " +
                            "başlangıç zamanı " + format(selectedDateTime, "dd/MM/yyyy HH:mm") + " olarak ayarlandı."
                        }
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openEmpty}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert severity="error" >
                        <AlertTitle>Error</AlertTitle>
                        Lütfen film ve salon seçiniz
                    </Alert>
                </Snackbar>

                {console.log(selectedHall)}
                {console.log(selectedDateTime)}



            </div>

        )
    }
}
export default Management;