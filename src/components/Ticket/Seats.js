import { Alert, AlertTitle, Box, Button, Grid, IconButton, Stack, Typography, Snackbar, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import SeatIcon from '@mui/icons-material/WeekendOutlined';
import SeatIconFilled from '@mui/icons-material/Weekend';
import { Link, useParams } from "react-router-dom";

function Seats() {

    const { assignedMovieId } = useParams();


    const [reservedSeats, setReservedSeats] = useState([]);
    const [reservedSeatNumbers, setReservedSeatNumbers] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);


    const [seatList, setSeatList] = useState([]);
    const [isLoadedSeatList, setIsLoadedSeatList] = useState(false);
    const [errorSeatList, setErrorSeatList] = useState(null);
    const [assignedMovie, setAssignedMovie] = useState();
    const [isLoadedAssignedMovie, setIsLoadedAssignedMovie] = useState(false);
    const [errorAssignedMovie, setErrorAssignedMovie] = useState(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("/seats")
            .then(res => res.json())
            .then((result) => {
                setIsLoadedSeatList(true);
                console.log(result);
                setSeatList(result);

            }, (error) => {
                setIsLoadedSeatList(true);
                setErrorSeatList(error);
            }
            )
    }, [])


    useEffect(() => {
        fetch("/assignedMovies/" + assignedMovieId)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setAssignedMovie(result);
                setIsLoadedAssignedMovie(true);
                setReservedSeats(result.reservedSeats);


            }, (error) => {
                setIsLoadedAssignedMovie(true);
                setErrorAssignedMovie(error);
            }
            )
    }, [])

    //use effectin içine almayı dene
    if (isLoadedAssignedMovie) {
        reservedSeats.map(reservedSeat => {
            if (!reservedSeatNumbers.includes(reservedSeat.number)) {

                reservedSeatNumbers.push(reservedSeat.number);

            }
        })

    }


    const handleSelectedSeats = (index) => {

        console.log(index);
        console.log(seatList[index].number);


        if (!selectedSeats.includes(seatList[index]) && !reservedSeatNumbers.includes(seatList[index].number)) {

            selectedSeats.push(seatList[index]);
        } else if (selectedSeats.includes(seatList[index])) {
            for (var i = 0; i < selectedSeats.length; i++) {

                if (selectedSeats[i] === seatList[index]) {
                    selectedSeats.splice(i, 1);
                    i--;
                }
            }
        }

        setSelectedSeats(oldArray => [...oldArray]);

        console.log(reservedSeatNumbers);
        console.log(selectedSeats);


    }

    const handleAlert = () => {

        setOpen(true);
        console.log(assignedMovie.movie);
        console.log(reservedSeats);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    if (errorAssignedMovie || errorSeatList) {
        return <div>Error !!!</div>
    } else if (!isLoadedAssignedMovie || !isLoadedSeatList) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <Typography
                    variant="h5"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    Koltuk Seçiniz
                </Typography>
                <Typography
                    variant="h5"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    {assignedMovie.movie.title}
                </Typography>

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mt={10}>
                    <Stack>
                        <Stack direction={"row"}>

                            <Stack >
                                <Stack direction={"row"} spacing={2.6} ml={1}>
                                    <Typography variant="body1" color="initial">10</Typography>
                                    <Typography variant="body1" color="initial">9</Typography>
                                    <Typography variant="body1" color="initial">8</Typography>
                                    <Typography variant="body1" color="initial">7</Typography>
                                    <Typography variant="body1" color="initial">6</Typography>
                                    <Typography variant="body1" color="initial">5</Typography>
                                    <Typography variant="body1" color="initial">4</Typography>
                                    <Typography variant="body1" color="initial">3</Typography>
                                    <Typography variant="body1" color="initial">2</Typography>
                                    <Typography variant="body1" color="initial">1</Typography>
                                </Stack>

                                <Grid container width={300} >
                                    {
                                        seatList.map((seat, key) => (
                                            <Grid xs={12} md={6} lg={1.2}>

                                                <IconButton onClick={() => handleSelectedSeats(key)} key={key}>
                                                    {
                                                        reservedSeatNumbers.includes(seat.number) ? <SeatIconFilled htmlColor="#00b9c9" />
                                                            : selectedSeats.includes(seat) ? <SeatIconFilled htmlColor="#eb493d" />
                                                                : <SeatIcon htmlColor="#00b9c9" />
                                                    }
                                                </IconButton>
                                            </Grid>
                                        ))
                                    }

                                </Grid>
                            </Stack>
                            <Stack spacing={2} mt={4} pl={2}>
                                <Typography variant="body1" color="initial">E</Typography>
                                <Typography variant="body1" color="initial">D</Typography>
                                <Typography variant="body1" color="initial">C</Typography>
                                <Typography variant="body1" color="initial">B</Typography>
                                <Typography variant="body1" color="initial">A</Typography>
                            </Stack>
                        </Stack>
                        <Divider orientation="horizontal" color={"#00b9c9"} sx={{ mt: 2 }} flexItem />
                    </Stack>
                    <Stack direction={"row"} mt={5} spacing={2} >
                        <Stack direction={"row"} spacing={0.5}>
                            <SeatIconFilled htmlColor="#00b9c9" />
                            <Typography variant="body2" alignSelf={"center"}>Dolu Koltuklar</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={0.5}>
                            <SeatIcon htmlColor="#00b9c9" />
                            <Typography variant="body2" alignSelf={"center"}>Boş Koltuklar</Typography>

                        </Stack>
                        <Stack direction={"row"} spacing={0.5}>
                            <SeatIconFilled htmlColor="#eb493d" />
                            <Typography variant="body2" alignSelf={"center"}>Seçiminiz</Typography>
                        </Stack>
                    </Stack>


                    {selectedSeats.length !== 0 ? <Link to={{ pathname: './userInfo' }} style={{ textDecoration: "none", boxShadow: "none" }}
                        state={{ selectedSeats: selectedSeats }}>

                        <Button style={{ backgroundColor: "#00b9c9", marginTop: "12vh" }}
                            variant="contained">
                            Devam

                        </Button>
                    </Link> : <Button style={{ backgroundColor: "#00b9c9", marginTop: "12vh" }}
                        onClick={handleAlert}
                        variant="contained">
                        Devam
                    </Button>}

                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}>
                        <Alert severity="error" >
                            <AlertTitle>Error</AlertTitle>
                            Lütfen koltuk seçiniz
                        </Alert>
                    </Snackbar>


                </Box>



            </div>

        )
    }
}
export default Seats;