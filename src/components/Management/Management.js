import { Autocomplete,  Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

function Management() {

    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [errorMovie, setErrorMovie] = useState(null);
    const [isLoadedMovie, setIsLoadedMovie] = useState(false);
    const [hallList, sethallList] = useState([]);
    const [selectedHall, setSelectedHall] = useState(null);
    const [errorHall, setErrorHall] = useState(null);
    const [isLoadedHall, setIsLoadedHall] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

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
        if (selectedMovie != null && selectedHall != null) {
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
        }

    }


    return (
        <div>

            <Typography
                variant="h3"
                display="flex"
                justifyContent="center"
                mt={2}>
                Sinema Yönetim Ekranı
            </Typography>

            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4} >
                <Stack direction={"row"} spacing={2} justifyContent={"center"} mt={10}>
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

                <Button style={{ backgroundColor: "#00b9c9" }}
                    onClick={assignMovie}
                    variant="contained">
                    Onayla</Button>
            </Stack>

            {console.log(selectedHall)}
            {console.log(selectedDateTime)}



        </div>

    )
}
export default Management;