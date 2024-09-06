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
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { request } from "../../helpers/axios_helper";

export default function AddMovieDialog(props) {
  const [hallName, setHallName] = useState("");
  const [capacity, setCapacity] = useState(0);

  const [open, setOpen] = useState(false);

  const handleHallNameChange = (event) => {
    setHallName(event.target.value);
  };
  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleEkle = () => {
    request(
      "POST",
      "/halls",
      JSON.stringify({
        name: hallName,
        capacity: capacity,
      })
    )
      .then((response) => {
        if (response.status == 200) {
       
          props.setHallList((prevHalls) => [...prevHalls, response.data]);
          props.kapat();
          setOpen(true);
          console.log("Salon eklendi..." + hallName);
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
        <DialogTitle>Salon Ekleme</DialogTitle>
        <DialogContent>
          <DialogContentText>Salon bilgilerini giriniz...</DialogContentText>

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
            <Box display={"flex"} flexDirection={"column"} mt={2}>
              <TextField
                id="salonAdi"
                label="Salon Adı"
                variant="outlined"
                onChange={handleHallNameChange}
              />
              <TextField
                id="capacity"
                label="Koltuk Sayısı"
                variant="outlined"
                onChange={handleCapacityChange}
              />
            </Box>

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
          <Button onClick={props.kapat}>Kapat</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Salon eklendi: {hallName}
        </Alert>
      </Snackbar>
    </div>
  );
}
