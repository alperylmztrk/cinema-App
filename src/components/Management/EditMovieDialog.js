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

export default function EditMovieDialog(props) {

    const [movieName, setMovieName] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState("");
    const [director, setDirector] = useState("");
    const [cast, setCast] = useState("");
    const [summary, setSummary] = useState("");
    const [pUrl, setPUrl] = useState("");


    const handleMovieNameChange = (event) => {
        setMovieName(event.target.value);
    }
    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    }
    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    }
    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }
    const handleDirectorChange = (event) => {
        setDirector(event.target.value);
    }
    const handleCastChange = (event) => {
        setCast(event.target.value);
    }
    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    }
    const handlePUrlChange = (event) => {
        setPUrl(event.target.value);
    }
    const handleEkle = () => {
        console.log(movieName);
        console.log(genre);

        fetch("/movies", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                title: movieName,
                genre: genre,
                duration: duration,
                director: director,
                cast: cast,
                rating: rating,
                summary: summary,
                posterImgPath: pUrl
            }),
        })
            .then((res) => res.json())
            .then(json => console.log(json))
            .catch((error) => console.log(error));

        console.log("Film eklendi..." + movieName);

    }

    // useEffect(() => {
    //     const fetchData = async () => {

    //         fetch("/movies/" + props.movieId)
    //             .then(res => res.json())
    //             .then((result) => {

    //                 setIsLoaded(true);
    //                 setMovie(result);
    //                 console.log(result);
    //             }, (error) => {
    //                 setIsLoaded(true);
    //                 setError(error);
    //             }
    //             )
    //     };
    //     fetchData();
    // }, [movieId])

    return (
        <div>
            <Dialog
                maxWidth={"lg"}
                open={props.open}
                onClose={props.kapat}

            >
                <DialogTitle>Film Düzenle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Film bilgilerini giriniz...
                    </DialogContentText>

                    <Box

                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            '& .MuiTextField-root': { m: 1, width: '45ch' },
                        }}
                        noValidates
                        autoComplete="off"
                    >

                        <div>
                            <TextField id="outlined-basic" label="Film Adı" variant="outlined" onChange={handleMovieNameChange} />
                            <TextField id="outlined-basic" label="Tür" variant="outlined" onChange={handleGenreChange} />
                        </div>

                        <div>
                            <TextField id="outlined-basic" label="Süre" variant="outlined" onChange={handleDurationChange} />
                            <TextField id="outlined-basic" label="Puan" variant="outlined" onChange={handleRatingChange} />
                        </div>

                        <div>
                            <TextField id="outlined-basic" label="Yönetmen" variant="outlined" onChange={handleDirectorChange} />
                            <TextField id="outlined-basic" label="Oyuncular" variant="outlined" onChange={handleCastChange} />
                        </div>

                        <div>
                            <TextField id="outlined-basic" label="Özet" variant="outlined" onChange={handleSummaryChange} />
                            <TextField id="outlined-basic" label="Poster Url" variant="outlined" onChange={handlePUrlChange} />
                        </div>

                        <Button style={{ backgroundColor: "#00b9c9", marginTop: 20 }}
                            onClick={handleEkle}
                            variant="contained">
                           Kaydet
                        </Button>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.kapat}>Kapat</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}