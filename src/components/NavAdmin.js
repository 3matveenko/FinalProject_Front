import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react"
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom"


export default function NavAdmin() {
    function Details(){
        localStorage.clear()
        window.location.assign('http://localhost:3000/login');
    }
    const content = (
<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
    </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
        </Typography>
         <Typography variant="h6" component="div" sx={{ flexGrow: 30 }} textAlign="center">
        <Nav.Link as={Link} to="/Welcome">Аналитика продаж</Nav.Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 20 }} textAlign="center">
        <Nav.Link as={Link} to="/wokers">Список сотрудников</Nav.Link>
        </Typography>
             <Typography variant="h6" component="div" sx={{ flexGrow: 1000 }} textAlign="center">
        </Typography>
        <LogoutIcon onClick={()=>Details()} />
  </Toolbar>
  
</AppBar>
</Box>
    )
    return content
}