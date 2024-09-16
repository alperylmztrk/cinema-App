import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'
import { useLocation, useParams } from "react-router-dom";
import { Alert, AlertTitle, Box, Button, Divider, Snackbar, Stack, TextField } from "@mui/material";
import sinemaImg from '../../Images/sinema.jpg';
import { format } from "date-fns";
import DateIcon from '@mui/icons-material/CalendarMonth';
import TimeIcon from '@mui/icons-material/Alarm';
import SeatIcon from '@mui/icons-material/Weekend';
import Ticket from "./Ticket";


function UserInfo() {

    const styles = {

        box: {
            backgroundImage: `url(${sinemaImg})`,
            width: 500,

            height: `calc(100vh - 80px)`,
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',

            color: "white",


        },
        stack: {
            position: "absolute",
            top: "28%",
            width: 500,
            height: "20vh",
        }

    };


    const { assignedMovieId } = useParams();
    const location = useLocation();

    useEffect(() => {
        console.log(location.state.selectedSeats);

    }, [])

    let selectedSeats = [];
    let selectedSeatNumbers = [];

    selectedSeats = location.state.selectedSeats;
    selectedSeats.map(selectedSeat => {
        selectedSeatNumbers.push(selectedSeat.number);
    })
    selectedSeatNumbers = selectedSeatNumbers.sort(function (a, b) {
        return a.localeCompare(b, "en", { numeric: true });
    });
    console.log(selectedSeatNumbers);


    const [assignedMovie, setAssignedMovie] = useState();
    const [isLoadedAssignedMovie, setIsLoadedAssignedMovie] = useState(false);
    const [errorAssignedMovie, setErrorAssignedMovie] = useState(null);
    let dateTime;
    let date = "";
    let time = "";
    let selectedReservedSeats = [];

    if (isLoadedAssignedMovie) {
        dateTime = new Date(assignedMovie.startDateTime);
        date = (dateTime.getDate() < 10 ? "0" : "") + dateTime.getDate() + "/" + ((dateTime.getMonth() + 1) < 10 ? "0" : "") + (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear();
        console.log(date);
        time = (dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + ":" + (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes();
        console.log(time);

    }

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");

    const [generatedUser, setGeneratedUser] = useState(null);
    const [isGenerateUser, setIsGenerateUser] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("/assignedMovies/" + assignedMovieId)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setAssignedMovie(result);
                setIsLoadedAssignedMovie(true);

            }, (error) => {
                setIsLoadedAssignedMovie(true);
                setErrorAssignedMovie(error);
            }
            )
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value);

    }
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);

    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);

    }
    const handleEmptyEntry = () => {

        setOpen(true);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleClick = () => {
        console.log(name);
        console.log(surname);
        console.log(username);


        fetch("/assignedMovies/" + assignedMovieId, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //id: assignedMovieId,
                movieId: assignedMovie.movie.id,
                hallId: assignedMovie.hall.id,
                startDateTime: format(dateTime, "dd/MM/yyyy HH:mm"),
                reservedSeats: selectedReservedSeats,

            }),
        })
            .then((res) => res.json())
            .then(json => console.log(json))
            .catch((error) => console.log(error));


        fetch("/users", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                username: username,

            }),
        })
            .then((res) => res.json())
            .then(json => {
                setGeneratedUser(json);
                setIsGenerateUser(true);
                console.log(json);
            })
            .catch((error) => console.log(error));


    }

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        if (isGenerateUser) {
            fetch("/tickets", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: generatedUser.id,
                    assignedMovieId: assignedMovieId,
                    seatNumber: selectedSeatNumbers.toString(),
                }),
            })
                .then((res) => res.json())
                .then(json => {
                    setTicket(json);
                    console.log(json);
                })
                .catch((error) => console.log(error));
        }
    }, [generatedUser])

    if (isGenerateUser) {

        console.log("Rezerve koltuklar güncellendi ve kullanıcı oluşturuldu..." + " userID:" + generatedUser.id);

    }

    if (errorAssignedMovie) {
        return <div>Error !!!</div>
    } else if (!isLoadedAssignedMovie) {
        return (

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: "calc(100vh - 64px)" }}>
                <img src={require('../../Images/gif.gif')} alt="Loading..." />
            </Box>

        )
    } else {
        return (
            <div>
                <Stack direction={"row"} >
                    <Box style={styles.box} >
                        <Stack direction={"row"} spacing={15} justifyContent={"center"} style={styles.stack} >
                            <Box
                                component="img"
                                alt="Poster"
                                src={assignedMovie.posterImgPath}

                            />
                            <Stack alignSelf={"center"} spacing={2} divider={<Divider orientation="horizontal" color={"#00b9c9"} flexItem />}>
                                <Stack direction={"row"} spacing={2}>
                                    <DateIcon htmlColor="black" />
                                    <Typography variant="body1" color={"black"}>{date}</Typography>
                                </Stack>
                                <Stack direction={"row"} spacing={2}>
                                    <TimeIcon htmlColor="black" />
                                    <Typography variant="body1" color={"black"}>{time}</Typography>
                                </Stack>
                                <Stack direction={"row"} spacing={2}>
                                    <SeatIcon htmlColor="black" />
                                    <Typography variant="body1" color={"black"}>{selectedSeatNumbers.join(", ")}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>

                    </Box>
                    <Box flex={1}  >
                        <Typography
                            variant="h5"
                            display="flex"
                            justifyContent={"center"}
                            mt={5}
                        >
                            Kullanıcı Bilgilerini Giriniz
                        </Typography>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            alignItems={"center"}
                            autoComplete="off"
                            display={"flex"}
                            flexDirection={"column"}
                            mt={10}>

                            <TextField id="outlined-basic" label="Ad" variant="outlined" onChange={handleNameChange} required />
                            <TextField id="outlined-basic" label="Soyad" variant="outlined" onChange={handleSurnameChange} required />
                            <TextField id="outlined-basic" label="Kullanıcı adı" variant="outlined" onChange={handleUsernameChange} required />
                        </Box>
                        {name !== "" && surname !== "" && username !== "" ? <Box display={"flex"}
                            justifyContent={"center"}
                            mt={15}>
                            <Button style={{ backgroundColor: "#00b9c9" }}
                                variant="contained"
                                onClick={handleClick}>
                                Onayla ve bitir
                            </Button>
                        </Box> : <Box display={"flex"}
                            justifyContent={"center"}
                            mt={15}>
                            <Button style={{ backgroundColor: "#00b9c9" }}
                                variant="contained"
                                onClick={handleEmptyEntry}>
                                Onayla ve bitir
                            </Button>
                        </Box>}
                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}>
                            <Alert severity="error" >
                                <AlertTitle>Error</AlertTitle>
                                Lütfen tüm boşlukları doldurunuz
                            </Alert>
                        </Snackbar>
                    </Box>
                </Stack>

                {ticket != null &&
             
              <Ticket user={generatedUser} startDate={date} startTime={time} hallName={assignedMovie.hall.name} selectedSeatNumbers={selectedSeatNumbers.toString()}>

              </Ticket>
             
            }

            </div>
        )
    }
}
export default UserInfo;