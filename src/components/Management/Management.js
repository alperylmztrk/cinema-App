import { Typography, Box, IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { yellow } from "@mui/material/colors";

import AssignMovieDialog from "./AssignMovieDialog";
import AddMovieDialog from "./AddMovieDialog";
import EditMovieDialog from "./EditMovieDialog";
import DeleteMovieDialog from "./DeleteMovieDialog";
import { DataGrid } from "@mui/x-data-grid";
import { request } from "../../helpers/axios_helper";

function Management() {
  const [movieList, setMovieList] = useState([]);
  const [errorMovie, setErrorMovie] = useState(null);
  const [isLoadedMovie, setIsLoadedMovie] = useState(false);
  const [hallList, sethallList] = useState([]);
  const [errorHall, setErrorHall] = useState(null);
  const [isLoadedHall, setIsLoadedHall] = useState(false);

  const [assignMovieDialog, setAssignMovieDialog] = useState(false);
  const [addMovieDialog, setAddMovieDialog] = useState(false);
  const [editMovieDialog, setEditMovieDialog] = useState(false);
  const [deleteMovieDialog, setDeleteMovieDialog] = useState(false);

  const [tiklananMovieId, setTiklananMovieId] = useState(null);
  const [tiklananMovieTitle, setTiklananMovieTitle] = useState(null);

  useEffect(() => {
    request("GET", "/movies")
      .then((response) => {
        setIsLoadedMovie(true);
        setMovieList(response.data);

        console.log(response);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
        setIsLoadedMovie(true);
        setErrorMovie(error);
      });
  }, []);

  useEffect(() => {
    fetch("/halls")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadedHall(true);
          sethallList(result);
        },
        (errorHall) => {
          setIsLoadedHall(true);
          setErrorHall(errorHall);
        }
      );
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
  const openEditMovieDialog = () => {
    console.log("open edit");
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

  const handleEkle = () => {
    console.log("aaaaaaaaaa");
    if (movieList.length > 0) {
      setMovieList([...movieList, ...movieList]);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 90,
    },
    {
      field: "title",
      headerName: "Film",
      width: 200,
    },
    {
      field: "genre",
      headerName: "Tür",
      width: 150,
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
    return <div>Error !!!</div>;
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
        <Typography variant="h3" display="flex" justifyContent="center" mt={2}>
          Sinema Yönetim Ekranı
        </Typography>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ height: "50vh", width: "100%", margin: 50 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                color="primary"
                aria-label="assign"
                onClick={openAssignMovieDialog}
              >
                <Typography variant="subtitle1" mr={1}>
                  Film Ata
                </Typography>{" "}
                <MovieIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="add"
                style={{ color: "#22EACA" }}
                onClick={openAddMovieDialog}
              >
                <Typography variant="subtitle1" mr={1}>
                  Film Ekle
                </Typography>{" "}
                <AddCircleIcon />
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
                kapat={closeAddMovieDialog}
              />
              <EditMovieDialog
                open={editMovieDialog}
                kapat={closeEditMovieDialog}
              />
              <DeleteMovieDialog
                movieId={tiklananMovieId}
                movieName={tiklananMovieTitle}
                setMovieList={setMovieList}
                open={deleteMovieDialog}
                kapat={closeDeleteMovieDialog}
              />
            </div>
            <DataGrid rows={movieList} columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}
export default Management;
