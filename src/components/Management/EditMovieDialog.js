import {
  Button,
  TextField,
  Dialog,
  Box,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { request } from "../../helpers/axios_helper";

export default function EditMovieDialog(props) {
  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState(0);
  const [rating, setRating] = useState(0);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [summary, setSummary] = useState("");
  const [pUrl, setPUrl] = useState("");

  const [open, setOpen] = useState(false);

  const [ratingError, setRatingError] = useState(false);
  const [ratingErrorText, setRatingErrorText] = useState("");

  useEffect(() => {
    if (props.movie) {
      setMovieName(props.movie.title || "");
      setGenre(props.movie.genre || "");
      setDuration(props.movie.duration || 0);
      setRating(props.movie.rating || 0);
      setDirector(props.movie.director || "");
      setCast(props.movie.actors || "");
      setSummary(props.movie.summary || "");
      setPUrl(props.movie.posterImgPath || "");
    }
    console.log("useefect");
  }, [props.movie,props.open]);

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
  };

  const handleEdit = () => {
    if (rating > 5) return;
    request(
      "PUT",
      "/movies/" + props.movie.id,
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
          props.setMovieList((prevMovies) =>
            prevMovies.map((movie) =>
              movie.id === props.movie.id ? response.data : movie
            )
          );

          closeDialog();
          setOpen(true);
          console.log("Film Güncellendi..." + response.data);
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
      <Dialog maxWidth={"lg"} open={props.open} onClose={props.kapat}>
        <DialogTitle>Film Düzenle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Film bilgilerini güncelleyiniz...
          </DialogContentText>

          <Box
            component="form"
            mt={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "45ch" },
            }}
            noValidates
            autoComplete="off"
          >
            {console.log("boxxxxxx")}
            <div>
              <TextField
                label="Film Adı"
                variant="outlined"
                onChange={handleMovieNameChange}
                value={movieName}
              />

              <TextField
                label="Tür"
                variant="outlined"
                onChange={handleGenreChange}
                value={genre}
              />
            </div>
            <div>
              <TextField
                id="sure"
                label="Süre"
                variant="outlined"
                type="number"
                onChange={handleDurationChange}
                value={duration}
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
                value={rating}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">/5</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                label="Yönetmen"
                variant="outlined"
                onChange={handleDirectorChange}
                value={director}
              />
              <TextField
                label="Oyuncular"
                variant="outlined"
                onChange={handleCastChange}
                value={cast}
              />
            </div>
            <div>
              <TextField
                label="Özet"
                variant="outlined"
                onChange={handleSummaryChange}
                value={summary}
              />
              <TextField
                label="Poster Url"
                variant="outlined"
                onChange={handlePUrlChange}
                value={pUrl}
              />
            </div>
            <Button
              style={{ backgroundColor: "#00b9c9", marginTop: 20 }}
              onClick={handleEdit}
              variant="contained"
            >
              Güncelle
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Kapat</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Film Güncellendi: {movieName}
        </Alert>
      </Snackbar>
    </div>
  );
}
