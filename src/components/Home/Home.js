import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Movie from "../Movie/Movie";

function Home() {
    const [movieList, setMovieList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/movies")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setMovieList(result);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
    }, [])

    if (error) {
        return <div>Error !!!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <Typography variant="h4" color="initial" pl={22} pt={4} pb={4}>Vizyondaki Filmler</Typography>
            
                    <Grid container pl={20} pr={20} >

                        {
                            movieList.map(movie => (
                                <Grid item xs={12} md={6} lg={3}>
                                    <Movie id={movie.id} title={movie.title} duration={movie.duration} rating={movie.rating} posterImgPath={movie.posterImgPath}> </Movie>
                                </Grid>
                            ))
                        }

                    </Grid>

            </div >
        );

    }

}
export default Home;