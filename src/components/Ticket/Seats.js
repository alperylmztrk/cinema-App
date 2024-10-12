import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  Snackbar,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SeatIcon from "@mui/icons-material/WeekendOutlined";
import SeatIconFilled from "@mui/icons-material/Weekend";
import { Link, useParams } from "react-router-dom";
import { request } from "../../helpers/axios_helper";

function Seats() {
  const { sessionId } = useParams();

  const [reservedSeats, setReservedSeats] = useState([]);
  const [reservedSeatNumbers, setReservedSeatNumbers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [reservedSeatIds, setReservedSeatIds] = useState([]);

  const [seatList, setSeatList] = useState([]);
  const [isLoadedSeatList, setIsLoadedSeatList] = useState(false);
  const [errorSeatList, setErrorSeatList] = useState(null);
  const [session, setSession] = useState();
  const [isLoadedSession, setIsLoadedSession] = useState(false);
  const [errorsession, setErrorsession] = useState(null);

  const [capacity, setCapacity] = useState(0);

  const [open, setOpen] = useState(false);

  const rowsCount = capacity / 10; // Her 10 koltuk için bir satır
  const rows = Array.from({ length: rowsCount }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // A, B, C, ... şeklinde harfler
  const columns = Array.from({ length: 10 }, (_, i) => i + 1); // 1'den 10'a kadar sütunlar

  useEffect(() => {
    request("GET", "sessions/" + sessionId)
      .then((response) => {
        console.log(response.data);
        setSession(response.data);
        setIsLoadedSession(true);
        setCapacity(response.data.hallCapacity);
        setReservedSeatIds(response.data.reservedSeatIds);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response);
        console.log(error.response.data);
        setIsLoadedSession(true);
        setErrorsession(error);
      });
  }, []);

  useEffect(() => {
    if (capacity !== 0) {
      request("GET", "seats/limit/" + capacity)
        .then((response) => {
          setSeatList(response.data);
          console.log(response.data);
          setIsLoadedSeatList(true);
        })
        .catch((error) => {
          console.log("hataaa  " + error);
          console.log(error.response);
          console.log(error.response.data);
          setIsLoadedSeatList(true);
          setErrorSeatList(error);
        });
    }
  }, [capacity]);

  //use effectin içine almayı dene
  if (isLoadedSession) {
    reservedSeats.map((reservedSeat) => {
      if (!reservedSeatNumbers.includes(reservedSeat.number)) {
        reservedSeatNumbers.push(reservedSeat.number);
      }
    });
  }

  const handleSelectedSeats = (index) => {
    console.log(index);
    console.log(seatList[index].number);

    if (
      !selectedSeats.includes(seatList[index]) &&
      !reservedSeatNumbers.includes(seatList[index].number)
    ) {
      selectedSeats.push(seatList[index]);
    } else if (selectedSeats.includes(seatList[index])) {
      for (var i = 0; i < selectedSeats.length; i++) {
        if (selectedSeats[i] === seatList[index]) {
          selectedSeats.splice(i, 1);
          i--;
        }
      }
    }

    setSelectedSeats((oldArray) => [...oldArray]);

    console.log(reservedSeatNumbers);
    console.log(selectedSeats);
  };

  const handleAlert = () => {
    setOpen(true);
    console.log(session.movie);
    console.log(reservedSeats);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (errorsession || errorSeatList) {
    return <div>Error !!!</div>;
  } else if (!isLoadedSession || !isLoadedSeatList) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <img src={require("../../Images/gif.gif")} alt="Loading..." />
      </Box>
    );
  } else {
    return (
      <div>
        <Typography variant="h5" display="flex" justifyContent="center" mt={2}>
          Koltuk Seçiniz
        </Typography>
        <Typography variant="h5" display="flex" justifyContent="center" mt={2}>
          {session.movieTitle}
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={5}
        >
          <Stack alignItems={"center"}>
            <Divider
              orientation="horizontal"
              color={"#00b9c9"}
              sx={{ mb: 1 }}
              flexItem
            />
            <Typography variant="body1" color="initial" mb={4}>
              Perde
            </Typography>
            <Stack direction={"row"}>
              <Stack>
                <Grid container width={350}>
                  {seatList.map((seat, key) => (
                    <Grid item xs={1.2} md={1.2} lg={1.2}>
                      <IconButton
                        onClick={() => handleSelectedSeats(key)}
                        key={key}
                      >
                        {reservedSeatIds.includes(seat.id) ? (
                          <SeatIconFilled htmlColor="#00b9c9" />
                        ) : selectedSeats.includes(seat) ? (
                          <SeatIconFilled htmlColor="#eb493d" />
                        ) : (
                          <SeatIcon htmlColor="#00b9c9" />
                        )}
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
                <Stack direction={"row"} spacing={3.3} ml={1}>
                  {columns.map((column) => (
                    <Typography variant="body1" color="initial">
                      {column}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              <Stack spacing={2} mt={1} pl={2}>
                {rows.map((row) => (
                  <Typography variant="body1" color="initial">
                    {row}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={"row"} mt={5} spacing={2}>
            <Stack direction={"row"} spacing={0.5}>
              <SeatIconFilled htmlColor="#00b9c9" />
              <Typography variant="body2" alignSelf={"center"}>
                Dolu Koltuk
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <SeatIcon htmlColor="#00b9c9" />
              <Typography variant="body2" alignSelf={"center"}>
                Boş Koltuk
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={0.5}>
              <SeatIconFilled htmlColor="#eb493d" />
              <Typography variant="body2" alignSelf={"center"}>
                Seçiminiz
              </Typography>
            </Stack>
          </Stack>

          {selectedSeats.length !== 0 ? (
            <Link
              to={{ pathname: "./summary" }}
              style={{ textDecoration: "none", boxShadow: "none" }}
              state={{ selectedSeats: selectedSeats }}
            >
              <Button
                style={{
                  backgroundColor: "#00b9c9",
                  marginTop: "10vh",
                  marginBottom: "5vh",
                }}
                variant="contained"
              >
                Devam
              </Button>
            </Link>
          ) : (
            <Button
              style={{
                backgroundColor: "#00b9c9",
                marginTop: "10vh",
                marginBottom: "5vh",
              }}
              onClick={handleAlert}
              variant="contained"
            >
              Devam
            </Button>
          )}

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Lütfen koltuk seçiniz
            </Alert>
          </Snackbar>
        </Box>
      </div>
    );
  }
}
export default Seats;
