import {
  Typography,
  Box,
  IconButton,
  Button,
  Stack,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { yellow } from "@mui/material/colors";
import "./managementStyle.css";

import AssignMovieDialog from "./AssignMovieDialog";
import AddMovieDialog from "./AddMovieDialog";
import AddHallDialog from "./AddHallDialog";
import EditMovieDialog from "./EditMovieDialog";
import DeleteMovieDialog from "./DeleteMovieDialog";
import { DataGrid } from "@mui/x-data-grid";
import { request } from "../../helpers/axios_helper";
import { BorderBottom } from "@mui/icons-material";

function Management() {
  const [movieList, setMovieList] = useState([]);
  const [errorMovie, setErrorMovie] = useState(null);
  const [isLoadedMovie, setIsLoadedMovie] = useState(false);
  const [hallList, setHallList] = useState([]);
  const [errorHall, setErrorHall] = useState(null);
  const [isLoadedHall, setIsLoadedHall] = useState(false);

  const [assignMovieDialog, setAssignMovieDialog] = useState(false);
  const [addMovieDialog, setAddMovieDialog] = useState(false);
  const [addHallDialog, setAddHallDialog] = useState(false);
  const [editMovieDialog, setEditMovieDialog] = useState(false);
  const [deleteMovieDialog, setDeleteMovieDialog] = useState(false);

  const [tiklananMovieId, setTiklananMovieId] = useState(null);
  const [tiklananMovieTitle, setTiklananMovieTitle] = useState(null);
  const [tiklananMovie, setTiklananMovie] = useState(null);

  useEffect(() => {
    request("GET", "/movies")
      .then((response) => {
        setIsLoadedMovie(true);
        setMovieList(response.data);

        console.log(response);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response);
        console.log(error.response.data);

        setIsLoadedMovie(true);
        setErrorMovie(error.response.data);
      });
  }, []);

  useEffect(() => {
    request("GET", "/halls")
      .then((response) => {
        setIsLoadedHall(true);
        setHallList(response.data);

        console.log(response);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
        setIsLoadedHall(true);
        setErrorHall(error.response.data);
      });
  }, []);

  const openAssignMovieDialog = () => {
    setAssignMovieDialog(true);
  };
  const closeAssignMovieDialog = () => {
    setAssignMovieDialog(false);
  };
  const openAddMovieDialog = () => {
    setAddMovieDialog(true);
  };
  const closeAddMovieDialog = () => {
    setAddMovieDialog(false);
  };
  const openAddHallDialog = () => {
    setAddHallDialog(true);
  };
  const closeAddHallDialog = () => {
    setAddHallDialog(false);
  };
  const openEditMovieDialog = (movie) => (event) => {
    console.log(movie);
    console.log("ediiiiiiittttttt");
    setTiklananMovie(movie);
    setEditMovieDialog(true);
  };
  const closeEditMovieDialog = () => {
    setEditMovieDialog(false);
  };
  const openDeleteMovieDialog = (id, title) => {
    setDeleteMovieDialog(true);
    setTiklananMovieId(id);
    setTiklananMovieTitle(title);
  };
  const closeDeleteMovieDialog = () => {
    setDeleteMovieDialog(false);
  };

  const columnsMovie = [
    {
      field: "id",
      headerName: "No",
      width: 50,
    },
    {
      field: "title",
      headerName: "Film",
      width: 200,
    },
    {
      field: "genre",
      headerName: "Tür",
      width: 140,
    },
    {
      field: "duration",
      headerName: "Süre(dk)",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      align: "right",

      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <EditIcon
              sx={{ color: yellow[400] }}
              onClick={openEditMovieDialog(params.row)}
            />
          }
          label="Edit"
          title="Düzenle"
        />,
        <GridActionsCellItem
          icon={
            <DeleteIcon
              color="error"
              onClick={() =>
                openDeleteMovieDialog(params.row.id, params.row.title)
              }
            />
          }
          label="Delete"
          title="Sil"
        />,
      ],
    },
  ];

  const columnsHall = [
    {
      field: "id",
      headerName: "No",
      width: 50,
    },
    {
      field: "name",
      headerName: "Salon",
      width: 200,
    },
    {
      field: "capacity",
      headerName: "Kapasite",
      width: 140,
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      align: "right",

      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <EditIcon
              sx={{ color: yellow[400] }}
              onClick={openEditMovieDialog}
            />
          }
          label="Edit"
          title="Düzenle"
        />,
        <GridActionsCellItem
          icon={
            <DeleteIcon
              color="error"
              onClick={() =>
                openDeleteMovieDialog(params.row.id, params.row.title)
              }
            />
          }
          label="Delete"
          title="Sil"
        />,
      ],
    },
  ];

  if (errorMovie || errorHall) {
    return (
      <div>
        {errorMovie.message} {errorHall.message}
      </div>
    );
  } else if (!isLoadedMovie || !isLoadedHall) {
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <img src={require("../../Images/gif.gif")} alt="Loading..." />
    </Box>;
  } else {
    return (
      <div>
        {/* <Typography variant="h3" display="flex" justifyContent="center" mt={2}>
          Sinema Yönetimi
        </Typography> */}

        <Stack
          marginTop={5}
          justifyContent={"center"}
          direction="row"
          spacing={2}
        >
          <Box className="card" display={"flex"} flexDirection={"column"}>
            <Typography
              variant="subtitle1"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              Filmler
            </Typography>

            <DataGrid
              sx={{
                border: "none",
                mx: 4,
                my: 2,
                " .MuiDataGrid-cell": { borderBottom: "none" },
                overflow: "auto",
              }}
              rows={movieList}
              columns={columnsMovie}
            />

            <IconButton
              className="card-button"
              aria-label="add"
              style={{ color: "#0c3fca" }}
              onClick={openAddMovieDialog}
            >
              <AddCircleIcon />
              <Typography ml={1} variant="subtitle1">
                Film Ekle
              </Typography>
            </IconButton>
          </Box>

          <Box className="card" display={"flex"} flexDirection={"column"}>
            <Typography
              variant="subtitle1"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              Salonlar
            </Typography>
            <DataGrid
              sx={{
                border: "none",
                mx: 4,
                my: 2,
                " .MuiDataGrid-cell": { borderBottom: "none" },
                overflow: "auto",
              }}
              rows={hallList}
              columns={columnsHall}
            />

            <IconButton
              className="card-button"
              aria-label="add"
              style={{ color: "#0c3fca" }}
              onClick={openAddHallDialog}
            >
              <AddCircleIcon />
              <Typography ml={1} variant="subtitle1">
                Salon Ekle
              </Typography>
            </IconButton>
          </Box>
        </Stack>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "100%", margin: 10 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                color="primary"
                aria-label="assign"
                onClick={openAssignMovieDialog}
              >
                <MovieIcon />
                <Typography variant="subtitle1" ml={1}>
                  Seans Oluştur
                </Typography>
              </IconButton>

              <AssignMovieDialog
                filmler={movieList}
                salonlar={hallList}
                open={assignMovieDialog}
                kapat={closeAssignMovieDialog}
              />
              <AddMovieDialog
                setMovieList={setMovieList}
                open={addMovieDialog}
                onClose={closeAddMovieDialog}
              />
              <AddHallDialog
                setHallList={setHallList}
                open={addHallDialog}
                kapat={closeAddHallDialog}
              />
              <EditMovieDialog
                movie={tiklananMovie}
                open={editMovieDialog}
                onClose={closeEditMovieDialog}
              />
              <DeleteMovieDialog
                movieId={tiklananMovieId}
                movieName={tiklananMovieTitle}
                setMovieList={setMovieList}
                open={deleteMovieDialog}
                kapat={closeDeleteMovieDialog}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Management;
