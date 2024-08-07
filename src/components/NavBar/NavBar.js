import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { isAuthenticated, isAdmin, logout } from "../../helpers/auth_helper";
import { Logout, Settings } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

function NavBar() {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [isAdmn, setIsAdmn] = useState(isAdmin());
  const [name, setName] = useState(localStorage.getItem("name"));
  const [surname, setSurname] = useState(localStorage.getItem("surname"));

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setIsAdmn(isAdmin());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(isAuthenticated());
      setIsAdmn(isAdmin());
      setName(localStorage.getItem("name"));
      setSurname(localStorage.getItem("surname"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logoutHandler = () => {
    logout();
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            <Link
              style={{
                textDecoration: "none",
                boxShadow: "none",
                color: "white",
              }}
              to="/"
            >
              Ana Sayfa
            </Link>
          </Typography>
          {!isAuth && (
            <Button href="/login" color="inherit">
              Giriş yap
            </Button>
          )}
          {isAdmn && (
            <IconButton
              href="/cinemaManagement"
              color="inherit"
              title="Sinema Yönetimi"
            >
              <Settings></Settings>
            </IconButton>
          )}
          {isAuth && (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <Box>
                  <Typography variant="body2"> {name} </Typography>
                  <Typography variant="body2"> {surname} </Typography>
                </Box>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={logoutHandler}>
                  <ListItemIcon>
                    <Logout color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Çıkış Yap</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
