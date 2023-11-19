import { Box, Button, Chip, colors, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";


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



function Session(props) {
    const location = useLocation();
    const filmAdi = location.state?.filmAdi;
    const { movieId } = useParams();
    const [value, setValue] = useState(0);
    const [sessions, setSessions] = useState(new Map());
    const [errorSessions, setErrorSessions] = useState(null);
    const [isLoadedSessions, setIsLoadedSessions] = useState(false);


    useEffect(() => {
        fetch("/assignedMovies/sessions/" + movieId)
            .then(res => res.json())
            .then((result) => {
                setIsLoadedSessions(true);
                console.log(result)
                setSessions(result);
                console.log("seanslar="+sessions);
                console.log(Object.keys(sessions).length)
                console.log(typeof sessions)
            }, (error) => {
                setIsLoadedSessions(true);
                setErrorSessions(error);
            }
            )
    }, [])


    const handleChange = (event, newValue) => {
        console.log("aaa " + newValue);
        setValue(newValue);
    };
    const handleClick = (event) => {
        console.info('You clicked the Chip.' + event.currentTarget.innerText);
    };


    if (errorSessions) {
        return <div>Error !!!</div>
    } else if (!isLoadedSessions) {
        return (

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: "calc(100vh - 64px)" }}>
                <img src={require('../../Images/gif.gif')} alt="Loading..." />
            </Box>

        )
    } else if (Object.keys(sessions).length == 0) {
        return (
            <div>

                <Typography
                    variant="h5"
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    Seans yok
                </Typography>
            </div>
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
                    {filmAdi}
                    {console.log(filmAdi + "aaaaaaaaaaa")}
                </Typography>

                <Box display={"flex"} mt={5} paddingLeft={"40%"}
                    sx={{ height: "25vh", bgcolor: "#b7def7" }}
                >

                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 2, borderColor: 'divider' }}
                    >
                        {Object.entries(sessions).map(([key, value], index) =>
                            <Tab label={key} key={index} />
                        )}

                    </Tabs>

                    {Object.entries(sessions).map(([key, deger], index) =>
                        <TabPanel value={value} index={index}>

                            <Stack direction="row" spacing={1}>
                                {console.log(sessions[key])}
                                {console.log(index + " -- " + value + " -- " + sessions[key][0].time)}

                                {deger.map((obj) =>

                                    <Chip label={obj.time}
                                        variant="outlined" onClick={handleClick}
                                        component="a" href={"/movies/sessions/" + obj.id + "/seats"} clickable />

                                )}

                            </Stack>
                        </TabPanel>
                    )}

                </Box>

            </div>

        )
    }
}

export default Session;