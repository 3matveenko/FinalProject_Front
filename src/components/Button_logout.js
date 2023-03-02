import Button from 'react-bootstrap/Button';
import { Component } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout() {
             
  function Details(){
      localStorage.clear()
      window.location.assign('http://localhost:3000/login');
  }
  return 
  <LogoutIcon onClick={()=>Details()} />
}


