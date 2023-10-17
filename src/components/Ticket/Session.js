import { Box, Button, Chip, colors, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import moment from "moment";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function Session() {
    const { movieId } = useParams();
    const [value, setValue] = useState(0);
    const [assignedMovieList, setAssignedMovieList] = useState([]);
    const [errorAssignedMovieList, setErrorAssignedMovieList] = useState(null);
    const [isLoadedAssignedMovieList, setIsLoadedAssignedMovieList] = useState(false);

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    useEffect(() => {
        fetch("/assignedMovies?movieId=" + movieId)
            .then(res => res.json())
            .then((result) => {
                setIsLoadedAssignedMovieList(true);
                console.log(result)
                setAssignedMovieList(result);
            }, (error) => {
                setIsLoadedAssignedMovieList(true);
                setErrorAssignedMovieList(error);
            }
            )
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick = (event) => {
        console.info('You clicked the Chip.' + event.currentTarget.innerText);
    };


    if (errorAssignedMovieList) {
        return <div>Error !!!</div>
    } else if (!isLoadedAssignedMovieList) {
        return (

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: "calc(100vh - 64px)" }}>
                <img src={require('../../Images/gif.gif')} alt="Loading..." />
            </Box>

        )
    } else {
        return (
            <div>

                <Typography
                    variant="h5"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    Seans Seçiniz
                </Typography>
                <Typography
                    variant="h5"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    {assignedMovieList[0].movieTitle}
                </Typography>

                <Box display={"flex"} justifyContent={"center"} mt={5}
                    sx={{ height: 200, bgcolor: "#b7def7" }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 2, borderColor: 'divider' }}
                    >
                        {assignedMovieList.map((assignedMovie, index) => {
                            
                            const dateTime = new Date(assignedMovie.startDateTime);
                            const date = dateTime.getDate() + " " + monthNames[dateTime.getMonth()]
        
                            return (<Tab label={date} />)
                        })}
                    </Tabs>


                    {assignedMovieList.map((assignedMovie, index, array) => {
                        const dateTime = new Date(assignedMovie.startDateTime);
                        const time = (dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + ":" + (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes();
                        return (<TabPanel value={value} index={index}>
                            <Stack direction="row" spacing={1}>
                                {assignedMovie.hallCapacity !== assignedMovie.reservedSeatNum ?
                                    <Chip label={time} variant="outlined" onClick={handleClick} component="a" href={"/movies/sessions/" + assignedMovie.id + "/seats"} clickable />
                                    : <Chip label={time + " (Dolu)"} variant="outlined" disabled />
                                }
                            

                            </Stack>
                        </TabPanel>)
                    })}

                </Box>

            </div>

        )
    }
}

export default Session;