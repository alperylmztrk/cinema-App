import { Box, Button, Rating, Stack, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import popcorn from '../../Images/popcorn.jpg';


function MovieDetail() {
    const { movieId } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movie, setMovie] = useState(null);
    //const appBarHeight = theme.mixins.toolbar.minHeight;

    const styles = {

        data: {
            //  backgroundColor: "rgba(156, 230, 255,0.5)",
            color: "white",
            padding: 20,

        },
        stack: {
            backgroundImage: `url(${popcorn})`,
            backgroundSize: "cover",
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',

            //padding: 60,
        },
        button: {
            width: 200,
            backgroundColor: "#00b9c9",

        },
        link: {
            textDecoration: "none",
            boxShadow: "none",
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            //await new Promise(resolve => setTimeout(resolve, 2000));
            // Veriyi burada çağırabilirsiniz
            fetch("/movies/" + movieId)
                .then(res => res.json())
                .then((result) => {

                    setIsLoaded(true);
                    setMovie(result);
                    console.log(result);
                }, (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
                )
        };
        fetchData();
    }, [movieId])
    if (error) {
        return <div>Error !!!</div>
    } else if (!isLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <img src={require('../../Images/gif.gif')} alt="Loading..." />
            </div>


        );
    } else {

        return (
            <div>
                <Stack direction={"row"} spacing={2} style={styles.stack} p={4} pl={10} >

                    <Box
                        component="img"
                        alt="Poster"
                        src={movie.posterImgPath}
                        style={styles.boxImg}

                    />
                    <Stack direction={"column"} spacing={4} alignItems={"center"}>

                        <Box style={styles.data}>
                            <Typography variant="h4">
                                {movie.title}
                            </Typography>

                            <Stack alignItems={"flex-end"}>
                                <Box>
                                    <Typography component="legend" variant="h6">Puan: {movie.rating}</Typography>
                                    <Rating name="half-rating-read" value={movie.rating} precision={0.1} readOnly />
                                </Box>

                            </Stack>

                            <Typography sx={{ marginTop: 5 }} fontSize={20}>
                                Yönetmen: {movie.director}
                            </Typography>
                            <Typography fontSize={20}>
                                Oyuncular: {movie.cast}
                            </Typography>

                        </Box>

                        <Link to={{ pathname: './sessions' }} style={styles.link}>

                            <Button style={styles.button} variant="contained">Bilet Al</Button>

                        </Link>

                    </Stack>



                </Stack>

                <Stack direction={"row"} spacing={40} p={2}>

                    <Stack direction={"column"} spacing={0.5} pl={8} >
                        <Box display={"flex"} alignItems={"center"} >
                            <Typography variant="h6" >Tür:</Typography>
                            <Typography variant="body1" ml={1}>{movie.genre}</Typography>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} width={200} >
                            <Typography variant="h6" >Süre:</Typography>
                            <Typography variant="body1" ml={1}>{movie.duration} dakika</Typography>
                        </Box>
                    </Stack>
                    <Box display={"flex"} pr={8} >
                        <Typography variant="h6" >Özet:</Typography>
                        <Typography variant="body1" textAlign={"justify"} ml={1} mt={0.6} >{movie.summary}</Typography>
                    </Box>
                </Stack>






            </div >




        )
    }
}

export default MovieDetail;