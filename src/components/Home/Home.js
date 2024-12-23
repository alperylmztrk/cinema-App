import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Movie from "../Movie/Movie";
import CustomCarousel from "./CustomCarousel";

import { request } from "../../helpers/axios_helper";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    request("GET", "/movies", {}).then(
      (response) => {
        setTimeout(() => {
          setIsLoaded(true);
          setMovieList(response.data);
        
        }, 1000);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  if (error) {
    return <div> Filmler getirilemedi </div>;
  } else if (!isLoaded) {
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
        <Box margin={5}>
          <CustomCarousel filmList={movieList}> </CustomCarousel>
        </Box>

        <Typography variant="h4" color="initial" pl={22} pt={4} pb={4}>
          Vizyondaki Filmler
        </Typography>

        <Grid container pl={20} pr={20}>
          {movieList.map((movie) => (
            <Grid item xs={12} md={6} lg={3} xl={2.4}>
              <Movie
                id={movie.id}
                title={movie.title}
                duration={movie.duration}
                rating={movie.rating}
                posterImgPath={movie.posterImgPath}
              >
              </Movie>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
export default Home;
