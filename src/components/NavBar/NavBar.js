import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Box sx={{flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" flexGrow={1}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to="/">Ana Sayfa</Link>
                    </Typography>
                    <Button href='/cinemaManagement' color="inherit">Admin</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavBar;