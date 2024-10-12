import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Dialog,
} from "@mui/material";
import * as React from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { request } from "../../helpers/axios_helper";
import CustomSnackbar from "../Utilities/CustomSnackbar";

export default function SessionDialog(props) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleEmptyMovieAndHall = () => {
    setSeverity("error");
    setTitle("Seans Oluşturulamadı!");
    setMsg("Lütfen film ve salon seçiniz");
    setOpenSnackbar(true);
  };

  const assignMovie = () => {
    request(
      "POST",
      "/sessions",
      JSON.stringify({
        movieId: selectedMovie.id,
        hallId: selectedHall.id,
        startDateTime: format(selectedDateTime, "dd/MM/yyyy HH:mm"),
      })
    )
      .then((response) => {
        if (response.status === 200) {
          props.kapat();
          setSeverity("success");
          setTitle("Seans Oluşturuldu");
          setMsg(
            selectedMovie !== null &&
              selectedHall !== null &&
              selectedMovie.title +
                ",  " +
                selectedHall.name +
                "'e atandı ve " +
                "başlangıç zamanı " +
                format(selectedDateTime, "dd/MM/yyyy HH:mm") +
                " olarak ayarlandı."
          );
          setOpenSnackbar(true);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
      });
  };

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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
              mt={5}
            >
              <Autocomplete
                id="combo-box-movie"
                options={props.filmler}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Film" />}
                getOptionLabel={(option) => option.title}
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
                renderInput={(params) => (
                  <TextField {...params} label="Salon" />
                )}
                getOptionLabel={(option) => option.name}
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
            {selectedMovie !== null && selectedHall !== null ? (
              <Button
                style={{ backgroundColor: "#00b9c9" }}
                onClick={assignMovie}
                variant="contained"
              >
                Onayla
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#00b9c9" }}
                onClick={handleEmptyMovieAndHall}
                variant="contained"
              >
                Onayla
              </Button>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.kapat}>Kapat</Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={openSnackbar}
        onClose={handleClose}
        severity={severity}
        title={title}
        message={msg}
      ></CustomSnackbar>
    </div>
  );
}
