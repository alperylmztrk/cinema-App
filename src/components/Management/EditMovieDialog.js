import { Button, TextField, Dialog, Box, InputAdornment } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditMovieDialog(props) {
  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState(0);
  const [rating, setRating] = useState(0);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [summary, setSummary] = useState("");
  const [pUrl, setPUrl] = useState("");

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
  }, [props.movie]);

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

  const handleEkle = () => {
    console.log(movieName);
    console.log(genre);

    fetch("/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: movieName,
        genre: genre,
        duration: duration,
        director: director,
        cast: cast,
        rating: rating,
        summary: summary,
        posterImgPath: pUrl,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error));

    console.log("Film eklendi..." + movieName);
  };

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
      <Dialog maxWidth={"lg"} open={props.open} onClose={props.kapat}>
        <DialogTitle>Film Düzenle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Film bilgilerini güncelleyiniz...
          </DialogContentText>

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
                label="Film Adı"
                variant="outlined"
                onChange={handleMovieNameChange}
                value={movieName}
              />

              <TextField
                label="Tür"
                variant="outlined"
                onChange={handleGenreChange}
                defaultValue={genre}
              />
            </div>

            <div>
              <TextField
                id="sure"
                label="Süre"
                variant="outlined"
                type="number"
                onChange={handleDurationChange}
                defaultValue={duration}
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
                defaultValue={rating}
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
                defaultValue={director}
              />
              <TextField
                label="Oyuncular"
                variant="outlined"
                onChange={handleCastChange}
                defaultValue={cast}
              />
            </div>

            <div>
              <TextField
                label="Özet"
                variant="outlined"
                onChange={handleSummaryChange}
                defaultValue={summary}
              />
              <TextField
                label="Poster Url"
                variant="outlined"
                onChange={handlePUrlChange}
                defaultValue={pUrl}
              />
            </div>

            <Button
              style={{ backgroundColor: "#00b9c9", marginTop: 20 }}
              onClick={handleEkle}
              variant="contained"
            >
              Kaydet
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
