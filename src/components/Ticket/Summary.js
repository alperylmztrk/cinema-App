import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useLocation, useParams } from "react-router-dom";
import { Box, Button, Divider, Stack } from "@mui/material";
import sinemaImg from "../../Images/sinema.jpg";
import { format } from "date-fns";
import DateIcon from "@mui/icons-material/CalendarMonth";
import TimeIcon from "@mui/icons-material/Alarm";
import SeatIcon from "@mui/icons-material/Weekend";
import Ticket from "./Ticket";
import { request } from "../../helpers/axios_helper";

function Summary() {
  const styles = {
    box: {
      backgroundImage: `url(${sinemaImg})`,
      width: "50%",

      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",

      display: "flex",
      justifyContent: "center",
    },
  };

  const { sessionId } = useParams();
  const location = useLocation();

  let selectedSeats = [];
  let selectedSeatNumbers = [];
  let selectedSeatIds = [];

  selectedSeats = location.state.selectedSeats;
  selectedSeats.map((selectedSeat) => {
    selectedSeatNumbers.push(selectedSeat.number);
    selectedSeatIds.push(selectedSeat.id);
  });
  selectedSeatNumbers = selectedSeatNumbers.sort(function (a, b) {
    return a.localeCompare(b, "en", { numeric: true });
  });
  console.log(selectedSeatNumbers);
  console.log(selectedSeatIds);

  const [session, setSession] = useState();
  const [isLoadedAssignedMovie, setIsLoadedAssignedMovie] = useState(false);
  const [errorAssignedMovie, setErrorAssignedMovie] = useState(null);
  let dateTime;
  let date = "";
  let time = "";

  useEffect(() => {
    request("GET", "sessions/" + sessionId)
      .then((response) => {
        console.log(response.data);
        setSession(response.data);
        setIsLoadedAssignedMovie(true);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        setIsLoadedAssignedMovie(true);
        setErrorAssignedMovie(error);
      });
  }, [sessionId]);

  if (isLoadedAssignedMovie && !errorAssignedMovie) {
    dateTime = new Date(session.startDateTime);
    date =
      (dateTime.getDate() < 10 ? "0" : "") +
      dateTime.getDate() +
      "/" +
      (dateTime.getMonth() + 1 < 10 ? "0" : "") +
      (dateTime.getMonth() + 1) +
      "/" +
      dateTime.getFullYear();
    console.log(date);
    time =
      (dateTime.getHours() < 10 ? "0" : "") +
      dateTime.getHours() +
      ":" +
      (dateTime.getMinutes() < 10 ? "0" : "") +
      dateTime.getMinutes();
    console.log(time);
  }

  const handleClick = () => {
    request(
      "POST",
      "/tickets",
      JSON.stringify({
        sessionId: sessionId,
        selectedSeatIds: selectedSeatIds,
      })
    )
      .then((response) => {
        if (response.status === 200) {
          setTicket(true);
          console.log("Bilet oluşturuldu...");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
      });
  };

  const [ticket, setTicket] = useState(false);

  if (errorAssignedMovie) {
    return <div>Error !!!</div>;
  } else if (!isLoadedAssignedMovie) {
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
      <div
        style={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box sx={styles.box}>
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ height: "55%", width: "45vw", marginTop: "2%" }}
          >
            <Stack
              direction={"row"}
              sx={{
                height: "80%",
                width: "80%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                alt="Poster"
                src={session.posterImgPath}
                sx={{
                  width: "10vw",
                }}
              />
              <Stack
                alignSelf={"center"}
                spacing={2}
                divider={
                  <Divider
                    orientation="horizontal"
                    color={"#00b9c9"}
                    flexItem
                  />
                }
                sx={{ width: "40%" }}
              >
                <Stack direction={"row"} spacing={2}>
                  <DateIcon htmlColor="black" />
                  <Typography variant="body1" color={"black"}>
                    {date}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <TimeIcon htmlColor="black" />
                  <Typography variant="body1" color={"black"}>
                    {time}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <SeatIcon htmlColor="black" />
                  <Typography variant="body1" color={"black"}>
                    {selectedSeatNumbers.join(", ")}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#00b9c9", width: "40%" }}
              onClick={handleClick}
            >
              Onayla
            </Button>
          </Stack>
        </Box>

        {ticket && (
          <Ticket
            startDate={date}
            startTime={time}
            hallName={session.hallName}
            selectedSeatNumbers={selectedSeatNumbers.toString()}
          ></Ticket>
        )}
      </div>
    );
  }
}
export default Summary;
