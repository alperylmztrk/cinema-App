import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth_helper";

function NavBar() {
    const [isAuth, setIsAuth] = useState(isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(isAdmin());

    useEffect(() => {
        setIsAuth(isAuthenticated());
        setIsAdmin(isAdmin());
      }, []);

      useEffect(() => {
        const handleStorageChange = () => {
          setIsAuth(isAuthenticated());
          setIsAdmin(isAdmin());
        };
    
        window.addEventListener("storage", handleStorageChange);
        
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Button href="/cinemaManagement" color="inherit">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
