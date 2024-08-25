import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Dialog,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { request } from "../../helpers/axios_helper";

export default function AddMovieDialog(props) {
  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [summary, setSummary] = useState("");
  const [pUrl, setPUrl] = useState("");

  const [open, setOpen] = useState(false);

  const [ratingError, setRatingError] = useState(false);
  const [ratingErrorText, setRatingErrorText] = useState("");

  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };
  const handleRatingChange = (event) => {
    const value = event.target.value;
    if (value > 5) {
      setRatingError(true);
      setRatingErrorText("Puan 5'ten büyük olamaz!");
    } else {
      setRatingError(false);
      setRatingErrorText("");
    }
    setRating(value);
  };
  const handleDirectorChange = (event) => {
    setDirector(event.target.value);
  };
  const handleCastChange = (event) => {
    setCast(event.target.value);
  };
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };
  const handlePUrlChange = (event) => {
    setPUrl(event.target.value);
  };

  const closeDialog = () => {
    props.onClose();
    setRatingError(false);
    setRatingErrorText("");
  };

  const handleEkle = () => {
    if (rating > 5) return;
    request(
      "POST",
      "/movies",
      JSON.stringify({
        title: movieName,
        genre: genre,
        duration: duration,
        director: director,
        actors: cast,
        rating: rating,
        summary: summary,
        posterImgPath: pUrl,
      })
    )
      .then((response) => {
        if (response.status == 200) {
          props.setMovieList((prevMovies) => [...prevMovies, response.data]);
          closeDialog();
          setOpen(true);
          console.log("Film eklendi..." + response.data);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth={"lg"} open={props.open} onClose={closeDialog}>
        <DialogTitle>Film Ekleme</DialogTitle>
        <DialogContent>
          <DialogContentText>Film bilgilerini giriniz...</DialogContentText>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "45ch" },
            }}
            noValidates
            autoComplete="off"
          >
            <div>
              <TextField
                id="filmAdi"
                label="Film Adı"
                variant="outlined"
                onChange={handleMovieNameChange}
              />
              <TextField
                id="tur"
                label="Tür"
                variant="outlined"
                onChange={handleGenreChange}
              />
            </div>

            <div>
              <TextField
                id="sure"
                label="Süre"
                variant="outlined"
                type="number"
                onChange={handleDurationChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">dk</InputAdornment>
                  ),
                }}
              />
              <TextField
                id="puan"
                label="Puan"
                variant="outlined"
                type="number"
                error={ratingError}
                helperText={ratingErrorText}
                onChange={handleRatingChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">/5</InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                id="yonetmen"
                label="Yönetmen"
                variant="outlined"
                onChange={handleDirectorChange}
              />
              <TextField
                id="oyuncular"
                label="Oyuncular"
                variant="outlined"
                onChange={handleCastChange}
              />
            </div>

            <div>
              <TextField
                id="ozet"
                label="Özet"
                variant="outlined"
                onChange={handleSummaryChange}
              />
              <TextField
                id="posterUrl"
                label="Poster Url"
                variant="outlined"
                onChange={handlePUrlChange}
              />
            </div>

            <Button
              style={{ backgroundColor: "#00b9c9", marginTop: 20 }}
              onClick={handleEkle}
              variant="contained"
            >
              Ekle
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Kapat</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Film eklendi: {movieName}
        </Alert>
      </Snackbar>
    </div>
  );
}
